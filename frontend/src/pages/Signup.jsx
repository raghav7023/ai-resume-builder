// ============================================================
// Signup.jsx - Registration Page
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signupUser } from '../services/authService';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, Sparkles } from 'lucide-react';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Sab fields bharo!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password kam se kam 6 characters ka hona chahiye');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Dono passwords match nahi kar rahe!');
      return;
    }

    setLoading(true);
    try {
      // Backend pe signup karo
      const data = await signupUser(formData.name, formData.email, formData.password);
      
      // Context mein save karo
      login(data, data.token);
      
      toast.success(`Welcome, ${data.name}! Resume banana start karo! 🎉`);
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup fail ho gaya';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-1"></div>
      <div className="auth-glow auth-glow-2"></div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Sparkles size={24} />
          </div>
          <h1 className="auth-title">Account Banao 🚀</h1>
          <p className="auth-subtitle">Free mein shuru karo - koi credit card nahi chahiye</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name */}
          <div className="form-group">
            <label className="form-label">Poora Naam</label>
            <div className="input-wrapper">
              <User size={16} className="input-icon" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tumhara Naam"
                className="form-input input-with-icon"
                id="signup-name"
                required
              />
            </div>
          </div>

          {/* Email */}
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
                id="signup-email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Kam se kam 6 characters"
                className="form-input input-with-icon"
                id="signup-password"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">Password Confirm Karo</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Same password dobara likho"
                className="form-input input-with-icon"
                id="signup-confirm-password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
            id="signup-submit-btn"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Account ban raha hai...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Free Account Banao
              </>
            )}
          </button>
        </form>

        <p className="auth-footer">
          Pehle se account hai?{' '}
          <Link to="/login" className="auth-link">Login Karo</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
