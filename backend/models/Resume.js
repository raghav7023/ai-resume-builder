// Ye file Resume ka database model define karti hai
// Ek user ke multiple resumes ho sakte hain

const mongoose = require('mongoose');

// Resume Schema - resume ka poora structure
const resumeSchema = new mongoose.Schema(
  {
    // Konse user ka resume hai - User model se reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Resume ka naam (jaise "Software Engineer Resume")
    title: {
      type: String,
      default: 'My Resume',
    },

    // Personal Information section
    personalInfo: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      portfolio: { type: String, default: '' },
      location: { type: String, default: '' },
    },

    summary: {
      type: String,
      default: '',
    },

    languages: [
      {
        name: { type: String, default: '' },
        proficiency: { type: String, default: '' },
      },
    ],

    interests: [
      {
        name: { type: String, default: '' },
      },
    ],

    socialLinks: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      portfolio: { type: String, default: '' },
    },

    customSections: [
      {
        title: { type: String, default: '' },
        content: { type: String, default: '' },
      },
    ],

    education: [
      {
        degree: { type: String, default: '' },
        school: { type: String, default: '' },
        location: { type: String, default: '' },
        startYear: { type: String, default: '' },
        endYear: { type: String, default: '' },
        grade: { type: String, default: '' },
      },
    ],

    // Skills section
    skills: [
      {
        category: { type: String, default: '' }, // jaise "Programming Languages"
        items: { type: String, default: '' },    // jaise "JavaScript, Python, Java"
      },
    ],

    // Projects section
    projects: [
      {
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        techStack: { type: String, default: '' },
        link: { type: String, default: '' },
        github: { type: String, default: '' },
      },
    ],

    // Work Experience section
    experience: [
      {
        jobTitle: { type: String, default: '' },
        company: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],

    // Certifications section
    certifications: [
      {
        name: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
        link: { type: String, default: '' },
      },
    ],

    // Achievements section
    achievements: [
      {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],

    // Kaunsa template use ho raha hai
    template: {
      type: String,
      enum: ['modern', 'professional', 'minimal'],
      default: 'modern',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto add hoga
  }
);

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
