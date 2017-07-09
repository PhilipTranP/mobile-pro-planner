const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

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
});

const HotelStay = module.exports = model('HotelStay', hotelStay);
