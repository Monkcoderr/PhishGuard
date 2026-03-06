import React from 'react';
import { Shield, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-brand-dark flex items-center justify-center text-white">
                                <Shield size={18} />
                            </div>
                            <span className="font-bold text-lg tracking-tight">PhishGuard</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            AI-powered precision phishing detection for the modern zero-trust world. Read between the lies.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-gray-900">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">Analyzer</Link></li>
                            <li><Link to="/history" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">History</Link></li>
                            <li><Link to="/community" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">Community</Link></li>
                            <li><Link to="/stats" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">Global Stats</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-gray-900">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link to="/learn" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">Security Guide</Link></li>
                            <li><Link to="/faq" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">FAQ</Link></li>
                            <li><a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">API Docs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-gray-900">Join the fight</h4>
                        <p className="text-gray-500 text-sm mb-4">Stay ahead of new scams with our weekly threat report.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-300 w-full"
                            />
                            <button className="bg-brand-dark text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-black transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs">
                        © 2024 PhishGuard Intelligence. Built with Google Gemini.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-gray-900 text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 text-xs transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
