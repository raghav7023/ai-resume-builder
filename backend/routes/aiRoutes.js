// AI Feature Routes
// Ye routes AI se connected hain - login hona zaroori hai

const express = require('express');
const router = express.Router();
const {
  generateSummary,
  improveSummary,
  generateProjectDescription,
  suggestSkills,
  suggestAtsKeywords,
} = require('../controllers/aiController');

const { protect } = require('../middleware/authMiddleware');

// POST /api/ai/generate-summary - professional summary banao
router.post('/generate-summary', protect, generateSummary);

// POST /api/ai/improve-summary - existing summary ko better banao
router.post('/improve-summary', protect, improveSummary);

// POST /api/ai/project-description - project description generate karo
router.post('/project-description', protect, generateProjectDescription);

// POST /api/ai/skills-suggestion - skills suggest karo
router.post('/skills-suggestion', protect, suggestSkills);

// POST /api/ai/ats-keywords - ATS keywords suggest karo
router.post('/ats-keywords', protect, suggestAtsKeywords);

module.exports = router;
