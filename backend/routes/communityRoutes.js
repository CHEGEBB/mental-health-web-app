// routes/communityRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getForums,
  getForumThreads,
  getThread,
  createThread,
  addComment
} = require('../controllers/communityController');
const { protect } = require('../middlewares/auth');

router.get('/forums', getForums);
router.get('/forums/:category', getForumThreads);
router.get('/thread/:id', getThread);
router.post('/thread', protect, createThread);
router.post('/comment', protect, addComment);

module.exports = router;