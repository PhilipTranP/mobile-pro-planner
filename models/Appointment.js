const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Address, Comment } = require('./embeds');
const Customer = require('./Customer');
const Employee = require('./Employee')

mongoose.Promise = global.Promise

const appointment = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  address: Address,
  comments: [Comment],
  date: {
    type: Date,
    required: true
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }]
},
{
  timestamps: true
});

const Appointment = module.exports = mongoose.model('Appointment', appointment);

module.exports.add = appointment => {
  return new Promise((resolve, reject) => {
    const newApt = new Appointment(appointment)
    Customer.addAppointment(newApt)
      .then(customer => {
        newApt.save();
        return {
          cx: customer,
          appointment: newApt
        }
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.deleteAppointment = id => {
  return new Promise((resolve, reject) => {
    Appointment.findById(id)
      .then(appointment => {
        if(!appointment) throw validationError;
        Customer.update(
          { _id: appointment.customer },
          { $pull: { appointments: appointment._id } }
        )
        if(appointment.employees.length) {
          appointment.employees.forEach(employeeId => {
            Employee.update(
              { _id: employeeId },
              { $pull: { appointments: appointment._id } }
            );
          });
        }
        appointment.remove();
        resolve();
      })
      .catch(reject)
  });
}

module.exports.addEmployees = (id, employees) => {
  return new Promise((resolve, reject) => {
    Appointment.findByIdAndUpdate(id,
                { $pushAll: { employees: employees } },
                {new:true})
      .then(appointment => {
        if(!appointment) throw validationError;
        return appointment;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.deleteEmployees = (id, employees) => {
  return new Promise((resolve, reject) => {
    Appointment.findByIdAndUpdate(id,
                { $pullAll: { employees: employees } },
                {new:true})
      .then(appointment => {
        if(!appointment) throw validationError;
        return appointment;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.setAddress = (id, address) => {
  return new Promise((resolve, reject) => {
    Appointment.findByIdAndUpdate(id,
                { $set: { address: address } },
                {new:true})
      .then(appointment => {
        if(!appointment) throw validationError;
        return appointment;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.addComment = (id, comment) => {
  return new Promise((resolve, reject) => {
    Appointment.findByIdAndUpdate(id,
                { $push: { comments: comment } },
                {new:true})
      .then(appointment => {
        if(!appointment) throw validationError;
        return appointment;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.deleteComment = (id, commentId) => {
  return new Promise((resolve, reject) => {
    Appointment.findByIdAndUpdate(id,
                { $pull: { comments: { _id: commentId } } },
                {new:true})
      .then(appointment => {
        if(!appointment) throw validationError;
        return appointment;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.setDate = (id, date) => {
  return new Promise((resolve, reject) => {
    Appointment.findByIdAndUpdate(id,
                { $set: { date: date } },
                {new:true})
      .then(appointment => {
        if(!appointment) throw validationError;
        return appointment;
      })
      .then(resolve)
      .catch(reject);
  });
}
