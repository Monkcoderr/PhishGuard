import axios from 'axios';

const apiTimeout = Number(import.meta.env.VITE_API_TIMEOUT_MS) || 120000;
const defaultApiUrl = import.meta.env.PROD
  ? 'https://phishguard-wer8.onrender.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: apiTimeout
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('phishguard_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}` ;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('phishguard_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
