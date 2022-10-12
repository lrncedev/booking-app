const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

//Toggler for Logged in and Logged out
userSchema.methods.toggleLoggedIn = function() {
  this.isLoggedIn = !this.isLoggedIn;
  // return this.save();
}


module.exports = mongoose.model('User', userSchema);