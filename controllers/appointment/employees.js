const express = require('express');
const { checkPermissions, lowPermissions } = require('../access-control');
const { Appointment } = require('../../models');

const router = express.Router();

router.put('/:id/employee', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  const { employees } = req.body;
  if(!employees.length) return res.status(400).send();
  Appointment.addEmployees(id, employees)
    .then(appointment => res.json(appointment))
    .catch(e => res.status(404).send());
});

router.delete('/:id/employee', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  const { employees } = req.body;
  if(!employees.length) return res.status(400).send();
  Appointment.deleteEmployees(id, employees)
    .then(appointment => res.json(appointment))
    .catch(e => res.status(404).send())
});

module.exports = router;
