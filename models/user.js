const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    sparse: true
  },
  firstName:String,
  lastName:String
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
