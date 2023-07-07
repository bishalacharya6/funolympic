const mongoose = require('mongoose');
const {Schema} = mongoose;


const newsSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const News = mongoose.model('news', newsSchema);

module.exports = News;
