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

module.exports.delete = (id) => {
  let invoice, customer;
  return new Promise((resolve, reject) => {
    Invoice.findById(id)
      .then(inv => {
        if(!inv) reject('no invoice');
        invoice = inv;
        return Customer.findByIdAndUpdate(inv.customer,
              { $pull: { invoices: id } },
              {new:true});
      })
      .then(cx => {
        customer = cx;
        invoice.remove();
      })
      .then(() => resolve(customer))
      .catch(reject)
  });
}

module.exports.addItem = (id, item) => {
  return new Promise((resolve, reject) => {
    Invoice.findByIdAndUpdate(id,
            { $push: { items: item } },
            {new:true})
      .then(resolve)
      .catch(reject);
  });
}

module.exports.editItem = (id, item) => {
  let invoice;
  return new Promise((resolve, reject) => {
    Invoice.findById(id)
      .then(inv => {
        invoice = inv;
        return invoice.items.id(item._id)
      })
      .then(record => {
        record.description = item.description;
        record.price = item.price;
        return invoice.save();
      })
      .then(() => resolve(invoice))
  });
}
