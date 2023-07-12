const express = require('express');
const { signin } = require('./authController');
const { authenticateToken, checkPermissions } = require('./authMiddleware');

const router = express.Router();

// Public route (no authentication required)
router.post('/signin', signin);

// Protected route (requires authentication and admin role)
router.get('/admin', authenticateToken, checkPermissions('admin'), (req, res) => {
  // Admin-only logic
});

module.exports = router;
