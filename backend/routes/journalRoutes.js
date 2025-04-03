// routes/journalRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry
} = require('../controllers/journalController');
const { protect } = require('../middlewares/auth');

router.post('/entry', protect, createEntry);
router.get('/entries', protect, getEntries);
router.get('/entry/:id', protect, getEntry);
router.put('/entry/:id', protect, updateEntry);
router.delete('/entry/:id', protect, deleteEntry);

module.exports = router;