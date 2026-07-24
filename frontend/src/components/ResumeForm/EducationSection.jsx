// EducationSection.jsx - Education Form
// Array ke saath kaam karte hain - multiple entries add kar sakte hain

import { Plus, Trash2 } from 'lucide-react';

// Ek empty education entry ka template
const emptyEdu = {
  degree: '', school: '', location: '', startYear: '', endYear: '', grade: ''
};

const EducationSection = ({ data, onChange }) => {
  // Naya education entry add karo
  const addEntry = () => {
    onChange([...data, { ...emptyEdu }]);
  };

  // Existing entry delete karo
  const removeEntry = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // Koi field change hone pe update karo
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      {data.map((edu, index) => (
        <div key={index} className="entry-card">
          <div className="entry-header">
            <span className="entry-number">#{index + 1}</span>
            <button
              onClick={() => removeEntry(index)}
              className="btn btn-danger btn-sm"
              id={`remove-edu-${index}`}
            >
              <Trash2 size={13} />
            </button>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Degree / Course</label>
              <input
                type="text"
                className="form-input"
                value={edu.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                placeholder="B.Tech Computer Science"
                id={`edu-degree-${index}`}
              />
            </div>

            <div className="form-group">
              <label className="form-label">College / School</label>
              <input
                type="text"
                className="form-input"
                value={edu.school}
                onChange={(e) => handleChange(index, 'school', e.target.value)}
                placeholder="IIT Delhi"
                id={`edu-school-${index}`}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Start Year</label>
              <input
                type="text"
                className="form-input"
                value={edu.startYear}
                onChange={(e) => handleChange(index, 'startYear', e.target.value)}
                placeholder="2020"
                id={`edu-start-${index}`}
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Year</label>
              <input
                type="text"
                className="form-input"
                value={edu.endYear}
                onChange={(e) => handleChange(index, 'endYear', e.target.value)}
                placeholder="2024 / Present"
                id={`edu-end-${index}`}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Grade / CGPA</label>
              <input
                type="text"
                className="form-input"
                value={edu.grade}
                onChange={(e) => handleChange(index, 'grade', e.target.value)}
                placeholder="8.5 CGPA"
                id={`edu-grade-${index}`}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-input"
                value={edu.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                placeholder="New Delhi"
                id={`edu-location-${index}`}
              />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="btn btn-secondary btn-sm w-full-btn" id="add-education-btn">
        <Plus size={16} /> Education Add Karo
      </button>
    </div>
  );
};

export default EducationSection;
