// ============================================================
// ResumeBuilder.jsx - Main Builder Page
// Yahan user resume banata hai - left side form, right side preview
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResumeById, updateResume } from '../services/resumeService';
import toast from 'react-hot-toast';

// Form Section Components
import PersonalInfo from '../components/ResumeForm/PersonalInfo';
import EducationSection from '../components/ResumeForm/EducationSection';
import SkillsSection from '../components/ResumeForm/SkillsSection';
import ProjectsSection from '../components/ResumeForm/ProjectsSection';
import ExperienceSection from '../components/ResumeForm/ExperienceSection';
import CertificationsSection from '../components/ResumeForm/CertificationsSection';
import AchievementsSection from '../components/ResumeForm/AchievementsSection';
import SummarySection from '../components/ResumeForm/SummarySection';

// Templates
import ModernTemplate from '../components/Templates/ModernTemplate';
import ProfessionalTemplate from '../components/Templates/ProfessionalTemplate';
import MinimalTemplate from '../components/Templates/MinimalTemplate';

import { Save, Download, Eye, ChevronDown, ChevronUp, Layout } from 'lucide-react';
import './ResumeBuilder.css';

// Default empty resume data
const defaultResume = {
  title: 'Mera Resume',
  template: 'modern',
  personalInfo: {
    fullName: '', email: '', phone: '', linkedin: '', github: '', portfolio: '', location: ''
  },
  summary: '',
  education: [],
  skills: [],
  projects: [],
  experience: [],
  certifications: [],
  achievements: [],
};

const ResumeBuilder = () => {
  // URL se resume ID lo (:id wala part)
  const { id } = useParams();
  const navigate = useNavigate();

  // Resume ka saara data ek state mein rakhte hain
  const [resumeData, setResumeData] = useState(defaultResume);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('personal'); // kaunsa section open hai

  // Component load pe resume data fetch karo
  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const data = await getResumeById(id);
      // Existing data se merge karo taaki empty fields remain
      setResumeData({ ...defaultResume, ...data });
    } catch (error) {
      toast.error('Resume load nahi hua');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Resume data update karne ka function - koi bhi section use kar sakta hai
  // useCallback = performance ke liye - function baar baar nahi banega
  const updateResumeData = useCallback((section, value) => {
    setResumeData(prev => ({ ...prev, [section]: value }));
  }, []);

  // Resume save karo
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateResume(id, resumeData);
      toast.success('Resume save ho gaya! ✅');
    } catch (error) {
      toast.error('Save nahi hua, dobara try karo');
    } finally {
      setSaving(false);
    }
  };

  // PDF Download using html2pdf.js
  const handleDownload = async () => {
    const element = document.getElementById('resume-preview-area');
    if (!element) {
      toast.error('Preview element nahi mila');
      return;
    }

    try {
      // html2pdf ko dynamically import karo
      const html2pdf = (await import('html2pdf.js')).default;
      
      const options = {
        margin: 0,
        filename: `${resumeData.personalInfo?.fullName || 'resume'}_resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      toast.loading('PDF ban raha hai...');
      await html2pdf().set(options).from(element).save();
      toast.dismiss();
      toast.success('PDF download ho gaya! 🎉');
    } catch (error) {
      toast.dismiss();
      toast.error('PDF download fail ho gaya');
      console.error(error);
    }
  };

  // Template select karo
  const renderTemplate = () => {
    const props = { resumeData };
    switch (resumeData.template) {
      case 'professional': return <ProfessionalTemplate {...props} />;
      case 'minimal': return <MinimalTemplate {...props} />;
      default: return <ModernTemplate {...props} />;
    }
  };

  // Sections list - form mein dikhaane ke liye
  const sections = [
    { id: 'personal', label: '👤 Personal Info' },
    { id: 'summary', label: '✨ Summary (AI)' },
    { id: 'education', label: '🎓 Education' },
    { id: 'skills', label: '💡 Skills (AI)' },
    { id: 'projects', label: '🔨 Projects (AI)' },
    { id: 'experience', label: '💼 Experience' },
    { id: 'certifications', label: '🏆 Certifications' },
    { id: 'achievements', label: '⭐ Achievements' },
  ];

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">✨</div>
          <p style={{ color: 'var(--text-secondary)' }}>Resume load ho raha hai...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="builder-page">
      {/* ===== TOP BAR ===== */}
      <div className="builder-topbar">
        <div className="builder-topbar-left">
          <input
            type="text"
            value={resumeData.title}
            onChange={(e) => updateResumeData('title', e.target.value)}
            className="resume-title-input"
            placeholder="Resume ka naam"
            id="resume-title-input"
          />
        </div>

        <div className="builder-topbar-right">
          {/* Template Selector */}
          <div className="template-selector">
            <Layout size={16} />
            <select
              value={resumeData.template}
              onChange={(e) => updateResumeData('template', e.target.value)}
              className="template-select"
              id="template-select"
            >
              <option value="modern">Modern</option>
              <option value="professional">Professional</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <button onClick={handleSave} className="btn btn-success btn-sm" disabled={saving} id="save-resume-btn">
            {saving ? <><span className="spinner"></span> Saving...</> : <><Save size={16} /> Save</>}
          </button>

          <button onClick={handleDownload} className="btn btn-primary btn-sm" id="download-pdf-btn">
            <Download size={16} /> PDF Download
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT: LEFT FORM + RIGHT PREVIEW ===== */}
      <div className="builder-content">
        {/* LEFT: Form Sections */}
        <div className="builder-form">
          {sections.map((section) => (
            <div key={section.id} className="form-section-wrapper">
              {/* Section Header - click karo to open/close */}
              <button
                className={`section-toggle ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
                id={`section-toggle-${section.id}`}
              >
                <span>{section.label}</span>
                {activeSection === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Section Content - sirf tab dikhao jab active ho */}
              {activeSection === section.id && (
                <div className="section-content">
                  {section.id === 'personal' && (
                    <PersonalInfo data={resumeData.personalInfo} onChange={(v) => updateResumeData('personalInfo', v)} />
                  )}
                  {section.id === 'summary' && (
                    <SummarySection
                      summary={resumeData.summary}
                      onChange={(v) => updateResumeData('summary', v)}
                      personalInfo={resumeData.personalInfo}
                      skills={resumeData.skills}
                    />
                  )}
                  {section.id === 'education' && (
                    <EducationSection data={resumeData.education} onChange={(v) => updateResumeData('education', v)} />
                  )}
                  {section.id === 'skills' && (
                    <SkillsSection data={resumeData.skills} onChange={(v) => updateResumeData('skills', v)} />
                  )}
                  {section.id === 'projects' && (
                    <ProjectsSection data={resumeData.projects} onChange={(v) => updateResumeData('projects', v)} />
                  )}
                  {section.id === 'experience' && (
                    <ExperienceSection data={resumeData.experience} onChange={(v) => updateResumeData('experience', v)} />
                  )}
                  {section.id === 'certifications' && (
                    <CertificationsSection data={resumeData.certifications} onChange={(v) => updateResumeData('certifications', v)} />
                  )}
                  {section.id === 'achievements' && (
                    <AchievementsSection data={resumeData.achievements} onChange={(v) => updateResumeData('achievements', v)} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT: Live Resume Preview */}
        <div className="builder-preview">
          <div className="preview-header">
            <Eye size={16} />
            <span>Live Preview</span>
          </div>
          <div className="preview-container">
            <div id="resume-preview-area">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
