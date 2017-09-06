const express = require('express');
const { Customer } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

router.put('/new', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { name } = req.body;
  console.log(req.body);
  if(!name)
    return res.status(400).send()
  const customer = new Customer({name: name})
  customer.save();
  return res.json(customer);
});

module.exports = router;
