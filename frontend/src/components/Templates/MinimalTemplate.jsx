// MinimalTemplate.jsx - Clean, minimal resume template
import './Templates.css';

const MinimalTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary, education = [], skills = [],
    projects = [], experience = [], certifications = [], achievements = [] } = resumeData;

  return (
    <div className="minimal-template">
      {/* HEADER */}
      <div className="minimal-header">
        <h1 className="minimal-name">{personalInfo.fullName || 'Aapka Naam'}</h1>
        <div className="minimal-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location,
            personalInfo.linkedin && 'LinkedIn', personalInfo.github && 'GitHub']
            .filter(Boolean)
            .join('  |  ')}
        </div>
      </div>

      <div className="minimal-divider"></div>

      {/* Summary */}
      {summary && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">SUMMARY</h2>
          <p className="minimal-text">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">EXPERIENCE</h2>
          {experience.map((exp, i) => (
            <div key={i} className="minimal-entry">
              <div className="minimal-entry-row">
                <span className="minimal-entry-title">{exp.jobTitle} — {exp.company}</span>
                <span className="minimal-entry-date">{exp.startDate} – {exp.endDate}</span>
              </div>
              {exp.description && <p className="minimal-text">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">EDUCATION</h2>
          {education.map((edu, i) => (
            <div key={i} className="minimal-entry">
              <div className="minimal-entry-row">
                <span className="minimal-entry-title">{edu.degree} — {edu.school}</span>
                <span className="minimal-entry-date">{edu.startYear} – {edu.endYear} {edu.grade && `| ${edu.grade}`}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">SKILLS</h2>
          {skills.map((skill, i) => (
            <p key={i} className="minimal-text">
              {skill.category && <strong>{skill.category}: </strong>}
              {skill.items}
            </p>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">PROJECTS</h2>
          {projects.map((proj, i) => (
            <div key={i} className="minimal-entry">
              <div className="minimal-entry-row">
                <span className="minimal-entry-title">{proj.name}</span>
                {proj.techStack && <span className="minimal-entry-date">{proj.techStack}</span>}
              </div>
              {proj.description && <p className="minimal-text">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">CERTIFICATIONS</h2>
          {certifications.map((cert, i) => (
            <p key={i} className="minimal-text">
              • {cert.name} — {cert.issuer} {cert.date && `(${cert.date})`}
            </p>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="minimal-section">
          <h2 className="minimal-section-title">ACHIEVEMENTS</h2>
          {achievements.map((ach, i) => (
            <p key={i} className="minimal-text">• {ach.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
