// ============================================================
// ModernTemplate.jsx - Ek stylish modern resume template
// Left sidebar + Right content layout
// ============================================================

import './Templates.css';

const ModernTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary, education = [], skills = [],
    projects = [], experience = [], certifications = [], achievements = [] } = resumeData;

  return (
    <div className="modern-template">
      {/* LEFT SIDEBAR */}
      <div className="modern-sidebar">
        {/* Name & Title */}
        <div className="modern-name-section">
          <div className="modern-avatar">
            {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'R'}
          </div>
          <h1 className="modern-name">{personalInfo.fullName || 'Aapka Naam'}</h1>
          {summary && (
            <p className="modern-tagline">
              {/* Summary ke pehle 8 words se tagline banao */}
              {summary.split(' ').slice(0, 8).join(' ')}...
            </p>
          )}
        </div>

        {/* Contact Info */}
        <div className="modern-section">
          <h2 className="modern-section-title">Contact</h2>
          {personalInfo.email && <p className="modern-contact-item">✉ {personalInfo.email}</p>}
          {personalInfo.phone && <p className="modern-contact-item">📱 {personalInfo.phone}</p>}
          {personalInfo.location && <p className="modern-contact-item">📍 {personalInfo.location}</p>}
          {personalInfo.linkedin && <p className="modern-contact-item">🔗 LinkedIn</p>}
          {personalInfo.github && <p className="modern-contact-item">💻 GitHub</p>}
          {personalInfo.portfolio && <p className="modern-contact-item">🌐 Portfolio</p>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="modern-section">
            <h2 className="modern-section-title">Skills</h2>
            {skills.map((skill, i) => (
              <div key={i} className="modern-skill-group">
                {skill.category && <p className="modern-skill-category">{skill.category}</p>}
                <p className="modern-skill-items">{skill.items}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="modern-section">
            <h2 className="modern-section-title">Certifications</h2>
            {certifications.map((cert, i) => (
              <div key={i} className="modern-cert">
                <p className="modern-cert-name">{cert.name}</p>
                <p className="modern-cert-issuer">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="modern-main">
        {/* Summary */}
        {summary && (
          <div className="modern-content-section">
            <h2 className="modern-content-title">Professional Summary</h2>
            <p className="modern-summary-text">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="modern-content-section">
            <h2 className="modern-content-title">Work Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="modern-entry">
                <div className="modern-entry-header">
                  <div>
                    <h3 className="modern-entry-title">{exp.jobTitle}</h3>
                    <p className="modern-entry-subtitle">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  </div>
                  <span className="modern-entry-date">{exp.startDate} – {exp.endDate}</span>
                </div>
                {exp.description && <p className="modern-entry-desc">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="modern-content-section">
            <h2 className="modern-content-title">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="modern-entry">
                <div className="modern-entry-header">
                  <div>
                    <h3 className="modern-entry-title">{edu.degree}</h3>
                    <p className="modern-entry-subtitle">{edu.school} {edu.location && `• ${edu.location}`}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="modern-entry-date">{edu.startYear} – {edu.endYear}</span>
                    {edu.grade && <p className="modern-grade">{edu.grade}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="modern-content-section">
            <h2 className="modern-content-title">Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="modern-entry">
                <div className="modern-entry-header">
                  <h3 className="modern-entry-title">{proj.name}</h3>
                  {proj.techStack && (
                    <span className="modern-tech-badge">{proj.techStack}</span>
                  )}
                </div>
                {proj.description && <p className="modern-entry-desc">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="modern-content-section">
            <h2 className="modern-content-title">Achievements</h2>
            {achievements.map((ach, i) => (
              <div key={i} className="modern-achievement">
                <span className="modern-achievement-bullet">⭐</span>
                <div>
                  <p className="modern-achievement-title">{ach.title}</p>
                  {ach.description && <p className="modern-achievement-desc">{ach.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
