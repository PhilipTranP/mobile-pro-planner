const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const LineItem = require('./embeds/LineItem.js');
const Address = require('./embeds/Address.js')

mongoose.Promise = global.Promise

const invoice = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  kind: {
    type: String,
    required: true
  },
  address: {
    type: Address,
    required: true
  }
  date: {
    type: Date,
    required: true
  },
  items: [LineItem],
});

invoice.virtual('total').get(() => {
  let total = 0;
  this.items.map(item => total += item.price);
  return total;
});

const Invoice = module.exports = model('Invoice', invoice);
