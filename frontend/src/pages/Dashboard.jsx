// ============================================================
// Dashboard.jsx - User ka Resume Management Page
// Yahan user apne saare resumes dekh, bana, edit aur delete kar sakta hai
// ============================================================

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getResumes, deleteResume, createResume, duplicateResume, getDashboardStats } from '../services/resumeService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  Plus, Edit, Trash2, FileText, Calendar, Sparkles, Layout, Copy, BarChart3
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [stats, setStats] = useState({ totalResumes: 0, completedResumes: 0, recentResumes: [] });

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [resumeData, dashboardData] = await Promise.all([
        getResumes(),
        getDashboardStats(),
      ]);
      setResumes(resumeData);
      setStats(dashboardData);
    } catch (error) {
      toast.error('Dashboard data load nahi ho saka');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    setCreating(true);
    try {
      const newResume = await createResume({
        title: 'Mera Naya Resume',
        personalInfo: { fullName: user?.name || '' },
      });
      toast.success('Naya resume ban gaya! ✨');
      navigate(`/builder/${newResume._id}`);
    } catch (error) {
      toast.error('Resume nahi ban paya');
    } finally {
      setCreating(false);
    }
  };

  const handleDuplicate = async (id, title) => {
    try {
      const duplicatedResume = await duplicateResume(id);
      setResumes((prev) => [duplicatedResume, ...prev]);
      toast.success(`"${title}" duplicate ho gaya`);
      navigate(`/builder/${duplicatedResume._id}`);
    } catch (error) {
      toast.error('Duplicate nahi hua');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`"${title}" delete karna chahte ho?`)) return;

    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success('Resume delete ho gaya');
    } catch (error) {
      toast.error('Delete nahi hua');
    }
  };

  // Date format karo - readable format mein
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Template ke hisaab se color
  const templateColors = {
    modern: '#6366f1',
    professional: '#06b6d4',
    minimal: '#10b981',
  };

  return (
    <div className="dashboard-page page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Mera Dashboard 📊
            </h1>
            <p className="dashboard-subtitle">
              Namaste {user?.name}! Apne resumes manage karo
            </p>
          </div>

          {/* Naya resume button */}
          <button
            onClick={handleCreateResume}
            className="btn btn-primary"
            disabled={creating}
            id="create-resume-btn"
          >
            {creating ? (
              <><span className="spinner"></span> Ban raha hai...</>
            ) : (
              <><Plus size={18} /> Naya Resume Banao</>
            )}
          </button>
        </div>

        <div className="stats-bar">
          <div className="stat-box">
            <span className="stat-box-number">{stats.totalResumes || resumes.length}</span>
            <span className="stat-box-label">Total Resumes</span>
          </div>
          <div className="stat-box">
            <span className="stat-box-number">{stats.completedResumes || 0}</span>
            <span className="stat-box-label">Completed</span>
          </div>
          <div className="stat-box">
            <span className="stat-box-number">{stats.recentResumes?.length || 0}</span>
            <span className="stat-box-label">Recently Edited</span>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          // Loading state
          <div className="loading-screen">
            <div className="loading-content">
              <div className="loading-logo">✨</div>
              <p style={{ color: 'var(--text-secondary)' }}>Resumes load ho rahe hain...</p>
            </div>
          </div>
        ) : resumes.length === 0 ? (
          // Empty state - koi resume nahi hai
          <div className="empty-state">
            <div className="empty-icon">
              <FileText size={48} />
            </div>
            <h2>Abhi tak koi resume nahi!</h2>
            <p>Apna pehla AI-powered resume banao. Sirf minutes lagte hain! 🚀</p>
            <button
              onClick={handleCreateResume}
              className="btn btn-primary btn-lg"
              disabled={creating}
            >
              <Sparkles size={20} />
              Pehla Resume Banao
            </button>
          </div>
        ) : (
          // Resume cards grid
          <div className="resumes-grid">
            {resumes.map((resume) => (
              <div key={resume._id} className="resume-card">
                {/* Card Top - template indicator */}
                <div
                  className="resume-card-top"
                  style={{ background: `${templateColors[resume.template] || '#6366f1'}20` }}
                >
                  <Layout size={32} style={{ color: templateColors[resume.template] || '#6366f1' }} />
                  <span
                    className="template-badge"
                    style={{
                      background: `${templateColors[resume.template] || '#6366f1'}20`,
                      color: templateColors[resume.template] || '#6366f1',
                      border: `1px solid ${templateColors[resume.template] || '#6366f1'}40`
                    }}
                  >
                    {resume.template || 'modern'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="resume-card-body">
                  <h3 className="resume-card-title">{resume.title || 'Mera Resume'}</h3>
                  
                  {resume.personalInfo?.fullName && (
                    <p className="resume-card-name">{resume.personalInfo.fullName}</p>
                  )}

                  <div className="resume-card-date">
                    <Calendar size={13} />
                    <span>Updated: {formatDate(resume.updatedAt)}</span>
                  </div>

                  {/* Completion indicators */}
                  <div className="resume-card-tags">
                    {resume.personalInfo?.email && <span className="tag">📧 Email</span>}
                    {resume.skills?.length > 0 && <span className="tag">💡 Skills</span>}
                    {resume.projects?.length > 0 && <span className="tag">🔨 Projects</span>}
                    {resume.summary && <span className="tag">✨ Summary</span>}
                  </div>
                </div>

                <div className="resume-card-actions">
                  <Link
                    to={`/builder/${resume._id}`}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                    id={`edit-resume-${resume._id}`}
                  >
                    <Edit size={15} />
                    Edit Karo
                  </Link>
                  <button
                    onClick={() => handleDuplicate(resume._id, resume.title)}
                    className="btn btn-secondary btn-sm"
                    id={`duplicate-resume-${resume._id}`}
                    title="Duplicate"
                  >
                    <Copy size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(resume._id, resume.title)}
                    className="btn btn-danger btn-sm"
                    id={`delete-resume-${resume._id}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
