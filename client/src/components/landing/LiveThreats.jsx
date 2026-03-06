import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import api from '../../lib/api';

const LiveThreats = () => {
    const [threats, setThreats] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await api.get('/community/trending');
                if (res.data.success) {
                    // Double for smooth marquee
                    setThreats([...res.data.trending, ...res.data.trending]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchTrending();
    }, []);

    if (threats.length === 0) return null;

    return (
        <section className="py-20 border-y border-gray-100 bg-gray-50/30 overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-danger-500"></span>
                            </span>
                            Live Threat Feed
                        </h2>
                        <p className="text-gray-500 mt-2">Community-confirmed phishing campaigns currently active.</p>
                    </div>
                    <button className="text-sm font-bold text-gray-900 flex items-center gap-1 hover:gap-2 transition-all">
                        See all reports <ExternalLink size={14} />
                    </button>
                </div>
            </div>

            <div className="relative">
                <div className="marquee-track">
                    {threats.map((threat, i) => (
                        <div key={`${threat._id}-${i}`} className="px-4 min-w-[320px] md:min-w-[400px]">
                            <GlassCard padding="md" variant="light" className="h-full border-gray-100/50" hover>
                                <div className="flex justify-between items-start mb-4">
                                    <Badge variant={threat.status === 'confirmed_scam' ? 'critical' : 'warning'}>
                                        {threat.status === 'confirmed_scam' ? 'Confirmed Scam' : 'Under Review'}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">
                                        <Clock size={10} /> {Math.floor(Math.random() * 60)}m ago
                                    </div>
                                </div>

                                <h4 className="font-bold text-gray-900 mb-1 truncate">{threat.impersonating || 'Unknown Entity'}</h4>
                                <p className="text-xs text-gray-500 mb-4 line-clamp-1">Category: {threat.category}</p>

                                <div className="flex items-center gap-4 text-xs font-bold text-gray-800">
                                    <div className="flex items-center gap-1.5">
                                        <AlertTriangle size={14} className="text-danger-500" />
                                        <span>{threat.reportCount} Reports</span>
                                    </div>
                                    <div className="w-[1px] h-3 bg-gray-200" />
                                    <div className="flex items-center gap-1.5 font-mono">
                                        <span>Score: {Math.round(threat.avgPhishingScore)}</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    ))}
                </div>

                {/* Gradient overlays for marquee */}
                <div className="absolute top-0 left-0 w-20 h-full bg-linear-to-r from-gray-50/50 to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-20 h-full bg-linear-to-l from-gray-50/50 to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
};

export default LiveThreats;
