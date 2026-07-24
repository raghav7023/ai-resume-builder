// CertificationsSection.jsx
import { Plus, Trash2 } from 'lucide-react';

const emptyCert = { name: '', issuer: '', date: '', link: '' };

const CertificationsSection = ({ data, onChange }) => {
  const addEntry = () => onChange([...data, { ...emptyCert }]);
  const removeEntry = (i) => onChange(data.filter((_, idx) => idx !== i));
  const handleChange = (i, field, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      {data.map((cert, index) => (
        <div key={index} className="entry-card">
          <div className="entry-header">
            <span className="entry-number">Certification #{index + 1}</span>
            <button onClick={() => removeEntry(index)} className="btn btn-danger btn-sm" id={`remove-cert-${index}`}>
              <Trash2 size={13} />
            </button>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Certification ka Naam</label>
              <input type="text" className="form-input" value={cert.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                placeholder="AWS Certified Developer" id={`cert-name-${index}`} />
            </div>

            <div className="form-group">
              <label className="form-label">Issuing Organization</label>
              <input type="text" className="form-input" value={cert.issuer}
                onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                placeholder="Amazon Web Services" id={`cert-issuer-${index}`} />
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="text" className="form-input" value={cert.date}
                onChange={(e) => handleChange(index, 'date', e.target.value)}
                placeholder="March 2024" id={`cert-date-${index}`} />
            </div>

            <div className="form-group">
              <label className="form-label">Certificate Link</label>
              <input type="url" className="form-input" value={cert.link}
                onChange={(e) => handleChange(index, 'link', e.target.value)}
                placeholder="https://credential.com/..." id={`cert-link-${index}`} />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="btn btn-secondary btn-sm w-full-btn" id="add-cert-btn">
        <Plus size={16} /> Certification Add Karo
      </button>
    </div>
  );
};

export default CertificationsSection;
