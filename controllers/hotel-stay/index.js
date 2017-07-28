const express = require('express');
const { HotelStay } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

// Add hotel stay
router.put('/', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { hotelStay } = req.body;
  if(!(hotelStay && hotelStay.hotel && hotelStay.checkIn && hotelStay.checkOut))
    return res.status(400).send();
  HotelStay.add(hotelStay)
    .then(stay => res.json(stay))
    .catch(e => res.status(400).send());
});

// Remove hotel stay
router.delete('/:id', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  HotelStay.delete(id)
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send());
});

module.exports = router;
