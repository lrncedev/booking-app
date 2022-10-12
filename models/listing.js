const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listingName: {
    type: String,
    required: true
  },
  userName:  {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    required: true,
    default: Date.now
  },
  
})

module.exports = mongoose.model('Listing', listingSchema);