const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', post);

