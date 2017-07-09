const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

mongoose.Promise = global.Promise

const comment = module.exports = new Schema({
  body: {
    type: String,
    required: true
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
});
