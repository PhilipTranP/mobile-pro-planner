const express = require('express');
const { checkPermissions, lowPermissions } = require('../access-control');
const { Invoice, Customer } = require('../../models');

const router = express.Router();

// Add invoice
router.put('/', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions();
  const { invoice } = req.body;
  console.log(invoice);
  // Validate input
  if(!(invoice.customer && invoice.kind && invoice.address && invoice.date))
    return res.json({msg:'All fields required'});
  const newInvoice = new Invoice(invoice);
  newInvoice.save();
  console.log(newInvoice);
  Customer.addInvoice(newInvoice.customer, newInvoice);
  Customer.findById(newInvoice.customer)
    .then(cx =>
      res.json({
        invoice: newInvoice,
        customer: cx
      })
    )
});

module.exports = router;
