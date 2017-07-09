const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

mongoose.Promise = global.Promise

module.exports = new Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: Number
});
