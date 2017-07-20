const express = require('express');
const { checkPermissions, lowPermissions } = require('../access-control');
const { Employee } = require('../../models');

const router = express.Router();

// Add employee phone
router.put('/:employeeId/phone', (req, res) => {
  const { user } = req;
  const { phone } = req.body;
  const { employeeId } = req.params;
  if(!checkPermissions(user, 2) && user.employee._id !== employeeId)
    return lowPermissions(res)
  if(!phone) return res.json({msg: 'Phonenumber is required'});
  Employee.addPhonenumber(employeeId, phone)
    .then(employee =>
      res.json({employee})
    );
});

// Edit employee phone
router.put('/:employeeId/phone/edit', (req, res) => {
  const { user } = req;
  const { phone } = req.body;
  const { employeeId } = req.params;
  if(!checkPermissions(user, 2) && user.employee._id !== employeeId)
    return lowPermissions(res)
  if(!phone) return res.json({msg: 'Phonenumber is required'});
  Employee.changePhonenumber(employeeId, phone)
    .then(employee=>
      res.json({employee})
    );
});

// Delete employee phone
router.delete('/:employeeId/phone/:phoneId', (req, res) => {
  if(!checkPermissions(req.user, 2) && req.user.employee._id !== employeeId)
    return lowPermissions(res)
  const { employeeId, phoneId } = req.params;
  Employee.deletePhone(employeeId, phoneId)
    .then(employee=>
      res.json({employee})
    );
});

module.exports = router;
