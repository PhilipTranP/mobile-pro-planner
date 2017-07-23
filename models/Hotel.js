const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Address, Phonenumber } = require('./embeds');

mongoose.Promise = global.Promise

const hotel = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: Address,
    required: true
  },
  phonenumber: Phonenumber
},
{
  timestamps: true
});

const Hotel = module.exports = mongoose.model('Hotel', hotel);

module.exports.byName = name => {
  return Hotel.findOne({name: name}).exec();
}

module.exports.getAll = () => {
  return Hotel.find().exec();
}

module.exports.new = hotel => {
  return new Promise((resolve, reject) => {
    const newHotel = new Hotel(hotel);
    newHotel.save()
      .then(resolve)
      .catch(reject);
  });
}

module.exports.delete = id => {
  return Hotel.findByIdAndRemove(id).exec();
}
