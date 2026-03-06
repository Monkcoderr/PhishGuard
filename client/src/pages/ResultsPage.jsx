import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import {
    AlertTriangle,
    ShieldCheck,
    Info,
    ArrowLeft,
    Share2,
    Download,
    CheckCircle2,
    Trash2,
    Eye,
    AlertOctagon
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import useScan from '../hooks/useScan';
import { cn, getVerdictColor, getSeverityColor, getScoreColor } from '../lib/utils';

const ResultsPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const { getScanById, reportScam, isAnalyzing } = useScan();
    const [scan, setScan] = useState(location.state?.scan || null);
    const [isLoading, setIsLoading] = useState(!scan);
    const [isReporting, setIsReporting] = useState(false);

    useEffect(() => {
        if (!scan && id) {
            const fetchScan = async () => {
                try {
                    const data = await getScanById(id);
                    setScan(data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchScan();
        }
    }, [id, scan, getScanById]);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-gray-500 font-medium">Retrieving analysis forensics...</p>
            </div>
        );
    }

    if (!scan) return <div>Scan not found</div>;

    const verdictStyles = getVerdictColor(scan.verdict);

    return (
        <div className="max-w-5xl mx-auto py-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-8 transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Analyzer
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Summary & Score */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <GlassCard padding="lg" variant="light" className="relative overflow-hidden">
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                                {/* Score Circle */}
                                <div className="relative w-40 h-40 flex-shrink-0">
                                    <svg className="w-full h-full score-ring" viewBox="0 0 100 100">
                                        <circle
                                            cx="50" cy="50" r="45"
                                            fill="none"
                                            stroke="#F3F4F6"
                                            strokeWidth="8"
                                        />
                                        <motion.circle
                                            cx="50" cy="50" r="45"
                                            fill="none"
                                            stroke={getScoreColor(scan.phishingScore)}
                                            strokeWidth="8"
                                            strokeDasharray="282.7"
                                            initial={{ strokeDashoffset: 282.7 }}
                                            animate={{ strokeDashoffset: 282.7 - (282.7 * scan.phishingScore) / 100 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-black text-gray-900">{Math.round(scan.phishingScore)}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Risk Score</span>
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                                        <Badge variant={scan.verdict} className="px-4 py-1.5 text-sm">
                                            Verdict: {scan.verdict}
                                        </Badge>
                                        <Badge variant="neutral" className="px-4 py-1.5 text-sm uppercase">
                                            Level: {scan.riskLevel}
                                        </Badge>
                                    </div>

                                    <h1 className="text-2xl font-black text-gray-900 mb-3 leading-tight italic">
                                        {scan.verdict === 'safe' ? "This email appears safe." : "Potential phishing threat detected!"}
                                    </h1>
                                    <p className="text-gray-500 leading-relaxed italic pr-4">
                                        {scan.summary}
                                    </p>
                                </div>
                            </div>

                            {/* Animated pulses if dangerous */}
                            {scan.verdict === 'dangerous' && (
                                <div className="absolute top-0 right-0 p-4">
                                    <AlertOctagon size={24} className="text-danger-500 animate-pulse" />
                                </div>
                            )}
                        </GlassCard>
                    </motion.div>

                    {/* Red Flags / Highlights */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-black text-gray-900 flex items-center gap-3 italic">
                            <Eye className="text-gray-400" /> Forensic Breakdown
                        </h3>

                        <div className="grid grid-cols-1 gap-4">
                            {scan.redFlags.map((flag, i) => (
                                <GlassCard key={i} padding="md" className="border-l-4" style={{ borderColor: getScoreColor(scan.phishingScore) }}>
                                    <div className="flex gap-4">
                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", getSeverityColor(flag.severity).bg)}>
                                            <AlertTriangle size={18} className={getSeverityColor(flag.severity).text} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-gray-900">{flag.flag}</h4>
                                                <Badge variant={flag.severity} size="sm">{flag.severity}</Badge>
                                            </div>
                                            <p className="text-xs text-gray-500 italic mb-3">"{flag.evidence}"</p>
                                            <p className="text-sm text-gray-600 leading-relaxed">{flag.explanation}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.div>

                    {/* Email Analysis With Highlights */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <GlassCard padding="lg" variant="light" className="bg-white/40">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Original Email Dissection</h3>
                            <div className="font-mono text-sm text-gray-800 leading-relaxed whitespace-pre-wrap bg-white/50 p-6 rounded-xl border border-gray-100">
                                {scan.emailContent.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>

                {/* Right Column: Details & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <GlassCard padding="lg">
                        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Phishing Intelligence</h3>

                        <div className="space-y-6">
                            <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Impersonating</span>
                                <p className="text-sm font-bold text-gray-900">{scan.impersonating}</p>
                            </div>
                            <div className="h-[1px] bg-gray-100" />
                            <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Scammer Goal</span>
                                <p className="text-sm font-bold text-gray-900">{scan.scammerGoal}</p>
                            </div>
                            <div className="h-[1px] bg-gray-100" />
                            <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Tactics Used</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {scan.manipulationTactics.map((tactic, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-600 uppercase">
                                            {tactic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard padding="lg" className="bg-brand-dark text-white">
                        <h3 className="font-bold mb-6 uppercase tracking-widest text-xs opacity-60">Recommendations</h3>
                        <ul className="space-y-4">
                            {scan.recommendations.map((rec, i) => (
                                <li key={i} className="flex gap-3 text-sm italic">
                                    <CheckCircle2 size={16} className="text-safe-500 flex-shrink-0 mt-0.5" />
                                    <span>{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </GlassCard>

                    <div className="space-y-3">
                        <Button
                            variant="primary"
                            className="w-full py-4 text-base"
                            icon={<Share2 size={18} />}
                            onClick={() => toast.success("Share link copied!")}
                        >
                            Share Report
                        </Button>

                        {scan.verdict !== 'safe' && !scan.reportedToCommunity && (
                            <Button
                                variant="danger"
                                className="w-full py-4 text-base"
                                icon={<AlertTriangle size={18} />}
                                isLoading={isReporting}
                                onClick={async () => {
                                    setIsReporting(true);
                                    try {
                                        await reportScam(scan._id);
                                        setScan({ ...scan, reportedToCommunity: true });
                                    } catch (err) { }
                                    setIsReporting(false);
                                }}
                            >
                                Report to Community
                            </Button>
                        )}

                        {scan.reportedToCommunity && (
                            <div className="flex items-center justify-center gap-2 p-4 text-safe-500 font-bold text-sm bg-safe-100/10 rounded-xl border border-safe-500/20">
                                <CheckCircle2 size={18} /> Reported to Community
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
