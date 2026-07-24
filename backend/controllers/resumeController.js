// Ye file resume ka CRUD logic handle karti hai
// CRUD = Create (banao), Read (dekho), Update (badlo), Delete (hatao)

const mongoose = require('mongoose');
const Resume = require('../models/Resume');
const {
  createMemoryResume,
  listMemoryResumes,
  findMemoryResumeById,
  updateMemoryResume,
  deleteMemoryResume,
} = require('../utils/memoryStore');

const shouldUseMemoryMode = () => process.env.USE_MEMORY_DB === 'true' || mongoose.connection.readyState !== 1;

const getResumes = async (req, res) => {
  try {
    if (shouldUseMemoryMode()) {
      const resumes = await listMemoryResumes(req.user._id);
      return res.json(resumes);
    }

    const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1, createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Resumes laane mein dikkat aayi', error: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 }).lean();

    const totalResumes = resumes.length;
    const completedResumes = resumes.filter((resume) => {
      const personalComplete = Boolean(resume.personalInfo?.fullName && resume.personalInfo?.email);
      return personalComplete && (resume.summary || resume.skills?.length > 0 || resume.experience?.length > 0);
    }).length;

    const recentResumes = resumes.slice(0, 3).map((resume) => ({
      _id: resume._id,
      title: resume.title,
      template: resume.template,
      updatedAt: resume.updatedAt,
      personalInfo: resume.personalInfo,
    }));

    res.json({
      totalResumes,
      completedResumes,
      recentResumes,
      templateBreakdown: resumes.reduce((acc, resume) => {
        acc[resume.template || 'modern'] = (acc[resume.template || 'modern'] || 0) + 1;
        return acc;
      }, {}),
    });
  } catch (error) {
    res.status(500).json({ message: 'Dashboard stats load nahi hui', error: error.message });
  }
};

// ========== GET SINGLE RESUME ==========
// GET /api/resumes/:id
const getResumeById = async (req, res) => {
  try {
    if (shouldUseMemoryMode()) {
      const resume = await findMemoryResumeById(req.params.id);
      if (!resume) return res.status(404).json({ message: 'Resume nahi mila' });
      if (resume.user !== req.user._id) return res.status(403).json({ message: 'Ye resume tumhara nahi hai' });
      return res.json(resume);
    }

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume nahi mila' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Ye resume tumhara nahi hai' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Resume laane mein dikkat aayi', error: error.message });
  }
};

// ========== CREATE RESUME ==========
// POST /api/resumes
const createResume = async (req, res) => {
  try {
    if (shouldUseMemoryMode()) {
      const resume = await createMemoryResume({
        user: req.user._id,
        title: req.body.title || 'My Resume',
        ...req.body,
      });
      return res.status(201).json(resume);
    }

    const resume = await Resume.create({
      user: req.user._id,
      title: req.body.title || 'My Resume',
      ...req.body,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Resume banane mein dikkat aayi', error: error.message });
  }
};

// ========== UPDATE RESUME ==========
// PUT /api/resumes/:id
const updateResume = async (req, res) => {
  try {
    if (shouldUseMemoryMode()) {
      const resume = await findMemoryResumeById(req.params.id);
      if (!resume) return res.status(404).json({ message: 'Resume nahi mila' });
      if (resume.user !== req.user._id) return res.status(403).json({ message: 'Ye resume tumhara nahi hai' });

      const updatedResume = await updateMemoryResume(req.params.id, req.body);
      return res.json(updatedResume);
    }

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume nahi mila' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Ye resume tumhara nahi hai' });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: 'Resume update karne mein dikkat aayi', error: error.message });
  }
};

const duplicateResume = async (req, res) => {
  try {
    if (shouldUseMemoryMode()) {
      const resume = await findMemoryResumeById(req.params.id);
      if (!resume) return res.status(404).json({ message: 'Resume nahi mila' });
      if (resume.user !== req.user._id) return res.status(403).json({ message: 'Ye resume tumhara nahi hai' });

      const duplicateData = { ...resume, title: `${resume.title || 'My Resume'} Copy` };
      delete duplicateData._id;
      delete duplicateData.createdAt;
      delete duplicateData.updatedAt;

      const duplicatedResume = await createMemoryResume({
        ...duplicateData,
        user: req.user._id,
      });
      return res.status(201).json(duplicatedResume);
    }

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume nahi mila' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Ye resume tumhara nahi hai' });
    }

    const duplicateData = resume.toObject();
    delete duplicateData._id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;
    delete duplicateData.__v;

    const duplicatedResume = await Resume.create({
      ...duplicateData,
      user: req.user._id,
      title: `${resume.title || 'My Resume'} Copy`,
    });

    res.status(201).json(duplicatedResume);
  } catch (error) {
    res.status(500).json({ message: 'Resume duplicate nahi ho saka', error: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    if (shouldUseMemoryMode()) {
      const resume = await findMemoryResumeById(req.params.id);
      if (!resume) return res.status(404).json({ message: 'Resume nahi mila' });
      if (resume.user !== req.user._id) return res.status(403).json({ message: 'Ye resume tumhara nahi hai' });
      await deleteMemoryResume(req.params.id);
      return res.json({ message: 'Resume delete ho gaya ✅' });
    }

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume nahi mila' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Ye resume tumhara nahi hai' });
    }

    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume delete ho gaya ✅' });
  } catch (error) {
    res.status(500).json({ message: 'Resume delete karne mein dikkat aayi', error: error.message });
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  duplicateResume,
  deleteResume,
  getDashboardStats,
};
