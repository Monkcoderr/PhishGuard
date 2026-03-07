import React, { useState, useEffect } from 'react';
import {
    Users,
    TrendingUp,
    Globe,
    ShieldAlert,
    ExternalLink,
    ChevronRight,
    TrendingDown,
    BarChart2,
    Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import api from '../lib/api';
import { cn } from '../lib/utils';

const CommunityPage = () => {
    const [trending, setTrending] = useState([]);
    const [weeklyReport, setWeeklyReport] = useState(null);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendingRes, weeklyRes, statsRes] = await Promise.all([
                    api.get('/community/trending'),
                    api.get('/community/weekly'),
                    api.get('/community/stats')
                ]);

                if (trendingRes.data.success) setTrending(trendingRes.data.trending);
                if (weeklyRes.data.success) setWeeklyReport(weeklyRes.data.weeklyReport);
                if (statsRes.data.success) setStats(statsRes.data.stats);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="py-20 flex justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-6 md:py-8">
            <div className="mb-8 md:mb-12">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3 italic">
                    <Globe size={28} /> PhishGuard Global Intelligence
                </h1>
                <p className="text-gray-500 mt-2">Real-time threat intelligence from our worldwide community.</p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <StatCard
                    value={stats?.totalScans || 0}
                    label="Analyses Run"
                    className="border-gray-100"
                />
                <StatCard
                    value={stats?.scamsDetected || 0}
                    label="Scams Blocked"
                    className="border-danger-500/10"
                />
                <StatCard
                    value={stats?.communityReports || 0}
                    label="Active Threats"
                    className="border-warning-500/10"
                />
                <StatCard
                    value={89.4}
                    suffix="%"
                    label="AI Accuracy"
                    className="border-safe-500/10"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Trending Feed */}
                <div className="lg:col-span-2 space-y-8">
                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                        <TrendingUp className="text-action-500" /> Active Phishing Campaigns
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                        {trending.length > 0 ? (
                            trending.map((report, i) => (
                                <motion.div
                                    key={report._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <GlassCard hover className="group">
                                        <div className="flex flex-col md:flex-row gap-6 md:items-center">
                                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <ShieldAlert className={cn(
                                                    report.status === 'confirmed_scam' ? "text-danger-500" : "text-warning-500"
                                                )} size={32} />
                                            </div>

                                            <div className="flex-grow">
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    <h4 className="font-bold text-lg text-gray-900">{report.impersonating}</h4>
                                                    <Badge variant={report.status === 'confirmed_scam' ? 'critical' : 'warning'}>
                                                        {report.status.replace('_', ' ')}
                                                    </Badge>
                                                    <Badge variant="neutral">{report.category}</Badge>
                                                </div>
                                                <p className="text-sm text-gray-500 italic mb-4">
                                                    Targeting users via {report.category} scams. Top red flag: "{report.sampleRedFlags[0]}"
                                                </p>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs font-bold text-gray-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <Users size={14} /> {report.reportCount} Users Reported
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock size={14} /> Last detected: {new Date(report.lastReported).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:text-right self-start md:self-auto">
                                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Risk Score</div>
                                                <div className="text-2xl font-black text-gray-900 italic">
                                                    {Math.round(report.avgPhishingScore)}%
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500 p-8 text-center glass-card border-dashed">No campaigns reported yet.</p>
                        )}
                    </div>
                </div>

                {/* Weekly Report & Insights */}
                <div className="space-y-8">
                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                        <BarChart2 className="text-gray-400" /> Weekly Insights
                    </h3>

                    <GlassCard className="bg-brand-dark text-white relative overflow-hidden" padding="lg">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Status Report</span>
                                    <h4 className="text-xl font-black italic">{weeklyReport?.weekId}</h4>
                                </div>
                                <Badge variant={weeklyReport?.dangerLevel === 'critical' ? 'critical' : 'warning'} className="bg-white/10 border-white/20 text-white">
                                    {weeklyReport?.dangerLevel} risk
                                </Badge>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm text-gray-400">Threat Volume</span>
                                    <span className="text-lg font-bold flex items-center gap-1">
                                        <TrendingUp size={16} className="text-danger-400" /> +12%
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full">
                                    <div className="w-3/4 h-full bg-action-500 rounded-full" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div>
                                        <h5 className="text-[10px] font-bold uppercase opacity-50 mb-1">Scams Detected</h5>
                                        <p className="text-xl font-bold font-mono">{weeklyReport?.scamsDetected || 0}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] font-bold uppercase opacity-50 mb-1">Total Analyses</h5>
                                        <p className="text-xl font-bold font-mono">{weeklyReport?.totalScans || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-xs text-gray-400 leading-relaxed italic">
                                    System Insight: Sophisticated "Banking" scams are currently trending across the PhishGuard network. Act with extreme caution on SMS links.
                                </p>
                            </div>
                        </div>

                        {/* Background effect */}
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-action-500 rounded-full blur-[60px] opacity-20" />
                    </GlassCard>

                    <GlassCard padding="lg">
                        <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-[10px]">Upcoming Updates</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-800 flex-shrink-0">
                                    <Users size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Verified Reporter Program</p>
                                    <p className="text-xs text-gray-500">Coming Q1 2025</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-800 flex-shrink-0">
                                    <Globe size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Language Expansion (FR, DE, ES)</p>
                                    <p className="text-xs text-gray-500">Ready for Beta</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
