import React from 'react';
import { Fingerprint, Search, Bell, Users, BarChart3, Globe } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import useScrollReveal from '../../hooks/useScrollReveal';

const Features = () => {
    const revealRef = useScrollReveal();

    const features = [
        {
            icon: Fingerprint,
            title: "Forensic Linguistics",
            desc: "Detect patterns in tone and urgency that bypass traditional filters."
        },
        {
            icon: Search,
            title: "Deep URL Inspection",
            desc: "AI-driven analysis of links without clicking them."
        },
        {
            icon: Bell,
            title: "Real-time Alerts",
            desc: "Stay notified when new campaigns impersonating your used brands emerge."
        },
        {
            icon: Users,
            title: "Community Intelligence",
            desc: "Crowdsourced threat platform maintained by thousands of users."
        },
        {
            icon: BarChart3,
            title: "Security Dashboard",
            desc: "Track your personal protection stats and scam trends."
        },
        {
            icon: Globe,
            title: "Global Threat Index",
            desc: "Platform-wide view of the most dangerous scams worldwide."
        }
    ];

    return (
        <section className="py-10" ref={revealRef}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <GlassCard key={i} variant="light" padding="lg" hover className="border-gray-50">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 mb-6">
                                <feature.icon size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 italic">
                                {feature.title}
                            </h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
