const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
