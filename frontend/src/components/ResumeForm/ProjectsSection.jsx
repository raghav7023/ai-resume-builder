// ProjectsSection.jsx - Projects Form with AI Description Generator
import { useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { generateProjectDescription } from '../../services/aiService';
import toast from 'react-hot-toast';

const emptyProject = { name: '', description: '', techStack: '', link: '', github: '' };

const ProjectsSection = ({ data, onChange }) => {
  // Loading state har project ke liye alag
  const [loadingIndex, setLoadingIndex] = useState(null);

  const addEntry = () => onChange([...data, { ...emptyProject }]);
  const removeEntry = (i) => onChange(data.filter((_, idx) => idx !== i));
  const handleChange = (i, field, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  // Is project ke liye AI description generate karo
  const handleGenerateDesc = async (index) => {
    const project = data[index];
    if (!project.name) {
      toast.error('Pehle project ka naam likho!');
      return;
    }

    setLoadingIndex(index);
    try {
      const result = await generateProjectDescription({
        projectName: project.name,
        techStack: project.techStack,
        projectType: 'Web Application',
      });

      handleChange(index, 'description', result.description);
      toast.success('AI ne description likh di! ✨');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Description generate nahi hua');
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div>
      {data.map((project, index) => (
        <div key={index} className="entry-card">
          <div className="entry-header">
            <span className="entry-number">Project #{index + 1}</span>
            <button onClick={() => removeEntry(index)} className="btn btn-danger btn-sm" id={`remove-project-${index}`}>
              <Trash2 size={13} />
            </button>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Project ka Naam *</label>
              <input
                type="text"
                className="form-input"
                value={project.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                placeholder="AI Resume Builder"
                id={`project-name-${index}`}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tech Stack</label>
              <input
                type="text"
                className="form-input"
                value={project.techStack}
                onChange={(e) => handleChange(index, 'techStack', e.target.value)}
                placeholder="React, Node.js, MongoDB"
                id={`project-tech-${index}`}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Live Link</label>
              <input
                type="url"
                className="form-input"
                value={project.link}
                onChange={(e) => handleChange(index, 'link', e.target.value)}
                placeholder="https://myproject.com"
                id={`project-link-${index}`}
              />
            </div>

            <div className="form-group">
              <label className="form-label">GitHub Link</label>
              <input
                type="url"
                className="form-input"
                value={project.github}
                onChange={(e) => handleChange(index, 'github', e.target.value)}
                placeholder="github.com/user/project"
                id={`project-github-${index}`}
              />
            </div>
          </div>

          {/* Description with AI button */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Project Description</label>
              <button
                className="ai-btn"
                onClick={() => handleGenerateDesc(index)}
                disabled={loadingIndex === index}
                id={`generate-project-desc-${index}`}
              >
                {loadingIndex === index ? <span className="spinner"></span> : <Sparkles size={13} />}
                AI se Likho
              </button>
            </div>
            <textarea
              className="form-textarea"
              value={project.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Project ki description yahan likho ya AI se generate karwao..."
              rows={3}
              id={`project-desc-${index}`}
            />
          </div>
        </div>
      ))}

      <button onClick={addEntry} className="btn btn-secondary btn-sm w-full-btn" id="add-project-btn">
        <Plus size={16} /> Project Add Karo
      </button>
    </div>
  );
};

export default ProjectsSection;
