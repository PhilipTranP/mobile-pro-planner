const express = require('express');
const passport = require('passport');

const router = express.Router();

router.use('/user', require('./user'));
router.use(passport.authenticate('jwt', {session:false}));
router.use('/customer', require('./customer'));
router.use('/employee', require('./employee'));

module.exports = router;
