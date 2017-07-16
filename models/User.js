const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Employee = require('./Employee.js')
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise

const user = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  passhash: {
    type: String,
    required: true
  },
  permissions: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('User', user);

module.exports = User

module.exports.byUsername = username => {
  return User.findOne({username: username})
    .populate('employee')
    .exec();
}

module.exports.register = user => {
  user.passhash = bcrypt.hashSync(user.passhash, 10);
  user.save();
}

module.exports.checkPasswd = (password, passhash) => {
  return bcrypt.compareSync(password, passhash);
}
