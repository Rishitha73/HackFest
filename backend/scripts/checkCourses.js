const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');

dotenv.config();

const checkCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/academic-roadmap');
    console.log('MongoDB connected\n');

    const courses = await Course.find({});
    console.log(`Found ${courses.length} courses in database\n`);

    courses.forEach(course => {
      console.log('-----------------------------------');
      console.log('Name:', course.name);
      console.log('Branch:', course.branch);
      console.log('Overview:', course.overview.substring(0, 50) + '...');
      console.log('Advanced Topics:', course.advancedTopics?.length || 0);
      console.log('Projects:', course.projects?.length || 0);
      if (course.advancedTopics && course.advancedTopics.length > 0) {
        console.log('First topic:', course.advancedTopics[0]);
      }
      if (course.projects && course.projects.length > 0) {
        console.log('First project:', course.projects[0]);
      }
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkCourses();
