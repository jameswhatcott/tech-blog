const router = require('express').Router();
const userRoutes = require('./user-routes');
const homeRoutes = require('../home-routes');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('../api');

// Apply the routes
router.use('/users', userRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
