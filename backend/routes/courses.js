const express = require('express');
const Course = require('../models/Course');
const { authenticateToken } = require('../middleware/auth');
const { mockCourses } = require('../utils/mockData');
const router = express.Router();

// Get courses for a branch
router.get('/', async (req, res) => {
  try {
    const { branch } = req.query;
    let query = {};
    if (branch) {
      query.branch = branch;
    }
    const courses = await Course.find(query);
    if (!courses || courses.length === 0) {
      // Return mock data filtered by branch
      const filteredCourses = branch 
        ? mockCourses.filter(c => c.branch === branch)
        : mockCourses;
      return res.json({ data: filteredCourses });
    }
    res.json({ data: courses });
  } catch (error) {
    console.log('Database error, using mock data:', error.message);
    const { branch } = req.query;
    const filteredCourses = branch 
      ? mockCourses.filter(c => c.branch === branch)
      : mockCourses;
    res.json({ data: filteredCourses });
  }
});

// Get course details
router.get('/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      // Try mock data
      const mockCourse = mockCourses.find(c => c._id === req.params.courseId);
      if (mockCourse) return res.json(mockCourse);
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.log('Database error, checking mock data:', error.message);
    const mockCourse = mockCourses.find(c => c._id === req.params.courseId);
    if (mockCourse) return res.json(mockCourse);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
