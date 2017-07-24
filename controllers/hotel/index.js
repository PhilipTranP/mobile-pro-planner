const express = require('express');
const { Hotel } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

router.get('/', (req, res) => {
  if(!checkPermissions(req.user, 1)) return lowPermissions(res);
  Hotel.getAll()
    .then(hotels =>
      res.json({hotels})
    )
});

router.put('/', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { hotel } = req.body;
  if(!(hotel && hotel.name && hotel.address)) return res.status(400).send();
  Hotel.new(hotel)
    .then(hotel => res.json(hotel))
    .catch(e => res.status(500).send());
});

router.delete('/:id', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  Hotel.delete(id)
    .then(() => res.status(200).send())
    .catch(e => res.status(404).send());
});

router.put('/:id', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  const { hotel } = req.body;
  if(!(hotel.name || hotel.address || hotel.phonenumber)) return res.status(400).send();
  Hotel.edit(id, hotel)
    .then(record => res.json(record))
    .catch(e => res.status(404).send());
});

module.exports = router;
