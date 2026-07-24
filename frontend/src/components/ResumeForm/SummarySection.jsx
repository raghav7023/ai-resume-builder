// ============================================================
// SummarySection.jsx - Professional Summary with AI Features
// Yahan user manually summary likh sakta hai ya AI se generate karwa sakta hai
// ============================================================

import { useState } from 'react';
import { generateSummary, improveSummary } from '../../services/aiService';
import toast from 'react-hot-toast';
import { Sparkles, Wand2 } from 'lucide-react';

const SummarySection = ({ summary, onChange, personalInfo, skills }) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');

  // AI se naya summary generate karo
  const handleGenerateSummary = async () => {
    if (!jobTitle) {
      toast.error('Pehle job title / target role likho!');
      return;
    }

    setAiLoading(true);
    try {
      // Skills ka text banao
      const skillsText = skills?.map(s => s.items).join(', ') || '';

      // AI service call karo
      const result = await generateSummary({
        name: personalInfo?.fullName || '',
        jobTitle,
        skills: skillsText,
        education: '', // optional
      });

      onChange(result.summary); // summary state update karo
      toast.success('AI ne summary likh di! ✨');
    } catch (error) {
      const msg = error.response?.data?.message || 'AI summary generate nahi kar paya';
      toast.error(msg);
    } finally {
      setAiLoading(false);
    }
  };

  // Existing summary ko improve karo
  const handleImproveSummary = async () => {
    if (!summary?.trim()) {
      toast.error('Pehle kuch summary likho toh improve karein!');
      return;
    }

    setAiLoading(true);
    try {
      const result = await improveSummary({ existingSummary: summary, jobTitle });
      onChange(result.summary);
      toast.success('Summary improve ho gayi! 🚀');
    } catch (error) {
      const msg = error.response?.data?.message || 'Summary improve nahi hui';
      toast.error(msg);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div>
      {/* Job Title Input - AI ke liye zaroori */}
      <div className="form-group">
        <label className="form-label">Target Job Role (AI ke liye)</label>
        <input
          type="text"
          className="form-input"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="jaise: Full Stack Developer, Data Scientist"
          id="summary-job-title"
        />
      </div>

      {/* AI Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className="ai-btn"
          onClick={handleGenerateSummary}
          disabled={aiLoading}
          id="generate-summary-btn"
        >
          {aiLoading ? <span className="spinner"></span> : <Sparkles size={14} />}
          AI se Generate Karo
        </button>

        <button
          className="ai-btn"
          onClick={handleImproveSummary}
          disabled={aiLoading}
          id="improve-summary-btn"
        >
          {aiLoading ? <span className="spinner"></span> : <Wand2 size={14} />}
          AI se Improve Karo
        </button>
      </div>

      {/* Summary Textarea */}
      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea
          className="form-textarea"
          value={summary || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Apni professional summary yahan likho ya AI se generate karwao..."
          rows={5}
          id="summary-textarea"
        />
      </div>

      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        💡 Tip: Job role likhke "AI se Generate Karo" click karo - Gemini AI ek perfect summary likhega!
      </p>
    </div>
  );
};

export default SummarySection;
