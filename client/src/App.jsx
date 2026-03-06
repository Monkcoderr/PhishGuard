import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

// Layout
import Layout from './components/layout/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import CommunityPage from './pages/CommunityPage';
import LearnPage from './pages/LearnPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Toaster position="top-right" toastOptions={{
                    style: {
                        background: '#1A1A1A',
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }
                }} />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<LandingPage />} />
                        <Route path="results/:id" element={<ResultsPage />} />
                        <Route path="history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
                        <Route path="community" element={<CommunityPage />} />
                        <Route path="learn" element={<LearnPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
