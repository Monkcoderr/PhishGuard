import React, { useState, useEffect } from 'react';
import StatCard from '../ui/StatCard';
import { Users, Search, AlertTriangle, ShieldCheck } from 'lucide-react';
import api from '../../lib/api';

const Stats = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalScans: 0,
        scamsDetected: 0,
        communityReports: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/community/stats');
                if (res.data.success) {
                    setStats(res.data.stats);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    return (
        <section className="py-14 md:py-20 bg-brand-dark rounded-[24px] md:rounded-[40px] my-14 md:my-20 mx-3 sm:mx-4 md:mx-8 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center md:text-left text-white mb-8 md:mb-0">
                        <h2 className="text-2xl md:text-3xl font-black mb-4">Platform Growth</h2>
                        <p className="text-gray-400 text-sm">Real-time data from the PhishGuard network.</p>
                    </div>

                    <div className="md:col-span-3">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            <StatCard
                                value={stats.totalUsers}
                                label="Active Users"
                                icon={Users}
                                variant="dark"
                                className="bg-white/5 border-white/10"
                            />
                            <StatCard
                                value={stats.totalScans}
                                label="Emails Scanned"
                                icon={Search}
                                variant="dark"
                                className="bg-white/5 border-white/10"
                            />
                            <StatCard
                                value={stats.scamsDetected}
                                label="Scams Blocked"
                                icon={AlertTriangle}
                                variant="dark"
                                className="bg-white/5 border-white/10"
                            />
                            <StatCard
                                value={stats.communityReports}
                                label="Safe Shields"
                                icon={ShieldCheck}
                                variant="dark"
                                className="bg-white/5 border-white/10"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative background effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-action-500 rounded-full blur-[150px] opacity-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-500 rounded-full blur-[150px] opacity-5 pointer-events-none" />
        </section>
    );
};

export default Stats;
