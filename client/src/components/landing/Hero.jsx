import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Search, ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import GradientText from '../ui/GradientText';
import useScan from '../../hooks/useScan';
import { SAMPLE_EMAILS } from '../../lib/constants';

const Hero = () => {
    const [content, setContent] = useState('');
    const { analyzeEmail, isAnalyzing } = useScan();
    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!content.trim()) return;
        try {
            const scan = await analyzeEmail(content);
            navigate(`/results/${scan._id}`, { state: { scan } });
        } catch (err) {
            console.error(err);
        }
    };

    const useSample = (type) => {
        setContent(SAMPLE_EMAILS[type].content);
    };

    return (
        <section className="relative pt-8 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-action-500 animate-pulse" />
                        AI-Powered Precision Detection
                    </motion.div>

                    <GradientText className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">
                        Read between the lies.
                    </GradientText>

                    <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-8 md:mb-10 max-w-2xl leading-relaxed">
                        Stop being the target of sophisticated phishing attacks. PhishGuard uses Gemini AI to dissect suspicious emails with forensic precision.
                    </p>

                    <div className="w-full max-w-3xl relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="glass-card p-2 md:p-3 relative shadow-2xl"
                        >
                            <Textarea
                                placeholder="Paste the suspicious email content here..."
                                className="border-none focus:ring-0 text-sm sm:text-base md:text-lg p-4 sm:p-5 min-h-[220px] sm:min-h-[250px] bg-transparent"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />

                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-t border-gray-100">
                                <div className="flex flex-wrap justify-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2 self-center">Try:</span>
                                    <button onClick={() => useSample('amazon')} className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-600 transition-colors">Amazon Scam</button>
                                    <button onClick={() => useSample('bank')} className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-600 transition-colors">Bank Alert</button>
                                    <button onClick={() => useSample('safe')} className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-600 transition-colors">Safe Mail</button>
                                </div>

                                <Button
                                    size="lg"
                                    disabled={!content.trim()}
                                    isLoading={isAnalyzing}
                                    onClick={handleAnalyze}
                                    className="w-full md:w-auto md:min-w-[200px]"
                                >
                                    Analyze Threat <ArrowRight size={18} />
                                </Button>
                            </div>

                            {isAnalyzing && <div className="scan-line" />}
                            {isAnalyzing && <div className="scan-distort" />}
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-gray-900 rounded-xl -z-10 animate-float opacity-5" />
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-action-500 rounded-full blur-[80px] -z-10 opacity-20" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
                    {[
                        { icon: ShieldCheck, title: "8-Point Threat Matrix", desc: "Analyzing urgency, intent, and linguistics." },
                        { icon: Zap, title: "Zero Day Detection", desc: "Catch unknown scams before they land." },
                        { icon: Lock, title: "Privacy First", desc: "We never store sensitive personal data." }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center md:items-start">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 mb-4">
                                <item.icon size={24} />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed text-center md:text-left">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background radial gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/20 via-transparent to-transparent -z-20" />
        </section>
    );
};

export default Hero;
