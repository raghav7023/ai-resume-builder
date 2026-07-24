// ============================================================
// Home.jsx - Landing Page
// Ye page sabse pehle dikhta hai - app ka face hai ye
// ============================================================

import { Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, Download, Star, ArrowRight, Bot, FileText, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="home-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        {/* Background glow effects */}
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>AI-Powered by Google Gemini</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            Banao Professional Resume
            <span className="hero-title-gradient"> AI ke Saath</span>
          </h1>

          <p className="hero-subtitle">
            Google Gemini AI use karke seconds mein professional summary, 
            ATS-friendly content aur job-winning resume banao. Bilkul FREE!
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <Link
              to={isLoggedIn ? '/dashboard' : '/signup'}
              className="btn btn-primary btn-lg"
            >
              <Sparkles size={18} />
              {isLoggedIn ? 'Dashboard Dekho' : 'Free mein Start karo'}
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Login Karo
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">AI Features</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Templates</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Kyun Choose Karein Hamara Builder?</h2>
            <p>Sab kuch ek jagah - AI se powered, bilkul free</p>
          </div>

          <div className="features-grid">
            {/* Feature Cards */}
            {[
              {
                icon: <Bot size={28} />,
                title: 'AI Summary Generator',
                desc: 'Sirf apna naam aur job role batao - Gemini AI ek perfect professional summary banayega!',
                color: '#6366f1',
              },
              {
                icon: <Zap size={28} />,
                title: 'ATS Keywords',
                desc: 'AI tumhare resume ke liye best ATS keywords suggest karega jo job applications mein help kare.',
                color: '#06b6d4',
              },
              {
                icon: <FileText size={28} />,
                title: 'Project Descriptions',
                desc: 'Sirf project ka naam do - AI poori professional description likh dega tumhare liye.',
                color: '#f59e0b',
              },
              {
                icon: <Palette size={28} />,
                title: '3 Premium Templates',
                desc: 'Modern, Professional aur Minimal - teen beautiful templates mein se choose karo.',
                color: '#10b981',
              },
              {
                icon: <Shield size={28} />,
                title: 'Secure & Private',
                desc: 'JWT authentication se tumhara data safe rahega. Koi aur dekh nahi sakta.',
                color: '#ec4899',
              },
              {
                icon: <Download size={28} />,
                title: 'PDF Download',
                desc: 'Ek click mein apna resume PDF mein download karo - bilkul professional quality mein.',
                color: '#8b5cf6',
              },
            ].map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon" style={{ color: feature.color, background: `${feature.color}20` }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="steps-section">
        <div className="container">
          <div className="section-header">
            <h2>Kaise Kaam Karta Hai?</h2>
            <p>Sirf 3 easy steps mein professional resume ready</p>
          </div>

          <div className="steps-grid">
            {[
              { step: '01', title: 'Signup karo', desc: 'Free account banao - koi credit card nahi chahiye' },
              { step: '02', title: 'Details bharo', desc: 'Apna info bharo aur AI features use karo' },
              { step: '03', title: 'Download karo', desc: 'PDF download karo aur job apply karo!' },
            ].map((item, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{item.step}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-glow"></div>
            <Star size={40} className="cta-star" />
            <h2>Aaj Hi Shuru Karo!</h2>
            <p>Thousands of job seekers already use our AI resume builder. Tumhari baari hai!</p>
            <Link to={isLoggedIn ? '/dashboard' : '/signup'} className="btn btn-primary btn-lg">
              <Sparkles size={18} />
              {isLoggedIn ? 'Resume Banao' : 'Free Account Banao'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ using React + Node.js + Google Gemini AI</p>
      </footer>
    </div>
  );
};

export default Home;
