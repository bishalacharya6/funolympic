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
  file: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model('image', imageSchema);
module.exports = Image;
