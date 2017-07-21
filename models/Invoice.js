const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Address, LineItem } = require('./embeds');
const Customer = require('./Customer')

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

module.exports.addInvoice = (invoice) => {
  return new Promise((resolve, reject) => {
    let cx;
    Customer.findById(invoice.customer)
      .then(customer => {
        if(!customer) reject('no cx');
        cx = customer;
        return invoice.save();
      })
      .then(() =>
        Customer.addInvoice(invoice)
      )
      .then(() => resolve(cx))
  });
}
