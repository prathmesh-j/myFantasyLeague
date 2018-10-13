const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  id: Number,
  fullName: String,
  shortName: String,
  nationality: String,
  dateOfBirth: Date,
  rightArmedBowl: Boolean,
  rightHandedBat: Boolean
});

module.exports = mongoose.model('Player', PlayerSchema);
