const express = require('express');
const passport = require('passport');
const { Employee } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

// Add employee
router.put('/new', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { name } = req.body;
  const employee = new Employee({name: name});
  employee.save()
    .then(() => res.json({
      success: true,
      employee: employee
    }));
});

// Delete employee
router.delete('/:employee', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  Employee.deleteEmployee(req.user, req.params.employee)
    .then(() => res.json({
      success: true
    }))
    .catch(e => {
      console.log(e);
      if(e === 'no emp') return res.status(404).send('Not Found');
      if(e === 'lowPermissions') return lowPermissions(res);
    });
});

module.exports = router;
