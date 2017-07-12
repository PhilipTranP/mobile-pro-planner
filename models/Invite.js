const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

mongoose.Promise = global.Promise

const invite = new Schema({
  permissions: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  code: {
    type: String,
    required: true
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
});

const Invite = module.exports = model('Invite', invite);

module.exports.getInvite = code => {
  return Invite.findOne({code: code})
    .populate('employee')
    .exec();
}

module.exports.make = (employee, permissions) => {
  const opts = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890';
  let code = '';
  for(let i=0;i<16;i++) {
    code += opts.charAt(Math.floor(Math.random() * 62));
  }
  let invite = new Invite({
    employee: employee._id,
    permissions: permissions,
    code: code
  });
  invite.save();
  return invite.code;
}
