const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const LineItem = require('./embeds/LineItem.js');

mongoose.Promise = global.Promise

module.exports = new Schema({
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});
