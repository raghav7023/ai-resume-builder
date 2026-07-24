// ============================================================
// Login.jsx - Login Page
// User apna email aur password se login karta hai yahan
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import toast from 'react-hot-toast';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';
import './Auth.css';

const Login = () => {
  // Form state - email aur password store karo
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Input change handle karo
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit handle karo
  const handleSubmit = async (e) => {
    e.preventDefault(); // page refresh rokna

    if (!formData.email || !formData.password) {
      toast.error('Email aur password dono zaroori hain!');
      return;
    }

    setLoading(true);
    try {
      // Backend se login karo
      const data = await loginUser(formData.email, formData.password);
      
      // Context mein user save karo
      login(data, data.token);
      
      toast.success(`Welcome back, ${data.name}! 🎉`);
      navigate('/dashboard');
    } catch (error) {
      // Server se error aaya
      const msg = error.response?.data?.message || 'Login fail ho gaya, dobara try karo';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background glows */}
      <div className="auth-glow auth-glow-1"></div>
      <div className="auth-glow auth-glow-2"></div>

      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <Sparkles size={24} />
          </div>
          <h1 className="auth-title">Wapas Aao! 👋</h1>
          <p className="auth-subtitle">Apne account mein login karo</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Input */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="aapka@email.com"
                className="form-input input-with-icon"
                id="login-email"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="form-input input-with-icon"
                id="login-password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
            id="login-submit-btn"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Login ho raha hai...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Login Karo
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="auth-footer">
          Naya account nahi hai?{' '}
          <Link to="/signup" className="auth-link">
            Abhi Signup Karo
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
