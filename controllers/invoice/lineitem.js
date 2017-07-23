const express = require('express');
const { checkPermissions, lowPermissions } = require('../access-control');
const { Invoice } = require('../../models');

const router = express.Router();

// Add line item to invoice
router.put('/:id/item', (req, res) => {
  const { id } = req.params;
  const { lineItem } = req.body;
  // Check user permissions
  if(!checkPermissions(req.user, 1)) return lowPermissions(res);
  if(!(lineItem && lineItem.description && lineItem.price))
    return res.status(400).send();
  Invoice.addItem(id, lineItem)
    .then(invoice => res.json(invoice))
    .catch(() => res.status(404).send());
});

// Edit line item
router.put('/:id/item/:itemId', (req, res) => {
  const { id, itemId } = req.params;
  const { lineItem } = req.body;
  // Check user permissions
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  if(!(lineItem && lineItem.description && lineItem.price))
    return res.status(400).send();
  Invoice.editItem(id, lineItem)
    .then(invoice => res.json(invoice))
    .catch(() => res.status(404).send());
});

router.delete('/:id/item/:itemId', (req, res) => {
  const { id, itemId } = req.params;
  // Check user permissions
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  Invoice.deleteItem(id, itemId)
    .then(invoice => res.json(invoice))
    .catch(() => res.status(404).send());
});

module.exports = router;
