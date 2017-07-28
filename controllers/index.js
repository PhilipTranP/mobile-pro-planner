const express = require('express');
const passport = require('passport');

const router = express.Router();

// Import sub-routers
router.use('/user', require('./user'));
// Require jwt authentication on all routes besides login/register
router.use(passport.authenticate('jwt', {session:false}));
router.use('/schedule', require('./schedule'));
router.use('/hotel/stay', require('./hotel-stay'));
router.use('/invoice', require('./invoice'));
router.use('/customer', require('./customer'));
router.use('/appointment', require('./appointment'));
router.use('/employee', require('./employee'));
router.use('/hotel', require('./hotel'));

module.exports = router;
