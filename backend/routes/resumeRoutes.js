// Resume CRUD routes
// Ye saare routes protected hain - pehle login karna hoga

const express = require('express');
const router = express.Router();
const {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  duplicateResume,
  deleteResume,
  getDashboardStats,
} = require('../controllers/resumeController');

const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard/stats', protect, getDashboardStats);
router.get('/', protect, getResumes);
router.get('/:id', protect, getResumeById);
router.post('/', protect, createResume);
router.put('/:id', protect, updateResume);
router.post('/:id/duplicate', protect, duplicateResume);
router.delete('/:id', protect, deleteResume);

module.exports = router;
