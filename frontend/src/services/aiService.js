// AI Feature API calls - Gemini ke saath baat karne ke liye
import api from './api';

// Professional summary generate karo
export const generateSummary = async (data) => {
  const response = await api.post('/ai/generate-summary', data);
  return response.data;
};

// Existing summary improve karo
export const improveSummary = async (data) => {
  const response = await api.post('/ai/improve-summary', data);
  return response.data;
};

// Project description generate karo
export const generateProjectDescription = async (data) => {
  const response = await api.post('/ai/project-description', data);
  return response.data;
};

// Skills suggest karo
export const suggestSkills = async (data) => {
  const response = await api.post('/ai/skills-suggestion', data);
  return response.data;
};

// ATS keywords suggest karo
export const suggestAtsKeywords = async (data) => {
  const response = await api.post('/ai/ats-keywords', data);
  return response.data;
};
