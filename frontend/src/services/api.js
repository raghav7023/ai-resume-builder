// ============================================================
// api.js - Axios Base Configuration
// Ye file ek configured Axios instance banati hai
// Axios = HTTP requests bhejne ki library (fetch ka better version)
// ============================================================

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - har request se pehle ye code chalega
// Automatically token add karta hai header mein
api.interceptors.request.use(
  (config) => {
    // localStorage se token lo
    const token = localStorage.getItem('token');
    
    // Agar token hai toh Authorization header mein add karo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - har response aane pe ye chalega
api.interceptors.response.use(
  (response) => response, // success pe as-is return karo
  (error) => {
    // 401 = unauthorized - token expired ya invalid
    if (error.response?.status === 401) {
      // localStorage clear karo aur login pe redirect karo
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
