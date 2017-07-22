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
    .then(cx =>
      res.json({
        invoice: newInvoice,
        customer: cx
      })
    )
    .catch(e => res.json({
      msg: 'Bad customer ID'
    }));
});

router.delete('/:id', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  Invoice.delete(req.params.id)
    .then(customer => res.json({
      success: true,
      customer: customer
    }))
    .catch(e => res.status(400).send());
});

router.use(require('./lineitem'));

module.exports = router;
