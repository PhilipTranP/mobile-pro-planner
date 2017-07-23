const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Address, Comment, Phonenumber } = require('./embeds');

mongoose.Promise = global.Promise

const customer = new Schema({
  name: {
    type: String,
    required: true
  },
  address: [Address],
  phonenumber: [Phonenumber],
  comments: [Comment],
  invoices: [{
    type: Schema.Types.ObjectId,
    ref: 'Invoice'
  }],
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
},
{
  timestamps: true
});

const Customer = module.exports = mongoose.model('Customer', customer);

module.exports.byName = name => {
  const query = Customer.findOne({name: name});
  return query.exec();
}

module.exports.getAll = () => Customer.find();

module.exports.addPhone = (id, phone) => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(id,
            { $push: { phonenumber: phone } },
            {new:true})
      .then(customer => {
        if(!customer) throw validationError;
        return customer;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.deletePhone = (id, phoneId) => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(id,
            { $pull: { phonenumber: { _id:phoneId } } },
            {new:true})
      .then(customer => {
        if(!customer) throw validationError;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.editPhone = (id, phone) => {
  return new Promise((resolve, reject) => {
    let cx;
    Customer.findById(id)
      .then(customer => {
        if(!customer) throw validationError;
        cx = customer
        return customer.phonenumber.id(phone.id)
      })
      .then(phonenumber => {
        if(!phonenumber) throw validationError;
        phonenumber.set(phone);
        cx.save();
        return cx
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.addAddress = (id, address) => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(id,
            { $push: { address: address } },
            {new:true})
      .then(customer => {
        if(!customer) throw validationError;
        return customer;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.deleteAddress = (id, addressId) => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(id,
            { $pull: { address: { _id: addressId } } },
            {new:true})
      .then(customer => {
        if(!customer) throw validationError;
        return customer;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.editAddress = (id, addressId, address) => {
  return new Promise((resolve, reject) => {
    let cx;
    Customer.findById(id)
      .then(customer => {
        if(!customer) throw validationError;
        cx = customer;
        return customer.address.id(addressId)
      })
      .then(addressRecord => {
        if(!addressRecord) throw validationError;
        addressRecord.set(address);
        cx.save();
        return cx;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.addComment = (id, comment) => {
  return new Promise((resolve, reject) => {
    let cx;
    Customer.findByIdAndUpdate(id,
            { $push: { comments: comment } },
            {new:true})
      .then(customer => {
        if(!customer) throw validationError;
        return customer;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.deleteComment = (id, commentId) => {
  return new Promise((resolve, reject) => {
    let cx;
    Customer.findByIdAndUpdate(id,
            { $pull: { comments: { _id: commentid } } },
            {new:true})
      .then(customer => {
        if(!customer) throw validationError;
        return customer;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.addInvoice = invoice => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(invoice.customer,
            { $push: { invoices: invoice } },
            {new:true})
      .then(customer => {
        if(!customer) throw validationError;
        return customer;
      })
      .then(resolve)
      .catch(reject);
  })
}

module.exports.addAppointment = appointment => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(appointment.customer,
            { $push: { appointments: appointment } },
            {new:true})
      .then(customer => {
        if(!customer) throw validationError;
        return customer;
      })
      .then(resolve)
      .catch(reject);
  });
}
