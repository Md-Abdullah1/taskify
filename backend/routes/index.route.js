const express = require('express');
const UserRoutes = require('./user.route');
const AuthRoutes = require('./auth.route')
// route configurations
const router = express.Router();

// ----auth routes----
// Define at least one route
router.use('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});


router.use('/auth',AuthRoutes);
router.use('/user',UserRoutes);

// Uncomment this line
module.exports = router;