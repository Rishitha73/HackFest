const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: String,
  name: String,
  link: String,
}, { _id: false });

const phaseSchema = new mongoose.Schema({
  milestone: String,
  duration: String,
  skills: [String],
  resources: [resourceSchema],
}, { _id: false });

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    phases: [phaseSchema],
    branch: String,
    interests: [String],
    focus: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Roadmap', roadmapSchema);
