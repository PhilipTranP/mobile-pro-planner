const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('./embeds/Address.js');
const Phonenumber = require('./embeds/Phonenumber.js');

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
  const query = Hotel.findOne({name: name});
  return query.exec();
}
