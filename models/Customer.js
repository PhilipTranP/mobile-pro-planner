const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const address = require('./embed/Address.js')
const phonenumber = require('./embeds/Phonenumber.js');
const comment = require('./embeds/Comment.js');

mongoose.Promise = global.Promise

const customer = new Schema({
  name: {
    type: String,
    required: true
  },
  address: [address],
  phonenumber: [phonenumber],
  comments: [comment],
  invoices: [{
    type: Schema.Types.ObjectId,
    ref: 'Invoice'
  }],
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
});

const Customer = module.exports = model('Customer', customer);

module.exports.byName = name => {
  const query = Customer.findOne({name: name});
  return query.exec();
}
