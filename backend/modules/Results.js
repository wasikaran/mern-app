// models/Result.js
const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  wpm: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true
  },
  characters: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  timer: {
    type: Number
  },
  wordCount: {
    type: Number
  },
  language: {
    type: String,
    required: true
  },
  includeNumbers: {
    type: Boolean,
    default: false
  },
  includePunctuation: {
    type: Boolean,
    default: false
  },
  includeQuotes: {
    type: Boolean,
    default: false
  },
  practiceMode: {
    type: Boolean,
    default: false
  },
  selectedLetter: {
    type: String
  },
  practiceType: {
    type: String
  },
  timeHistory: [{
    time: Number,
    characters: Number
  }],
  typedHistory: [String],
  wordList: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Result', ResultSchema);