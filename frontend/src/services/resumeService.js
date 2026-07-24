import api from './api';

export const getResumes = async () => {
  const response = await api.get('/resumes');
  return response.data;
};

export const getResumeById = async (id) => {
  const response = await api.get(`/resumes/${id}`);
  return response.data;
};

export const createResume = async (resumeData) => {
  const response = await api.post('/resumes', resumeData);
  return response.data;
};

export const updateResume = async (id, resumeData) => {
  const response = await api.put(`/resumes/${id}`, resumeData);
  return response.data;
};

export const duplicateResume = async (id) => {
  const response = await api.post(`/resumes/${id}/duplicate`);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await api.delete(`/resumes/${id}`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/resumes/dashboard/stats');
  return response.data;
};
