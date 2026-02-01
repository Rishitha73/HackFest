const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/academic-roadmap');
    console.log('MongoDB connected\n');

    const users = await User.find({});
    console.log(`Found ${users.length} users in database\n`);

    if (users.length === 0) {
      console.log('No users found. You need to register new users.\n');
      console.log('Available branches for undergraduate students:');
      console.log('- Computer Science and Engineering');
      console.log('- Mechanical Engineering');
      console.log('- Electrical Engineering');
      console.log('- Civil Engineering');
      console.log('- Electronics and Communication Engineering');
    } else {
      console.log('Existing Users:\n');
      users.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Role: ${user.role}`);
        console.log(`  Branch: ${user.branch || 'N/A'}`);
        console.log(`  Note: Password is hashed, use original password from registration`);
        console.log('-----------------------------------\n');
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUsers();
