import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    Trash2,
    ExternalLink,
    Filter,
    ChevronLeft,
    ChevronRight,
    History as HistoryIcon,
    AlertOctagon,
    ShieldCheck,
    AlertTriangle,
    Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import useScan from '../hooks/useScan';
import { formatDate, truncate, getVerdictColor } from '../lib/utils';
import toast from 'react-hot-toast';

const HistoryPage = () => {
    const [scans, setScans] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { getScanHistory, deleteScan } = useScan();

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const data = await getScanHistory(page);
            setScans(data.scans);
            setPagination(data.pagination);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [page]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this scan from your history?')) {
            try {
                await deleteScan(id);
                setScans(scans.filter(s => s._id !== id));
            } catch (err) { }
        }
    };

    const getVerdictIcon = (verdict) => {
        switch (verdict) {
            case 'safe': return <ShieldCheck size={18} className="text-safe-500" />;
            case 'suspicious': return <AlertTriangle size={18} className="text-warning-500" />;
            case 'dangerous': return <AlertOctagon size={18} className="text-danger-500" />;
            default: return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                        <HistoryIcon size={32} /> Scan Vault
                    </h1>
                    <p className="text-gray-500 mt-2">Your historical analysis and threat detections.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search history..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-action-50 focus:border-action-500 w-full md:w-64"
                        />
                    </div>
                    <Button variant="secondary" size="sm" icon={<Filter size={14} />}>Filter</Button>
                </div>
            </div>

            {isLoading ? (
                <div className="py-20 flex justify-center">
                    <LoadingSpinner size="lg" />
                </div>
            ) : scans.length === 0 ? (
                <GlassCard className="py-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HistoryIcon size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No scans yet</h3>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start analyzing suspicious emails to build your threat history.</p>
                    <Link to="/">
                        <Button>Analyze First Email</Button>
                    </Link>
                </GlassCard>
            ) : (
                <div className="space-y-4">
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <div className="col-span-1">Verdict</div>
                        <div className="col-span-4">Brand / Entity</div>
                        <div className="col-span-2">Risk Score</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-1 text-right">Action</div>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {scans.map((scan) => (
                            <motion.div
                                key={scan._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                layout
                            >
                                <GlassCard padding="none" hover className="group overflow-hidden">
                                    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 p-4 md:p-6">
                                        {/* Verdict - Mobile: Header */}
                                        <div className="col-span-1 flex items-center md:justify-center">
                                            {getVerdictIcon(scan.verdict)}
                                        </div>

                                        {/* Basic Info */}
                                        <div className="col-span-4">
                                            <h4 className="font-bold text-gray-900 group-hover:text-action-500 transition-colors">
                                                {scan.impersonating || 'Unknown'}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[250px]">
                                                Targeted attack via {scan.category}
                                            </p>
                                        </div>

                                        {/* Score */}
                                        <div className="col-span-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden hidden md:block">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${scan.phishingScore}%`,
                                                            backgroundColor: getVerdictColor(scan.verdict).text.replace('text-', '') === 'safe-500' ? '#34C759' :
                                                                getVerdictColor(scan.verdict).text.replace('text-', '') === 'warning-500' ? '#FF9F0A' : '#FF3B30'
                                                        }}
                                                    />
                                                </div>
                                                <span className="font-mono font-bold text-sm text-gray-900">{Math.round(scan.phishingScore)}%</span>
                                            </div>
                                        </div>

                                        {/* Category */}
                                        <div className="col-span-2 hidden md:block">
                                            <Badge variant="neutral" size="sm">{scan.category}</Badge>
                                        </div>

                                        {/* Date */}
                                        <div className="col-span-2 text-sm text-gray-500 flex items-center gap-2">
                                            <Calendar size={14} /> {formatDate(scan.createdAt)}
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-1 flex justify-end gap-2">
                                            <Link to={`/results/${scan._id}`}>
                                                <Button variant="ghost" size="sm" className="p-2 h-9 w-9">
                                                    <ExternalLink size={16} />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="p-2 h-9 w-9 text-gray-400 hover:text-danger-500"
                                                onClick={() => handleDelete(scan._id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-12">
                            <Button
                                variant="secondary"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                            >
                                <ChevronLeft size={16} /> Previous
                            </Button>
                            <span className="text-sm font-bold text-gray-500">
                                Page {page} of {pagination.pages}
                            </span >
                            <Button
                                variant="secondary"
                                size="sm"
                                disabled={page === pagination.pages}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Next <ChevronRight size={16} />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
