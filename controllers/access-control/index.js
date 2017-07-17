module.exports.checkPermissions = (user, reqd) => user.permissions >= reqd;
module.exports.lowPermissions = () => res.json({
  success: false,
  msg: 'You do not have permission to do this'
});
