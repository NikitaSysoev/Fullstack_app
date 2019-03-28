const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    _id: Number,
    login: String,
    password: String
  },
  // {
  //   autoIndex: true
  // },
  {
    versionKey: false
  }
);

mongoose.model('user', UserSchema);
module.exports = mongoose.model('user');
