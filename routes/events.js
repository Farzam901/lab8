const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes are protected using authentication middleware
router.post('/', authMiddleware.isAuthenticated, eventsController.createEvent);
router.get('/', authMiddleware.isAuthenticated, eventsController.getEvents);

module.exports = router;
