const express = require('express');
const passport = require('passport');
const { Employee } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

router.put('/:employeeId/address', (req, res) => {
  const { address } = req.body;
  const { user } = req;
  const { employeeId } = req.params;
  if(!(address.street && address.city && address.state && address.zip))
    return res.json({
    msg: 'All fields required'
  });
  if(!checkPermissions(user, 2) && user.employee._id !== employeeId)
    return lowPermissions();
  Employee.addAddress(employeeId, address)
    .then(employee => res.json(employee));
});

module.exports = router;
