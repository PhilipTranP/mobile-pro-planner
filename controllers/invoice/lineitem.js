const express = require('express');
const { checkPermissions, lowPermissions } = require('../access-control');
const { Invoice } = require('../../models');

const router = express.Router();

router.put('/:id/item', (req, res) => {
  const { id } = req.params;
  const { lineItem } = req.body;
  if(!checkPermissions(req.user, 1)) return lowPermissions(res);
  Invoice.addItem(id, lineItem)
    .then(invoice => res.json(invoice))
    .catch(() => res.status(404).send());
});

router.put('/:id/item/:itemId', (req, res) => {
  const { id, itemId } = req.params;
  const { lineItem } = req.body;
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  Invoice.editItem(id, lineItem)
    .then(invoice => res.json(invoice))
});

module.exports = router;
