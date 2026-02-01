const express = require('express');
const Degree = require('../models/Degree');
const Branch = require('../models/Branch');
const { authenticateToken } = require('../middleware/auth');
const { mockDegrees, mockBranches } = require('../utils/mockData');
const router = express.Router();

// Get all degrees
router.get('/', async (req, res) => {
  try {
    const degrees = await Degree.find().populate('branches');
    if (!degrees || degrees.length === 0) {
      // Return mock data if database is empty or unavailable
      return res.json({ data: mockDegrees });
    }
    res.json({ data: degrees });
  } catch (error) {
    console.log('Database error, using mock data:', error.message);
    res.json({ data: mockDegrees });
  }
});

// Get branch details (specific route before dynamic route)
router.get('/branch/:branchId', async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId).populate('degreeId');
    if (!branch) {
      // Try mock data
      const mockBranch = mockBranches.find(b => b._id === req.params.branchId);
      if (mockBranch) return res.json(mockBranch);
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.json(branch);
  } catch (error) {
    console.log('Database error, checking mock data:', error.message);
    const mockBranch = mockBranches.find(b => b._id === req.params.branchId);
    if (mockBranch) return res.json(mockBranch);
    res.status(500).json({ error: error.message });
  }
});

// Get branches for a degree (dynamic route after specific routes)
router.get('/:degreeId/branches', async (req, res) => {
  try {
    const branches = await Branch.find({ degreeId: req.params.degreeId });
    if (!branches || branches.length === 0) {
      // Try mock data
      const mockBranchesForDegree = mockBranches.filter(b => b.degreeId === req.params.degreeId);
      if (mockBranchesForDegree.length > 0) return res.json(mockBranchesForDegree);
    }
    res.json(branches);
  } catch (error) {
    console.log('Database error, checking mock data:', error.message);
    const mockBranchesForDegree = mockBranches.filter(b => b.degreeId === req.params.degreeId);
    res.json(mockBranchesForDegree || []);
  }
});

module.exports = router;
