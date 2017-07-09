const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

mongoose.Promise = global.Promise

module.exports = new Schema({
  phoneType: {
    type: String,
    default: 'Unknown'
  },
  phonenumber: {
    type: String,
    required: true
  }
});
