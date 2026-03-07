import { useState } from 'react';
import api from '../lib/api';
import { toast } from 'react-hot-toast';

const useScan = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const analyzeEmail = async (emailContent) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const res = await api.post('/scan/analyze', { emailContent });
      return res.data.scan;
    } catch (err) {
      const isTimeout = err.code === 'ECONNABORTED' || String(err.message || '').toLowerCase().includes('timeout');
      const message = isTimeout
        ? 'Analysis is taking longer than expected. Please try again in a moment.'
        : err.response?.data?.message || 'Something went wrong during analysis';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScanHistory = async (page = 1) => {
    try {
      const res = await api.get(`/scan/history?page=${page}`);
      return res.data;
    } catch (err) {
      console.error(err);
      return { scans: [], pagination: {} };
    }
  };

  const getScanById = async (id) => {
    try {
      const res = await api.get(`/scan/${id}`);
      return res.data.scan;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteScan = async (id) => {
    try {
      const res = await api.delete(`/scan/${id}`);
      toast.success('Scan deleted');
      return res.data;
    } catch (err) {
      toast.error('Failed to delete scan');
      throw err;
    }
  };

  const reportScam = async (scanId) => {
    try {
      const res = await api.post('/community/report', { scanId });
      toast.success('Reported to community!');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to report scam');
      throw err;
    }
  };

  return { 
    analyzeEmail, 
    getScanHistory, 
    getScanById, 
    deleteScan, 
    reportScam, 
    isAnalyzing, 
    error 
  };
};

export default useScan;
