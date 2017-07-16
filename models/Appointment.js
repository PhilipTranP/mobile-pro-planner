const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('./embeds/Address.js');
const Comment = require('./embeds/Comment.js')

mongoose.Promise = global.Promise

const appointment = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
    required: true
  },
  address: [{
    type: Address,
    required: true
  }],
  comments: [Comment],
  date: {
    type: Date,
    required: true
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }]
});

const Appointment = module.exports = mongoose.model('Appointment', appointment);
