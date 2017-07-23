const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Address, Phonenumber, User } = require('./embeds');


mongoose.Promise = global.Promise

const employee = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  phonenumber: [Phonenumber],
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  address: Address
},
{
  timestamps: true
});

const Employee = module.exports = mongoose.model('Employee', employee);

module.exports.getAll = () => {
  return Employee.find().exec();
}

module.exports.deleteEmployee = (user, id) => {
  return new Promise((resolve, reject) => {
    Employee.findById(id).populate('user')
      .then(employee => {
        if(!employee) throw validationError;
        if(employee.user && employee.user.permissions >= user.permissions && user.permissions !== 3) reject('lowPermissions');
        if(employee.user) User.remove({_id: employee.user._id});
        return Employee.remove({_id: id})
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.updateAddress = (id, address) => {
  return new Promise((resolve, reject) => {
    Employee.findById(id)
      .then(employee => {
        if(!employee) throw validationError;
        employee.address = address;
        employee.save();
        return employee
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.addPhonenumber = (id, phone) => {
  return new Promise((resolve, reject) => {
    Employee.findByIdAndUpdate(id,
            { $push: { phonenumber: phone } },
            {new:true})
      .then(employee => {
        if(!employee) throw validationError;
        return employee;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.changePhonenumber = (id, phone) => {
  return new Promise((resolve, reject) => {
    let emp;
    Employee.findById(id)
      .then(employee => {
        if(!employee) throw validationError;
        emp = employee;
        return employee.phonenumber.id(phone._id)
      })
      .then(phonenumber => {
        if(!phonenumber) throw validationError;
        phonenumber.phoneType = phone.phoneType;
        phonenumber.phonenumber = phone.phonenumber;
        return emp.save();
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.deletePhone = (id, phoneId) => {
  return new Promise((resolve, reject) => {
    Employee.findByIdAndUpdate(id,
            { $pull: { phonenumber: { _id:phoneId } } },
            {new: true})
      .then(employee => {
        if(!employee) throw validationError;
        return employee;
      })
      .then(resolve)
      .catch(reject);
  });
}
