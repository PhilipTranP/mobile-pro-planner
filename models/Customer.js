const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const address = require('./embeds/Address')
const phonenumber = require('./embeds/Phonenumber');
const comment = require('./embeds/Comment');

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

const Customer = module.exports = mongoose.model('Customer', customer);

module.exports.byName = name => {
  const query = Customer.findOne({name: name});
  return query.exec();
}

module.exports.getAll = () => Customer.find();

module.exports.addPhone = (id, phone) => {
  return new Promise((resolve, reject) => {
    Customer.findById(id)
      .then(customer => {
        if(!customer) reject('no cx');
        customer.phonenumber.push(phone);
        customer.save();
        resolve(customer);
      });
  });
}

module.exports.deletePhone = (id, phoneId) => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(id,
                              { $pull: { phonenumber: { _id:phoneId } } },
                              {new: true})
      .then(customer => {
        if(!customer) reject('no cx');
        resolve(customer);
      });
  });
}

module.exports.editPhone = (id, phoneId, phone) => {
  return new Promise((resolve, reject) => {
    let cx;
    Customer.findById(id)
      .then(customer => {
        if(!customer) reject('no cx');
        cx = customer;
        return customer.phonenumber.id(phoneId)
      })
      .then(phoneRecord => {
        if(!phoneRecord) reject('no ph');
        phoneRecord.set(phone);
        return cx.save();
      })
      .then(() => resolve(cx));
  });
}

module.exports.addAddress = (id, address) => {
  return new Promise((resolve, reject) => {
    Customer.findById(id)
      .then(customer => {
        if(!customer) reject('no cx');
        customer.address.push(address);
        customer.save();
        resolve(customer);
      });
  });
}

module.exports.deleteAddress = (id, addressId) => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(id,
                              { $pull: { address: { _id:addressId } } },
                              {new:true})
      .then(customer => {
        if(!customer) reject('no cx');
        resolve(customer);
      });
  });
}

module.exports.editAddress = (id, addressId, address) => {
  return new Promise((resolve, reject) => {
    let cx;
    Customer.findById(id)
      .then(customer => {
        if(!customer) reject('no cx');
        cx = customer;
        return customer.address.id(addressId)
      })
      .then(addressRecord => {
        if(!addressRecord) reject('no ad');
        addressRecord.set(address);
        return cx.save();
      })
      .then(() => resolve(cx));
  });
}
