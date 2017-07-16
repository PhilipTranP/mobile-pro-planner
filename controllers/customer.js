const express = require('express');
const passport = require('passport');
const Customer = require('../models/Customer');


const router = express.Router();

const checkPermissions = (user, reqd) => user.permissions >= reqd;
const lowPermissions = () => res.json({
  success: false,
  msg: 'You do not have permission to do this'
});

router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
  return Customer.getAll()
    .then(customers => res.json(customers));
});

router.post(
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

// Phone number add and delete
router.post(
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
    if(!checkPermissions(req.user, 1)) return lowPermissions();
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
    if(!checkPermissions(req.user, 2)) return lowPermissions();
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

// Address add and delete
router.post(
  '/:cx/address',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if(!checkPermissions(req.user, 2)) return lowPermissions();
    const { street, city, state, zip } = req.body; // Destructure form
    if(!(street && city && state)) return res.json({
      success: false,
      msg: 'All fields except Zip are required'
    });
    const address = {
      street: street,
      city: city,
      state: state,
      zip: zip
    }
    Customer.addAddress(req.params.cx, address)
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

router.delete(
  '/:cx/address/:address',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if(!checkPermissions(req.user, 2)) return lowPermissions();
    Customer.deleteAddress(req.params.cx, req.params.address)
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

module.exports = router;
