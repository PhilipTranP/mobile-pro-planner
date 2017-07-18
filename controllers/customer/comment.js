const express = require('express');
const passport = require('passport');
const Customer = require('../../models/Customer');
const { checkPermissions, lowPermissions } = require('../access-control');

const router = express.Router();

// Add/delete comments
router.put(
  '/:cx/comment',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { comment } = req.body;
    if(!comment) return res.json({
      success: false,
      msg: 'Comments are made out of words. Use some.'
    });
    const newComment = {
      body: comment,
      employee: req.user
    };
    Customer.addComment(req.params.cx, newComment)
      .then(customer =>
        res.json({
          success: true,
          customer: customer
        })
      )
      .catch(e =>
        res.status(404).send('Not Found')
      );
  }
);

router.delete(
  '/:cx/comment/:comment',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { cx, comment } = req.params;
    Customer.deleteComment(cx, comment, req.user)
      .then(customer =>
        res.json({
          success: true,
          customer: customer
        })
      )
      .catch(e => {
        if(e == 'no cx') return res.status(404).send('Not Found');
        return res.status(401).send(e)
      });
  }
);

module.exports = router;