const express = require('express');

const router = express.Router();

router.use('/user', require('./user'));
router.use('/customer', require('./customer'));
router.use('/employee', require('./employee'));

module.exports = router;
