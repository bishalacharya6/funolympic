const mongoose = require('mongoose');
const {Schema} = mongoose;

const highlightSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  }
});

const Highlights = mongoose.model('highlight', highlightSchema);

module.exports = Highlights;
