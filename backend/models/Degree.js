const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    branches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Degree', degreeSchema);
