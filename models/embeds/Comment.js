const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

mongoose.Promise = global.Promise

let comment = module.exports = new Schema({
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

comment.path('body').set(comment => {
  comment = comment.replace(/\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/g, '{Credit card REDACTED}');
  comment = comment.replace(/\d{4}[\s-]?\d{6}[\s-]?\d{5}/g, '{Credit card REDACTED}');
  return comment;
});
