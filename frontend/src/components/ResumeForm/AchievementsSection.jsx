// AchievementsSection.jsx
import { Plus, Trash2 } from 'lucide-react';

const emptyAchievement = { title: '', description: '' };

const AchievementsSection = ({ data, onChange }) => {
  const addEntry = () => onChange([...data, { ...emptyAchievement }]);
  const removeEntry = (i) => onChange(data.filter((_, idx) => idx !== i));
  const handleChange = (i, field, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="entry-card">
          <div className="entry-header">
            <span className="entry-number">Achievement #{index + 1}</span>
            <button onClick={() => removeEntry(index)} className="btn btn-danger btn-sm" id={`remove-achievement-${index}`}>
              <Trash2 size={13} />
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Achievement Title</label>
            <input type="text" className="form-input" value={item.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              placeholder="1st Place - National Hackathon" id={`achievement-title-${index}`} />
          </div>

          <div className="form-group">
            <label className="form-label">Description (optional)</label>
            <textarea className="form-textarea" value={item.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Thodi detail de sakte hain..."
              rows={2} id={`achievement-desc-${index}`} />
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="btn btn-secondary btn-sm w-full-btn" id="add-achievement-btn">
        <Plus size={16} /> Achievement Add Karo
      </button>
    </div>
  );
};

export default AchievementsSection;
