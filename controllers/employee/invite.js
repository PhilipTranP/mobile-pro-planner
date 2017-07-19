const express = require('express');
const { Employee, Invite } = require('../../models');
const passport = require('passport');
const { checkPermissions, lowPermissions } = require('../access-control')

const router = express.Router();

// Add invite
router.put(
  '/:employee/invite',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { user } = req;
    const { permissions } = req.body;
    if(!permissions) return res.json({
      success: false,
      msg: 'Permissions level required'
    });
    if(!checkPermissions(user, 2) || permissions > user.permissions)
      return lowPermissions(res);
    Employee.findById(req.params.employee)
      .then(employee => {
        if(!employee) return res.status(404).send('Not Found');
        const invite = Invite.make(employee, permissions)
        return res.json({
          success: true,
          code: invite
        });
      })
});

module.exports = router;
