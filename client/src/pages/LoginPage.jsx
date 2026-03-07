import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        try {
            const res = await login(formData.email, formData.password);
            if (res.success) {
                toast.success('Welcome back!');
                navigate('/');
            }
        } catch (err) {
            setErrors({ auth: err.response?.data?.message || 'Invalid credentials' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-8 md:py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="text-center mb-10">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-dark items-center justify-center text-white mb-6">
                        <Shield size={32} />
                    </div>
                    <GradientText className="text-3xl sm:text-4xl font-black mb-2 tracking-tight">Welcome Back.</GradientText>
                    <p className="text-gray-500 font-medium italic">Secure your access to PhishGuard.</p>
                </div>

                <GlassCard padding="lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors.auth && (
                            <div className="p-4 bg-danger-100/10 border border-danger-500/20 rounded-xl text-danger-500 text-sm font-bold text-center italic animate-fade-in">
                                {errors.auth}
                            </div>
                        )}

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            icon={<Mail size={18} />}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock size={18} />}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-300 text-action-500 focus:ring-action-400" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="hover:text-gray-900 transition-colors">Forgot Password?</a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-4 text-base"
                            isLoading={isSubmitting}
                        >
                            Sign In <ArrowRight size={18} />
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            New to PhishGuard? <Link to="/register" className="font-bold text-gray-900 hover:text-action-500 transition-colors">Create account</Link>
                        </p>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default LoginPage;
