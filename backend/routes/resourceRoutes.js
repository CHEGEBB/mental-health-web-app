// routes/resourceRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getResources,
  getResourceById,
  getResourcesByType
} = require('../controllers/resourceController');

router.get('/', getResources);
router.get('/:id', getResourceById);
router.get('/type/:type', getResourcesByType);

module.exports = router;