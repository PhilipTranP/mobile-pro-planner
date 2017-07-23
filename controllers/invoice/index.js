const express = require('express');
const { checkPermissions, lowPermissions } = require('../access-control');
const { Invoice, Customer } = require('../../models');

const router = express.Router();

// Add invoice
router.put('/', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { invoice } = req.body;
  // Validate input
  if(!(invoice.customer && invoice.kind && invoice.address && invoice.date))
    return res.json({msg:'All fields required'});
  const newInvoice = new Invoice(invoice);
  Invoice.addInvoice(newInvoice)
    .then(cust => res.json(cust))
    .catch(e => res.status(404).json(e));
});

// Edit invoice
router.put('/:id', (req, res) => {
  // Check user permissions
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { id } = req.params;
  const { invoice } = req.body;
  // Validate input
  if(!(invoice.customer || invoice.address || invoice.date || invoice.kind))
    return res.status(400).send();
  Invoice.editInvoice(id, invoice)
    .then(inv => {
      res.json(inv)
    })
    .catch(e => {
      console.log(e);
      return res.status(404).send();
    });
});

// Delete invoice
router.delete('/:id', (req, res) => {
  // Check user permissions
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  Invoice.delete(req.params.id)
    .then(customer => res.json({
      success: true,
      customer: customer
    }))
    .catch(e => res.status(400).send());
});

// Import sun-routers
router.use(require('./lineitem'));
router.use(require('./comment'));

module.exports = router;
