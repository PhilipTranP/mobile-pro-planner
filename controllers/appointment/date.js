const express = require('express');
const { Appointment } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

router.put('/:id/date', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  const { date } = req.body;
  if(!date) return res.status(400).send();
  Appointment.setDate(id, date)
    .then(appointment => res.json(appointment))
    .catch(e => res.status(404).send());
});

module.exports = router;
