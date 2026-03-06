import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import GradientText from '../ui/GradientText';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="glass-card bg-brand-dark/5 p-12 md:p-20 relative overflow-hidden rounded-[32px] border-none text-center">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <GradientText className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                            Protect your inbox today.
                        </GradientText>
                        <p className="text-gray-500 text-lg mb-10">
                            Join thousands of users who trust PhishGuard to identify digital deception before it's too late.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <Link to="/register">
                                <Button size="lg" className="px-10">Start for Free <ArrowRight size={18} /></Button>
                            </Link>
                            <Link to="/learn" className="text-sm font-bold text-gray-900 px-6 py-3 hover:bg-gray-50 rounded-xl transition-colors">
                                How we use AI
                            </Link>
                        </div>
                    </div>

                    {/* Abstract geometric background */}
                    <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                        <div className="dot-grid absolute inset-0 opacity-40" />
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-action-500 rounded-full blur-[120px] opacity-10" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-400 rounded-full blur-[120px] opacity-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
