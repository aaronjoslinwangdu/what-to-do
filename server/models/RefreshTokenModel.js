const mongoose = require('mongoose');

const refreshTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 24 * 60 * 60 * 1000 }
  }
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);