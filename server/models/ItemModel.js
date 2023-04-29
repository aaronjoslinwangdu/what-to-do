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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: Number
  },
  folder: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);