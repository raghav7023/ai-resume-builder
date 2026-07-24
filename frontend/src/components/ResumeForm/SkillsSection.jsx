// SkillsSection.jsx - Skills Form with AI Suggestion Feature
import { useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { suggestSkills, suggestAtsKeywords } from '../../services/aiService';
import toast from 'react-hot-toast';

const emptySkill = { category: '', items: '' };

const SkillsSection = ({ data, onChange }) => {
  const [jobRole, setJobRole] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsKeywords, setAtsKeywords] = useState('');

  const addEntry = () => onChange([...data, { ...emptySkill }]);
  const removeEntry = (i) => onChange(data.filter((_, idx) => idx !== i));
  const handleChange = (i, field, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  // AI se skills suggest karwao
  const handleSuggestSkills = async () => {
    if (!jobRole) { toast.error('Job role likho pehle!'); return; }
    setLoading(true);
    try {
      const currentSkills = data.map(s => s.items).join(', ');
      const result = await suggestSkills({ jobRole, currentSkills });
      setAiResult(result.skills);
      toast.success('AI ne skills suggest kar di! ✨');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Skills suggest nahi hui');
    } finally {
      setLoading(false);
    }
  };

  // ATS Keywords suggest karwao
  const handleAtsKeywords = async () => {
    if (!jobRole) { toast.error('Job role likho pehle!'); return; }
    setAtsLoading(true);
    try {
      const result = await suggestAtsKeywords({ jobTitle: jobRole });
      setAtsKeywords(result.keywords);
      toast.success('ATS keywords ready! 🎯');
    } catch (error) {
      toast.error(error.response?.data?.message || 'ATS keywords nahi mile');
    } finally {
      setAtsLoading(false);
    }
  };

  return (
    <div>
      {/* AI Section */}
      <div className="ai-section-box">
        <p className="ai-section-title">🤖 AI se Skills Pata Karo</p>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="Job Role: Full Stack Developer, Data Engineer..."
            id="skills-job-role"
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="ai-btn" onClick={handleSuggestSkills} disabled={loading} id="suggest-skills-btn">
            {loading ? <span className="spinner"></span> : <Sparkles size={14} />}
            Skills Suggest Karo
          </button>
          <button className="ai-btn" onClick={handleAtsKeywords} disabled={atsLoading} id="ats-keywords-btn">
            {atsLoading ? <span className="spinner"></span> : <Sparkles size={14} />}
            ATS Keywords
          </button>
        </div>

        {/* AI Result dikhao */}
        {aiResult && (
          <div className="ai-result-box">
            <p style={{ fontSize: '0.78rem', color: 'var(--primary-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
              💡 Suggested Skills:
            </p>
            <pre className="ai-result-text">{aiResult}</pre>
          </div>
        )}

        {atsKeywords && (
          <div className="ai-result-box" style={{ marginTop: '0.5rem' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
              🎯 ATS Keywords:
            </p>
            <pre className="ai-result-text">{atsKeywords}</pre>
          </div>
        )}
      </div>

      {/* Manual Skills Entry */}
      {data.map((skill, index) => (
        <div key={index} className="entry-card">
          <div className="entry-header">
            <span className="entry-number">Category #{index + 1}</span>
            <button onClick={() => removeEntry(index)} className="btn btn-danger btn-sm" id={`remove-skill-${index}`}>
              <Trash2 size={13} />
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Category (jaise: Programming Languages)</label>
            <input
              type="text"
              className="form-input"
              value={skill.category}
              onChange={(e) => handleChange(index, 'category', e.target.value)}
              placeholder="Programming Languages"
              id={`skill-category-${index}`}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skills (comma separated)</label>
            <input
              type="text"
              className="form-input"
              value={skill.items}
              onChange={(e) => handleChange(index, 'items', e.target.value)}
              placeholder="JavaScript, Python, Java, C++"
              id={`skill-items-${index}`}
            />
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="btn btn-secondary btn-sm w-full-btn" id="add-skill-btn">
        <Plus size={16} /> Skills Category Add Karo
      </button>
    </div>
  );
};

export default SkillsSection;
