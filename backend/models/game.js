const mongoose = require('mongoose');
const {Schema} = mongoose;

const imageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Game = mongoose.model('game', imageSchema);
module.exports = Game;
