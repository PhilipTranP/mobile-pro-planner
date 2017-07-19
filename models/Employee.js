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
  let emp;
  return new Promise((resolve, reject) => {
    Employee.findById(id).populate('user')
      .then(employee => {
        if(!employee) reject('no emp');
        emp = employee;
        if(employee.user && employee.user.permissions >= user.permissions && user.permissions !== 3) reject('lowPermissions');
        if(employee.user) User.remove({_id: employee.user._id});
        return Employee.remove({_id: id})
      })
      .then(resolve)
      .catch(e => console.log(e));
  });
}

module.exports.addAddress = (id, address) => {
  return new Promise((resolve, reject) => {
    Employee.findById(id)
      .then(employee => {
        employee.address = address;
        employee.save();
        return employee
      })
      .then(resolve)
  });
}
