// PersonalInfo.jsx - Personal Details Form Section

const PersonalInfo = ({ data, onChange }) => {
  // Koi bhi field change hone pe parent ko notify karo
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Poora Naam *</label>
          <input
            type="text"
            className="form-input"
            value={data?.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Rahul Kumar"
            id="pi-fullname"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-input"
            value={data?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="rahul@email.com"
            id="pi-email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-input"
            value={data?.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+91 9876543210"
            id="pi-phone"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-input"
            value={data?.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Delhi, India"
            id="pi-location"
          />
        </div>

        <div className="form-group">
          <label className="form-label">LinkedIn URL</label>
          <input
            type="url"
            className="form-input"
            value={data?.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/rahul"
            id="pi-linkedin"
          />
        </div>

        <div className="form-group">
          <label className="form-label">GitHub URL</label>
          <input
            type="url"
            className="form-input"
            value={data?.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="github.com/rahul"
            id="pi-github"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Portfolio Website</label>
        <input
          type="url"
          className="form-input"
          value={data?.portfolio || ''}
          onChange={(e) => handleChange('portfolio', e.target.value)}
          placeholder="rahulkumar.dev"
          id="pi-portfolio"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
