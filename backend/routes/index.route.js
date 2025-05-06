const express = require('express');
const UserRoutes = require('./user.route');
const TaskRoutes = require('./tasks.route')
// route configurations
const router = express.Router();

// ----auth routes----
// Define at least one route
router.use('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});


router.use('/tasks',TaskRoutes);
router.use('/user',UserRoutes);

// Uncomment this line
module.exports = router;