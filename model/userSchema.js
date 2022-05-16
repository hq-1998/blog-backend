const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
});

userSchema.set('collection', 'login');
const User = mongoose.model("Login", userSchema);

module.exports = User;
