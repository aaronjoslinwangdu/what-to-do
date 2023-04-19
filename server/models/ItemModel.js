const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date
  },
  userId: {
    type: Number,
    required: true
  },
  status: {
    type: Number
  },
  folder: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);