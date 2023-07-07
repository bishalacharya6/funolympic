const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sports: {
    type: String,
    required: true
  },
  olympicMedals: {
    type: Number,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  gameParticipants: {
    type: Number,
    required: true
  },
  firstOlympicGames: {
    type: Number,
    required: true
  },
  yearOfBirth: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
});

const Player = mongoose.model('player', playerSchema);

module.exports = Player;
