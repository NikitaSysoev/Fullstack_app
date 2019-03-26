const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  versionKey: {
    required: false
  }
});

mongoose.model('user', UserSchema);
module.exports = mongoose.model('user');
