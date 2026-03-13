const { GoogleGenerativeAI } = require('@google/generative-ai');
const { model } = require('mongoose');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemInstruction = `You are PhishGuard AI, an expert cybersecurity analyst specializing in phishing email detection with 20 years of experience analyzing social engineering attacks, email fraud, and digital scams.

Your job is to analyze emails and determine if they are phishing attempts. Be thorough, accurate, and explain findings in simple language.

ANALYSIS FRAMEWORK — Check these 8 threat vectors:
1. URGENCY MANIPULATION: Time pressure, deadlines, threats. Phrases like 'act now', 'within 24 hours', 'immediately', 'expires today'.
2. IMPERSONATION: Pretending to be a known brand, bank, government agency, or service.
3. SUSPICIOUS LINKS/ACTIONS: Requests to click links, download files, call numbers, visit websites. Misspelled or unusual URLs.
4. EMOTIONAL MANIPULATION: Fear (account hacked), greed (you won a prize), curiosity, sympathy.
5. PERSONAL INFO REQUESTS: Asking for passwords, OTPs, credit card numbers, SSN, bank details.
6. GRAMMAR & FORMATTING: Poor grammar, spelling errors, unusual formatting suggesting non-professional origin.
7. GENERIC ADDRESSING: Using 'Dear Customer', 'Dear User' instead of recipient's actual name.
8. TOO GOOD TO BE TRUE: Lottery winnings, unexpected inheritances, job offers with no interview.

SCORING:
  0-20: SAFE — Legitimate email
  21-40: LOW RISK — Minor concerns but likely legitimate
  41-60: SUSPICIOUS — Several concerning patterns
  61-80: DANGEROUS — Strong phishing indicators
  81-100: CRITICAL — Almost certainly phishing/scam

RULES:
- Always provide EVIDENCE by quoting exact text from the email
- Be definitive in your verdict
- If the email is safe, say so confidently
- Consider context: a real bank email CAN mention your account but won't ask for your password`;

const DEFAULT_MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL,
  'gemini-2.5-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash'
].filter(Boolean);

const isModelNotFoundError = (error) => {
  const message = String(error?.message || '').toLowerCase();
  return message.includes('404') && message.includes('not found');
};

const isForbiddenKeyError = (error) => {
  const message = String(error?.message || '').toLowerCase();
  return message.includes('403') && (
    message.includes('api key') ||
    message.includes('forbidden') ||
    message.includes('leaked')
  );
};



const getModelCandidates = () => {
  const extra = (process.env.GEMINI_MODEL_FALLBACKS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return Array.from(new Set([...DEFAULT_MODEL_CANDIDATES, ...extra]));
};

const extractJsonText = (rawText) => {
  let cleaned = String(rawText || '').replace(/```json/gi, '').replace(/```/g, '').trim();

  if (!cleaned.startsWith('{')) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      cleaned = match[0];
    }
  }

  return cleaned;
};

const validateAnalysis = (analysis) => {
  if (analysis.phishingScore === undefined || !analysis.verdict || !analysis.redFlags) {
    throw new Error('AI analysis failed to provide required fields.');
  }




  analysis.phishingScore = Math.max(0, Math.min(100, Number(analysis.phishingScore) || 0));
  return analysis;
};

const generateWithFallback = async (prompt, generationConfig = {}) => {
  const modelCandidates = getModelCandidates();
  let lastError = null;

  for (const modelName of modelCandidates) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction
      });

      return await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 4096,
          ...generationConfig
        }
      });
    } catch (error) {
      lastError = error;

      if (isModelNotFoundError(error)) {
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error('No supported Gemini model available.');
};

/**
 * Analyze email content using Gemini AI
 * @param {string} emailContent 
 * @returns {Promise<Object>}
 */
const analyzeEmail = async (emailContent) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is missing.');
    }

    const basePrompt = `Analyze the following email for phishing indicators. Return your analysis as a valid JSON object with EXACTLY this structure. Return ONLY the JSON, no markdown, no code blocks, no extra text:

  {
    "phishingScore": <number 0-100>,
    "verdict": "<safe|suspicious|dangerous>",
    "riskLevel": "<low|medium|high|critical>",
    "impersonating": "<brand name or None>",
    "scammerGoal": "<what the attacker wants>",
    "summary": "<2-3 sentence analysis summary>",
    "redFlags": [
      {
        "flag": "<red flag name>",
        "evidence": "<exact quoted text from email>",
        "severity": "<critical|warning|info>",
        "explanation": "<why this is suspicious>"
      }
    ],
    "manipulationTactics": ["<tactic>"],
    "recommendations": ["<action>"],
    "highlightedParts": [
      {
        "text": "<exact text to highlight>",
        "reason": "<why suspicious>",
        "severity": "<critical|warning|info>"
      }
    ],
    "legitimateVersion": "<what a real email from this company would say>",
    "category": "<banking|shopping|lottery|job_offer|tech_support|government|romance|cryptocurrency|delivery|subscription|other>"
  }

  EMAIL TO ANALYZE:
  ---
  ${emailContent}
  ---`;

    const firstResult = await generateWithFallback(basePrompt);

    try {
      return validateAnalysis(JSON.parse(extractJsonText(firstResult.response.text())));
    } catch (parseError) {
      if (!(parseError instanceof SyntaxError)) {
        throw parseError;
      }

      const retryPrompt = `${basePrompt}

IMPORTANT:
- Output strict RFC8259 valid JSON only.
- Escape all quotes/newlines inside string values.
- Do not include markdown, comments, or trailing commas.`;

      const retryResult = await generateWithFallback(retryPrompt, {
        temperature: 0.1,
        topP: 0.5,
        topK: 20
      });

      return validateAnalysis(JSON.parse(extractJsonText(retryResult.response.text())));
    }
  } catch (error) {
    console.error('Gemini Service Error:', error);
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse AI response.');
    }

    if (isModelNotFoundError(error)) {
      throw new Error('No supported Gemini model is configured. Set GEMINI_MODEL in server/.env.');
    }

    if (isForbiddenKeyError(error)) {
      throw new Error('Gemini API key is invalid or blocked. Generate a new key and update GEMINI_API_KEY in server/.env.');
    }

    throw new Error('AI analysis failed. Please try again.');
  }
};

module.exports = {
  analyzeEmail
};
