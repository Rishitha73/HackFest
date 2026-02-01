const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    advancedTopics: [String],
    projects: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
