const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Invite = require('../models/Invite.js');

router.post('/register', (req, res) => {
  // Check unique username
  let invite;
  return User.byUsername(req.body.username)
    .then(user => {
      if(user) throw new Error('username taken');
    })
    .then(() =>
      // Find invite
      Invite.getInvite(req.body.code)
    )
    .then(invite => {
      // Verify invite
      if(!invite) throw new Error('Invalid invite code');
      let user = new User({
        employee: invite.employee._id,
        permissions: invite.permissions,
        username: req.body.username.toLowerCase(),
        passhash: req.body.password
      });
      invite.remove();
      return user
    })
    .then(user => {
      User.register(user);

    })
    .then(() =>
      res.json({
        success: true,
        msg: 'User registered'
      })
    )
    .catch((e) =>
      res.json({
        success: false,
        msg: e
      })
    );
});

module.exports = router;
