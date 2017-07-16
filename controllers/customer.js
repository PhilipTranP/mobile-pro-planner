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

router.put(
  ':cx/phone/:phone',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if(!checkPermissions(req.user, 1)) return lowPermissions();
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

// Address add/edit/delete
router.put(
  '/:cx/address',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if(!checkPermissions(req.user, 2)) return lowPermissions();
    const { address } = req.body; // Destructure form
    if(!(address.street && address.city && address.state)) return res.json({
      success: false,
      msg: 'All fields except Zip are required'
    });
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
);

router.put(
  '/:cx/address/:address',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if(!checkPermissions(req.user, 1)) return lowPermissions();
    const { address } = req.body;
    if(!(address.street && address.city && address.state)) return res.json({
      success: false,
      msg: 'All fields except Zip are required'
    });
    Customer.editAddress(req.params.cx, req.params.address, address)
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

// Add/delete comments
router.put(
  '/:cx/comment',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { comment } = req.body;
    if(!comment) return res.json({
      success: false,
      msg: 'Comments are made out of words. Use some.'
    });
    const newComment = {
      body: comment,
      employee: req.user
    };
    Customer.addComment(req.params.cx, newComment)
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

module.exports = router;
