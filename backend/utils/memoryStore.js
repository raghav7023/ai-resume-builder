const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const users = new Map();
const resumes = new Map();

const clone = (value) => JSON.parse(JSON.stringify(value));

const createMemoryUser = async ({ name, email, password, role = 'user', ...profile }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID();
  const user = {
    _id: id,
    name,
    email,
    password: passwordHash,
    role,
    avatar: '',
    headline: '',
    location: '',
    bio: '',
    portfolio: '',
    github: '',
    linkedin: '',
    ...profile,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.set(id, user);
  return clone(user);
};

const findMemoryUserByEmail = async (email) => {
  for (const user of users.values()) {
    if (user.email?.toLowerCase() === String(email).toLowerCase()) {
      return clone(user);
    }
  }
  return null;
};

const findMemoryUserById = async (id) => {
  const user = users.get(id);
  return user ? clone(user) : null;
};

const updateMemoryUser = async (id, updates) => {
  const existing = users.get(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  users.set(id, updated);
  return clone(updated);
};

const createMemoryResume = async (payload) => {
  const id = crypto.randomUUID();
  const resume = {
    _id: id,
    user: payload.user,
    title: payload.title || 'My Resume',
    template: payload.template || 'modern',
    personalInfo: payload.personalInfo || {},
    summary: payload.summary || '',
    education: payload.education || [],
    skills: payload.skills || [],
    projects: payload.projects || [],
    experience: payload.experience || [],
    certifications: payload.certifications || [],
    achievements: payload.achievements || [],
    languages: payload.languages || [],
    interests: payload.interests || [],
    socialLinks: payload.socialLinks || {},
    customSections: payload.customSections || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  resumes.set(id, resume);
  return clone(resume);
};

const listMemoryResumes = async (userId) => {
  return Array.from(resumes.values())
    .filter((resume) => resume.user === userId)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .map((resume) => clone(resume));
};

const findMemoryResumeById = async (id) => {
  const resume = resumes.get(id);
  return resume ? clone(resume) : null;
};

const updateMemoryResume = async (id, updates) => {
  const existing = resumes.get(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  resumes.set(id, updated);
  return clone(updated);
};

const deleteMemoryResume = async (id) => {
  return resumes.delete(id);
};

module.exports = {
  users,
  resumes,
  createMemoryUser,
  findMemoryUserByEmail,
  findMemoryUserById,
  updateMemoryUser,
  createMemoryResume,
  listMemoryResumes,
  findMemoryResumeById,
  updateMemoryResume,
  deleteMemoryResume,
};
