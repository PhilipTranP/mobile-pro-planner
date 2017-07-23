const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Address, LineItem, Comment } = require('./embeds');
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
  comments: [Comment]
},
{
  timestamps: true
});

invoice.virtual('total').get(() => {
  let total = 0;
  this.items.map(item => total += item.price);
  return total;
});

invoice.set('toJSON', {virtuals:true});

const Invoice = module.exports = mongoose.model('Invoice', invoice);

module.exports.addInvoice = (invoice) => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(invoice.customer,
            { $push: { invoices: invoice } },
            {new:true})
      .then(customer => {
        if(!customer) throw validationError;
        invoice.save();
        resolve(customer);
      })
      .catch(reject);
  });
}

module.exports.editInvoice = (id, invoice) => {
  return new Promise((resolve, reject) => {
    Invoice.findById(id)
      .then(inv => {
        if(!inv) throw validationError;
        // Conditionals to allow partial updates
        if(invoice.customer) inv.customer = invoice.customer;
        if(invoice.address) inv.address = invoice.address;
        if(invoice.date)inv.date = invoice.date;
        if(invoice.kind) inv.kind = invoice.kind;
        inv.save();
        resolve(inv);
      })
      .catch(reject);
  });
}

module.exports.delete = (id) => {
  let invoice, customer;
  return new Promise((resolve, reject) => {
    Invoice.findById(id)
      .then(inv => {
        if(!inv) throw validationError;
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
        if(!inv) throw validationError;
        invoice = inv;
        return invoice.items.id(item._id)
      })
      .then(record => {
        if(!record) reject();
        record.description = item.description;
        record.price = item.price;
        return invoice.save();
      })
      .then(() => resolve(invoice))
      .catch(reject);
  });
}

module.exports.deleteItem = (id, itemId) => {
  return new Promise((resolve, reject) => {
    Invoice.findByIdAndUpdate(id,
            { $pull: { items: { _id: itemId } } },
            {new:true})
      .then(invoice => {
        if(!invoice) throw validationError;
        resolve(invoice);
      })
      .catch(reject);
  });
}

module.exports.addComment = (id, comment) => {
  return new Promise((resolve, reject) => {
    Invoice.findByIdAndUpdate(id,
            { $push: { comments: comment } },
            {new:true})
      .then(invoice => {
        if(!invoice) throw validationError;
        resolve(invoice);
      })
      .catch(reject);
  });
}

module.exports.deleteComment = (id, commentId) => {
  return new Promise((resolve, reject) => {
    Invoice.findByIdAndUpdate(id,
            { $pull: { comments: { _id: commentId } } },
            {new:true})
      .then(invoice => {
        if(!invoice) throw validationError;
        resolve(invoice);
      })
      .catch(reject);
  });
}
