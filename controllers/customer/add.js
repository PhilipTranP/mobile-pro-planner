const express = require('express');
const { Customer } = require('../../models');

const router = express.Router();

router.put('/new', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { name } = req.body;
  if(!name) {
    return res.json({
      success: false,
      msg: 'Name is required'
    });
  }
  const customer = new Customer({name: name})
  customer.save();
  return res.json({
    success: true,
    customer: customer
  });
});

module.exports = router;
