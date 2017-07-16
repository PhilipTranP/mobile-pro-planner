const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const phonenumber = require('./embeds/phonenumber');

mongoose.Promise = global.Promise

const employee = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  phonenumber: [phonenumber]
});

const Employee = module.exports = mongoose.model('Employee', employee);
