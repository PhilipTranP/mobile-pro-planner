const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Address, LineItem } = require('./embeds');

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
  },
  date: {
    type: Date,
    required: true
  },
  items: [LineItem],
},
{
  timestamps: true
});

invoice.virtual('total').get(() => {
  let total = 0;
  this.items.map(item => total += item.price);
  return total;
});

const Invoice = module.exports = mongoose.model('Invoice', invoice);
