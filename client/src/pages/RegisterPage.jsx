import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        try {
            const res = await register(formData.name, formData.email, formData.password);
            if (res.success) {
                toast.success('Account created! Stay safe.');
                navigate('/');
            }
        } catch (err) {
            setErrors({ auth: err.response?.data?.message || 'Registration failed' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="text-center mb-10">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-dark items-center justify-center text-white mb-6">
                        <ShieldCheck size={32} />
                    </div>
                    <GradientText className="text-4xl font-black mb-2 tracking-tight">Join the Fight.</GradientText>
                    <p className="text-gray-500 font-medium italic">Create your PhishGuard security vault.</p>
                </div>

                <GlassCard padding="lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors.auth && (
                            <div className="p-4 bg-danger-100/10 border border-danger-500/20 rounded-xl text-danger-500 text-sm font-bold text-center italic animate-fade-in">
                                {errors.auth}
                            </div>
                        )}

                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            icon={<User size={18} />}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />

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
                            placeholder="Min. 6 characters"
                            icon={<Lock size={18} />}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        <p className="text-[10px] text-gray-400 leading-relaxed font-medium italic">
                            By registering, you agree to PhishGuard's mission and terms of zero-tolerance for cybercrime.
                        </p>

                        <Button
                            type="submit"
                            className="w-full py-4 text-base"
                            isLoading={isSubmitting}
                        >
                            Create Account <ArrowRight size={18} />
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account? <Link to="/login" className="font-bold text-gray-900 hover:text-action-500 transition-colors">Sign in</Link>
                        </p>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
