import React, { createContext, useState, useEffect } from 'react';
import api from '../lib/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const savedToken = localStorage.getItem('phishguard_token');
            if (savedToken) {
                try {
                    const res = await api.get('/auth/me');
                    if (res.data.success) {
                        setUser(res.data.user);
                        setToken(savedToken);
                    }
                } catch (error) {
                    localStorage.removeItem('phishguard_token');
                    setUser(null);
                    setToken(null);
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        if (res.data.success) {
            localStorage.setItem('phishguard_token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
        }
        return res.data;
    };

    const register = async (name, email, password) => {
        const res = await api.post('/auth/register', { name, email, password });
        if (res.data.success) {
            localStorage.setItem('phishguard_token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
        }
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('phishguard_token');
        setUser(null);
        setToken(null);
    };

    const updateUser = (userData) => {
        setUser(prev => ({ ...prev, ...userData }));
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated: !!token,
            isLoading,
            login,
            register,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};
