// ============================================================
// App.jsx - Main Application with Routes
// Yahan saare pages connected hain
// React Router se navigation hota hai
// ============================================================

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';

// Components
import Navbar from './components/Navbar';

// CSS import for form components (global hai)
import './components/ResumeForm/FormComponents.css';

// ProtectedRoute - sirf logged-in users access kar saken
// Agar logged in nahi hai toh login page pe bhej do
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  // Loading ke time kuch mat dikhao
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">✨</div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Load ho raha hai...</p>
        </div>
      </div>
    );
  }

  // Agar logged in nahi hai toh login pe redirect karo
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// GuestRoute - sirf logged-out users ke liye (login/signup pages)
// Agar pehle se logged in hai toh dashboard pe bhejo
const GuestRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return null;
  return !isLoggedIn ? children : <Navigate to="/dashboard" replace />;
};

// Main App Component
function App() {
  return (
    // AuthProvider - poori app mein auth state share karta hai
    <AuthProvider>
      <Router>
        {/* Toast notifications - success/error messages dikhane ke liye */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a2e',
              color: '#f1f5f9',
              border: '1px solid #2d2d44',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />

        {/* Navbar har page pe dikhta hai */}
        <Navbar />

        {/* Routes - kaunsa URL pe kaunsa page dikhe */}
        <Routes>
          {/* Home - sabke liye */}
          <Route path="/" element={<Home />} />

          {/* Auth Routes - sirf logged out users ke liye */}
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

          {/* Protected Routes - sirf logged in users ke liye */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/builder/:id" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />

          {/* Koi bhi unknown route pe home pe redirect karo */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
