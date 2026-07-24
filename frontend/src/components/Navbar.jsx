// ============================================================
// Navbar.jsx - Top navigation bar
// Ye component sabhi pages pe dikhta hai
// ============================================================

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logout ho gaye! Phir milenge 👋');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <Sparkles size={20} />
          </div>
          <span className="logo-text">AI Resume<span className="logo-accent">Builder</span></span>
        </Link>

        {/* Nav Links */}
        <div className="navbar-links">
          {isLoggedIn ? (
            // Logged in user ke liye
            <>
              <span className="nav-greeting">Namaste, {user?.name?.split(' ')[0]} 👋</span>
              <Link to="/dashboard" className="nav-link">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            // Guest user ke liye
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Free mein Start karo 🚀
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
