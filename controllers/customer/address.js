const express = require('express');
const passport = require('passport');
const Customer = require('../../models/Customer');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

// Address add/edit/delete
router.put('/:cx/address', (req, res) => {
  // Check user permissions
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { address } = req.body;
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
});

// Delete address
router.delete('/:cx/address/:address', (req, res) => {
  // Check user permissions
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
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
});

router.put('/:cx/address/:address', (req, res) => {
  // Check user permissions
  if(!checkPermissions(req.user, 1)) return lowPermissions(res);
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
});

module.exports = router;
