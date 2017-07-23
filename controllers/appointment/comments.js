const express = require('express');
const { checkPermissions, lowPermissions } = require('../access-control');
const { Appointment } = require('../../models');

const router = express.Router();

router.put('/:id/comment', (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { comment } = req.body;
  if(!checkPermissions(user, 1)) return lowPermissions(res);
  if(!comment) return res.status(400).send();
  const newComment = {
    body: comment,
    employee: user
  };
  Appointment.addComment(id, newComment)
    .then(appointment => res.json(appointment))
    .catch(e => res.status(404).send());
});

router.delete('/:id/comment/:commentId', (req, res) => {
  const { id, commentId } = req.params;
  if(!checkPermissions(req.user, 2)) return lowPermissions(res);
  Appointment.deleteComment(id, commentId)
    .then(appointment => res.json(appointment))
    .catch(e => res.status(404).send());
});

module.exports = router;
