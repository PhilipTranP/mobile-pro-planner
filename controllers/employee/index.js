const express = require('express');
const passport = require('passport');
const Employee = require('../../models/Employee');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if(!checkPermissions(req.user, 2)) return lowPermissions(res);
    return Employee.getAll()
      .then(employees => res.json(employees));
});

// Add employee
router.put(
  '/new',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
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
router.delete(
  '/:employee',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
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
