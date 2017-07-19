const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Address, Comment } = require('./embeds');

mongoose.Promise = global.Promise

const appointment = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  address: [Address],
  comments: [Comment],
  date: {
    type: Date,
    required: true
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }]
},
{
  timestamps: true
});

const Appointment = module.exports = mongoose.model('Appointment', appointment);
