const express = require('express');

// route configurations
const router = express.Router();

// ----auth routes----
// Define at least one route
router.get('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

// Uncomment this line
module.exports = router;