const express = require('express');
const { Appointment } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

// Add/edit address
router.put('/:id/address', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  const { address } = req.body;
  if(!address) return res.status(400).send();
  Appointment.setAddress(id, address)
    .then(appointment => res.json(appointment))
    .catch(e => res.status(400).send());
})

module.exports = router;
