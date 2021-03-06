const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Hotel = require('./Hotel');
const Employee = require('./Employee');

mongoose.Promise = global.Promise

const hotelStay = new Schema({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  }
},
{
  timestamps: true
});

const HotelStay = module.exports = mongoose.model('HotelStay', hotelStay);

module.exports.add = hotelStay => {
  return new Promise((resolve, reject) => {
    const stay = new HotelStay(hotelStay)
    stay.save()
      .then(resolve, reject);
  })
}

module.exports.delete = id => {
  return new Promise((resolve, reject) => {
    HotelStay.findByIdAndRemove(id)
      .then(stay => {
        if(!stay) throw validationError;
        return stay;
      })
      .then(resolve)
      .catch(reject);
  })
}

module.exports.edit = (id, hotelStay) => {
  return new Promise((resolve, reject) => {
    HotelStay.findById(id)
      .then(stay => {
        if(!stay) throw validationError;
        return stay;
      })
      .then(stay => {
        if(hotelStay.hotel) stay.hotel = hotelStay.hotel;
        if(hotelStay.checkIn) stay.checkIn = hotelStay.checkIn;
        if(hotelStay.checkOut) stay.checkOut = hotelStay.checkOut;
        return stay.save();
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.addEmployees = (id, employees) => {
  return new Promise((resolve, reject) => {
    HotelStay.findByIdAndUpdate(id,
              { $pushAll: {employees: employees} },
              {new:true})
      .then(stay => {
        if(!stay) throw validationError;
        return stay;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.deleteEmployees = (id, employees) => {
  return new Promise((resolve, reject) => {
    HotelStay.findByIdAndUpdate(id,
              { $pullAll: { employees: employees } },
              {new:true})
      .then(stay => {
        if(!stay) throw validationError;
        return stay;
      })
      .then(resolve)
      .catch(reject);
  });
}

module.exports.getMySchedule = (user, start, limit) => {
  return HotelStay.find({
    employees: { $in: [user.employee._id] },
    date: { $gt: start, $lt: limit }
  }).populate('hotel').exec();
}
