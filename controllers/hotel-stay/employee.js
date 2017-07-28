const express = require('express');
const { checkPermissions, lowPermissions } = require('../access-control');
const { HotelStay } = require('../../models');

const router = express.Router();

// Add employees
router.put('/:id/employee', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  const { employees } = req.body;
  if(!Array.isArray(employees)) return res.status(400).send();
  HotelStay.addEmployees(id, employees)
    .then(stay => res.json(stay))
    .catch(e => res.status(404).send());
});

// Remove employees
router.delete('/:id/employee', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  const { employees } = req.body;
  if(!Array.isArray(employees)) return res.status(400).send();
  HotelStay.deleteEmployees(id, employees)
    .then(stay => res.json(stay))
    .catch(e => res.status(404).send());
});


module.exports = router;
