const express = require('express');
const { Appointment } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

// New appointment
router.put('/', (req, res) => {
  // Check user permissions
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { appointment } = req.body;
  // Validate input
  if(!(appointment && appointment.customer && appointment.date && appointment.address))
    return res.status(400).send();
  Appointment.add(appointment)
    .then(appt => res.json(appt))
    .catch(() => res.status(404).send());
});

// Delete appointment
router.delete('/:id', (req, res) => {
  // Check user permissions
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  Appointment.deleteAppointment(id)
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send());
});

router.use(require('./employees'));

module.exports = router;
