const express = require('express');
const passport = require('passport');
const Customer = require('../../models/Customer');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

// Add/delete comments
router.put('/:cx/comment', (req, res) => {
  if(!checkPermissions(req.user, 1)) return lowPermissions(res);
  const { comment } = req.body;
  if(!comment) return res.status(400).send();
  const newComment = {
    body: comment,
    employee: req.user
  };
  Customer.addComment(req.params.cx, newComment)
    .then(customer => res.json(customer))
    .catch(e => res.status(404).send('Not Found'));
});

router.delete('/:cx/comment/:comment', (req, res) => {
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  const { cx, comment } = req.params;
  Customer.deleteComment(cx, comment)
    .then(customer => res.json(cusomer))
    .catch(e => res.status(404).send());
});

module.exports = router;
