import React from 'react';
import { MousePointer2, Cpu, FileSearch, ShieldCheck } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const HowItWorks = () => {
    const revealRef = useScrollReveal();

    const steps = [
        {
            icon: MousePointer2,
            title: "Paste Content",
            desc: "Simply paste the full text of any suspicious email into our analyzer."
        },
        {
            icon: Cpu,
            title: "AI Analysis",
            desc: "Gemini AI breaks down the linguistics, structure, and intent of the email."
        },
        {
            icon: FileSearch,
            title: "Get Evidence",
            desc: "Receive a detailed report with specific red flags highlighted and explained."
        },
        {
            icon: ShieldCheck,
            title: "Stay Safe",
            desc: "Report confirmed scams to protect others in the PhishGuard community."
        }
    ];

    return (
        <section className="py-32" ref={revealRef}>
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">How PhishGuard Protects You</h2>
                    <p className="text-gray-500 text-lg">Four steps to absolute clarity in a world of digital deception.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {steps.map((step, i) => (
                        <div key={i} className="relative flex flex-col items-center group">
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-[28px] left-[60%] w-[80%] h-[1px] border-t-2 border-dashed border-gray-100 -z-10" />
                            )}

                            <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:shadow-glow-action transition-all duration-300">
                                <step.icon size={24} />
                            </div>

                            <h4 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h4>
                            <p className="text-sm text-gray-500 text-center leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
