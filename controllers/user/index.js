const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Invite = require('../../models/Invite');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../../config/secret')


// New User Registration
router.post('/register', (req, res) => {
  let invite;
  let newUser;
  // Check unique username
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
      // Destroy invite
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
    .catch((err) =>
      res.json({
        success: false,
        msg: err.message
      })
    );
});


// Login
router.post('/login', (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  let doc;
  if(!username || !password) return res.json({
    success: false,
    msg: 'All Fields Required'
  });
  return User.byUsername(username)
    .then(user => {
      if(!user) {
        throw new Error('Invalid Username or Password');
      }
      return user;
    })
    .then(user => {
      if(!User.checkPasswd(password, user.passhash)) {
        throw new Error('Invalid Username or Password');
      }
      doc = user;
      return user;
    })
    .then(user =>
      jwt.sign(user, secret, {
        expiresIn: 2419200  // 28 days
      })
    )
    .then(token =>
      res.json({
        success: true,
        token: `JWT ${token}`,
        user: {
          name: doc.employee.name,
          permissions: doc.permissions,
          phone: doc.employee.phonenumber
        }
      })
    )
    .catch(err => {
      res.json({
        success: false,
        msg: err.message
      })
    });
});

module.exports = router;
