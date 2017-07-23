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
    Customer.findById(id)
      .then(customer => {
        if(!customer) return reject('no cx');
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

module.exports.addComment = (id, comment) => {
  return new Promise((resolve, reject) => {
    let cx;
    Customer.findById(id)
      .then(customer => {
        if(!customer) reject('no cx');
        cx = customer;
        customer.comments.push(comment);
        return customer.save();
      })
      .then(() => resolve(cx))
  });
}

module.exports.deleteComment = (id, commentId, user) => {
  return new Promise((resolve, reject) => {
    let cx;
    Customer.findById(id)
      .then(customer => {
        if(!customer) reject('no cx');
        cx = customer;
        return customer.comments.id(commentId);
      })
      .then(comment => {
        if(comment.employee !== user && user.permissions < 2) reject('unauthorized');
        cx.comments.pull({_id:commentId})
        return cx.save();
      })
      .then(cx => resolve(cx));
  });
}

module.exports.addInvoice = invoice => {
  return new Promise((resolve, reject) => {
    Customer.findById(invoice.customer)
      .then(customer => {
        if(!customer) reject('no cx');
        customer.invoices.push(invoice._id);
        customer.save();
        resolve(customer);
      })
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
        resolve(customer);
      })
      .catch(reject)
  });
}
