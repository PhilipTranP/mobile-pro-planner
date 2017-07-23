const express = require('express');
const { Invoice } = require('../../models');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

router.put('/:id/comment', (req, res) => {
  const { body } = req.body;
  const { id } = req.params;
  const { user } = req;
  // Check user permissions
  if(!checkPermissions(user, 1)) return lowPermissions(res);
  if(!body) return res.status(400).send();
  const comment = {
    body: body,
    employee: user.employee
  };
  Invoice.addComment(id, comment)
    .then(invoice =>
      res.json(invoice)
    )
    .catch(() => res.status(404).send());
});

router.delete('/:id/comment/:commentId', (req, res) => {
  const { id, commentId } = req.params;
  const { user } = req;
  // Check user permissions
  if(!checkPermissions(user, 2)) return lowPermissions(res);
  Invoice.deleteComment(id, commentId)
    .then(invoice =>
      res.json(invoice)
    )
    .catch(() => res.status(404).send());
});

module.exports = router;
