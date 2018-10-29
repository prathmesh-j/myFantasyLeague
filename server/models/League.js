const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
  name: String,
  createdOn: Date,
  createdBy: String,
  members: new mongoose.Schema({id: mongoose.ObjectId})
});

module.exports = mongoose.model('League', LeagueSchema);
