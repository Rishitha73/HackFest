const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    degreeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Degree',
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    detailedDescription: String,
    whatYouLearn: [String],
    jobProspects: [String],
    eligibility: String,
    prerequisites: [String],
    careerGrowth: String,
    industryTrends: String,
    averageSalary: String,
    topRecruiters: [String],
    skills: [String],
    trialTasks: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Branch', branchSchema);
