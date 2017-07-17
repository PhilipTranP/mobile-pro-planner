const express = require('express');
const passport = require('passport');
const Customer = require('../../models/Customer');

const router = express.Router();


router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
  return Customer.getAll()
    .then(customers => res.json(customers));
});

router.put(
  '/new',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const name = req.body.name;
    if(!name) {
      return res.json({
        success: false,
        msg: 'Name is required'
      });
    }
    if(!checkPermissions(req.user, 2)) {
      return lowPermissions();
    }
    const customer = new Customer({name: name})
    customer.save();
    return res.json({
      success: true,
      customer: customer
    });
  }
);

router.use(require('./phone'));
router.use(require('./address'));
router.use(require('./comment'));

module.exports = router;
