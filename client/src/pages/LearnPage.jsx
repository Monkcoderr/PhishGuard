import React from 'react';
import {
    BookOpen,
    ShieldAlert,
    Info,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Fingerprint,
    Cpu,
    Globe
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import useScrollReveal from '../hooks/useScrollReveal';

const LearnPage = () => {
    const revealRef = useScrollReveal();

    const sections = [
        {
            icon: Fingerprint,
            title: "How we detect phishing",
            content: "PhishGuard analyzes emails across 8 core threat vectors, including urgency manipulation, brand impersonation, and emotional triggers. Unlike traditional filters that look for known malicious links, our AI looks for the 'intent' and 'linguistics' of the sender."
        },
        {
            icon: Cpu,
            title: "Google Gemini Integration",
            content: "We leverage state-of-the-art Large Language Models to process natural language. Gemini 1.5 Flash provides high-speed, cost-effective forensic analysis of email content, helping us identify subtle social engineering tactics that evade binary detection systems."
        },
        {
            icon: ShieldAlert,
            title: "The Zero-Trust Mission",
            content: "Inbox security is the last line of defense. By empowering individuals with expert-level forensic tools, we reduce the success rate of phishing campaigns globally. Every report you submit helps train the community threat index."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-12" ref={revealRef}>
            <div className="text-center mb-20">
                <span className="text-xs font-bold text-action-500 uppercase tracking-widest mb-4 block">Security Education</span>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 italic tracking-tight">Learn to read between the lies.</h1>
                <p className="text-gray-500 text-lg">Knowledge is your strongest shield against modern social engineering.</p>
            </div>

            <div className="space-y-12">
                {sections.map((section, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-1 flex justify-center">
                            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                                <section.icon size={24} />
                            </div>
                        </div>
                        <div className="md:col-span-11">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 italic">{section.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{section.content}</p>
                        </div>
                    </div>
                ))}

                <div className="mt-20">
                    <h3 className="text-2xl font-black text-gray-900 mb-8 italic flex items-center gap-3">
                        <AlertTriangle className="text-warning-500" /> Common Scam Patterns
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassCard padding="lg" className="border-l-4 border-l-danger-500">
                            <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">The Urgent Bank Alert</h4>
                            <p className="text-xs text-gray-600 italic leading-relaxed">
                                "Your account has been locked due to suspicious activity. Click here within 2 hours or your funds will be frozen."
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="critical" size="sm">Urgency</Badge>
                                <Badge variant="neutral" size="sm">Fear</Badge>
                            </div>
                        </GlassCard>

                        <GlassCard padding="lg" className="border-l-4 border-l-warning-500">
                            <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">The Lottery Surprise</h4>
                            <p className="text-xs text-gray-600 italic leading-relaxed">
                                "Congratulations! Your email won $1,000,000 in the International Lottery Board. No ticket needed. Claim now!"
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="warning" size="sm">Too good to be true</Badge>
                                <Badge variant="neutral" size="sm">Greed</Badge>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnPage;
