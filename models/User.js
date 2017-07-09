const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

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

const User = module.exports = model('User', user);

module.exports.byUsername = username => {
  return User.findOne({username: username})
    .populate('employee')
    .exec();
}

module.exports.register = user => {
  user.passhash = bcrypt.hashSync(user.passhash, 10);
  user.save();
}
