import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, History, Users, GraduationCap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'History', path: '/history', icon: History, protected: true },
        { name: 'Community', path: '/community', icon: Users, protected: false },
        { name: 'Learn', path: '/learn', icon: GraduationCap, protected: false },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                            <Shield size={24} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">PhishGuard</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                (!link.protected || isAuthenticated) && (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={cn(
                                            "text-sm font-medium transition-colors hover:text-gray-900",
                                            location.pathname === link.path ? "text-gray-900" : "text-gray-500"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div>

                        <div className="h-4 w-[1px] bg-gray-200" />

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link to="/history" className="flex items-center gap-2 group">
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                                        <img src={user.avatar} alt={user.name} />
                                    </div>
                                    <span className="text-sm font-semibold">{user.name.split(' ')[0]}</span>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={logout}>Sign Out</Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4">Sign In</Link>
                                <Link to="/register">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-gray-600"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                (!link.protected || isAuthenticated) && (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-900 transition-colors">
                                                <link.icon size={20} />
                                            </div>
                                            <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-900">{link.name}</span>
                                        </div>
                                        <ChevronRight size={18} className="text-gray-300" />
                                    </Link>
                                )
                            ))}

                            <div className="h-[1px] w-full bg-gray-100 my-2" />

                            {isAuthenticated ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 px-1">
                                        <img src={user.avatar} alt="" className="w-12 h-12 rounded-full border border-gray-100" />
                                        <div>
                                            <p className="font-bold text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <Button onClick={logout} variant="secondary" className="w-full">Sign Out</Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" className="w-full text-center py-3 font-semibold text-gray-700">Sign In</Link>
                                    <Link to="/register">
                                        <Button className="w-full">Get Started</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
