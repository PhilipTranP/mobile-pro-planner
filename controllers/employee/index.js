const express = require('express');
const passport = require('passport');
const { Employee } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.user);
  console.log(checkPermissions(req.user, 2));
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  return Employee.getAll()
    .then(employees => res.json(employees));
});

router.use(require('./address'));
router.use(require('./add'));
router.use(require('./invite'));

module.exports = router;
