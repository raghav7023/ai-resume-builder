// ExperienceSection.jsx - Work Experience Form
import { Plus, Trash2 } from 'lucide-react';

const emptyExp = { jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' };

const ExperienceSection = ({ data, onChange }) => {
  const addEntry = () => onChange([...data, { ...emptyExp }]);
  const removeEntry = (i) => onChange(data.filter((_, idx) => idx !== i));
  const handleChange = (i, field, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      {data.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          💼 Fresher hain toh ye section skip kar sakte hain
        </p>
      )}

      {data.map((exp, index) => (
        <div key={index} className="entry-card">
          <div className="entry-header">
            <span className="entry-number">Experience #{index + 1}</span>
            <button onClick={() => removeEntry(index)} className="btn btn-danger btn-sm" id={`remove-exp-${index}`}>
              <Trash2 size={13} />
            </button>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Job Title *</label>
              <input type="text" className="form-input" value={exp.jobTitle}
                onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                placeholder="Software Engineer" id={`exp-title-${index}`} />
            </div>

            <div className="form-group">
              <label className="form-label">Company *</label>
              <input type="text" className="form-input" value={exp.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                placeholder="Google India" id={`exp-company-${index}`} />
            </div>

            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input type="text" className="form-input" value={exp.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="Jan 2023" id={`exp-start-${index}`} />
            </div>

            <div className="form-group">
              <label className="form-label">End Date</label>
              <input type="text" className="form-input" value={exp.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="Dec 2024 / Present" id={`exp-end-${index}`} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input type="text" className="form-input" value={exp.location}
              onChange={(e) => handleChange(index, 'location', e.target.value)}
              placeholder="Bengaluru, India" id={`exp-location-${index}`} />
          </div>

          <div className="form-group">
            <label className="form-label">Job Description / Responsibilities</label>
            <textarea className="form-textarea" value={exp.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="• Developed REST APIs using Node.js&#10;• Reduced load time by 40%&#10;• Worked with cross-functional teams"
              rows={4} id={`exp-desc-${index}`} />
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="btn btn-secondary btn-sm w-full-btn" id="add-experience-btn">
        <Plus size={16} /> Experience Add Karo
      </button>
    </div>
  );
};

export default ExperienceSection;
