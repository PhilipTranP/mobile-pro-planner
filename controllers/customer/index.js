const express = require('express');
const passport = require('passport');
const Customer = require('../../models/Customer');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();


router.get('/', (req, res) => {
  if(!checkPermissions(req.user, 1)) return lowPermissions(res);
  return Customer.getAll()
    .then(customers => res.json(customers));
});

router.use(require('./add'));
router.use(require('./phone'));
router.use(require('./address'));
router.use(require('./comment'));

module.exports = router;
