const express = require('express');
const passport = require('passport');
const Customer = require('../../models/Customer');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

// Phone number add/edit/delete
router.put(
  '/:cx/phone',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let phone = req.body.phone.number;
    let type = req.body.phone.type;
    if(!phone) {
      return res.json({
        success: false,
        msg: 'A phone number is required'
      });
    }
    if(!checkPermissions(req.user, 1)) return lowPermissions(res);
    const number = {
      phoneType: type || 'Unknown',
      phonenumber: phone
    }
    return Customer.addPhone(req.params.cx, number)
      .then(customer =>
        res.json({
          success: true,
          customer: customer
        })
      )
      .catch(e =>
        res.status(404).send('Not Found')
      );
  }
)

router.delete(
  '/:cx/phone/:phone',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if(!checkPermissions(req.user, 2)) return lowPermissions(res);
    Customer.deletePhone(req.params.cx, req.params.phone)
      .then(customer =>
        res.json({
          success: true,
          customer: customer
        })
      )
      .catch(e =>
        res.status(404).send('Not Found')
      );
  }
);

router.put(
  ':cx/phone/:phone',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if(!checkPermissions(req.user, 1)) return lowPermissions(res);
    const { phone } = req.body;
    if(!phone.number) return res.json({
      success: false,
      msg: 'A phone number is required'
    });
    return Customer.editPhone(req.params.cx, req.params.phone, phone)
      .then(customer => res.json({
        success: true,
        customer: customer
      }))
      .catch(e =>
        res.status(404).send('Not Found')
      );
  }
);

module.exports = router;
