const express = require('express');
const { Appointment, HotelStay } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

router.get('/', (req, res) => {
  const today = new Date();
  const limit = new Date();
  limit.setDate(today.getDate() + 10);
  today.setDate(today.getDate() - 1);
  // let schedule = new Object();
  const promises = new Array();
  promises.push(
    Appointment.getMySchedule(req.user, today, limit)
  );
  promises.push(
    HotelStay.getMySchedule(req.user, today, limit)
  );
  return Promise.all(promises)
    .then(values => {
      return {
        appointments: values[0],
        hotelStays: values[1]
      };
    })
    .then(schedule => res.json(schedule))
    .catch(() => res.status(500).send());
});

module.exports = router;
