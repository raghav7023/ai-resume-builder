// ProfessionalTemplate.jsx - Classic top-header resume template
import './Templates.css';

const ProfessionalTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary, education = [], skills = [],
    projects = [], experience = [], certifications = [], achievements = [] } = resumeData;

  return (
    <div className="prof-template">
      {/* HEADER */}
      <div className="prof-header">
        <div>
          <h1 className="prof-name">{personalInfo.fullName || 'Aapka Naam'}</h1>
          <div className="prof-contact-row">
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          </div>
          <div className="prof-contact-row">
            {personalInfo.linkedin && <span>🔗 LinkedIn</span>}
            {personalInfo.github && <span>💻 GitHub</span>}
            {personalInfo.portfolio && <span>🌐 {personalInfo.portfolio}</span>}
          </div>
        </div>
      </div>

      <div className="prof-body">
        {/* Summary */}
        {summary && (
          <div className="prof-section">
            <h2 className="prof-section-title">Professional Summary</h2>
            <p className="prof-text">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="prof-section">
            <h2 className="prof-section-title">Work Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="prof-entry">
                <div className="prof-entry-top">
                  <div>
                    <strong className="prof-entry-title">{exp.jobTitle}</strong>
                    <span className="prof-entry-company"> @ {exp.company}</span>
                  </div>
                  <span className="prof-entry-date">{exp.startDate} – {exp.endDate}</span>
                </div>
                {exp.description && <p className="prof-text" style={{ marginTop: '4px' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="prof-section">
            <h2 className="prof-section-title">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="prof-entry">
                <div className="prof-entry-top">
                  <div>
                    <strong className="prof-entry-title">{edu.degree}</strong>
                    <span className="prof-entry-company"> — {edu.school}</span>
                  </div>
                  <span className="prof-entry-date">{edu.startYear} – {edu.endYear} {edu.grade && `| ${edu.grade}`}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="prof-section">
            <h2 className="prof-section-title">Technical Skills</h2>
            {skills.map((skill, i) => (
              <div key={i} className="prof-skill-row">
                {skill.category && <strong className="prof-skill-category">{skill.category}: </strong>}
                <span className="prof-text">{skill.items}</span>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="prof-section">
            <h2 className="prof-section-title">Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="prof-entry">
                <div className="prof-entry-top">
                  <strong className="prof-entry-title">{proj.name}</strong>
                  {proj.techStack && <span className="prof-entry-date">{proj.techStack}</span>}
                </div>
                {proj.description && <p className="prof-text" style={{ marginTop: '4px' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications & Achievements side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {certifications.length > 0 && (
            <div className="prof-section">
              <h2 className="prof-section-title">Certifications</h2>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <strong className="prof-entry-title">{cert.name}</strong>
                  <p className="prof-text">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                </div>
              ))}
            </div>
          )}

          {achievements.length > 0 && (
            <div className="prof-section">
              <h2 className="prof-section-title">Achievements</h2>
              {achievements.map((ach, i) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <p className="prof-text">⭐ {ach.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
