const express = require('express');
const Roadmap = require('../models/Roadmap');
const { authenticateToken } = require('../middleware/auth');
const { generateRoadmapWithLLM } = require('../utils/llm');
const router = express.Router();

// Generate roadmap
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { branch, courseId, interests, focus, role } = req.body;

    if (!interests || !focus) {
      return res.status(400).json({ error: 'Interests and focus required' });
    }

    const branchName = branch || courseId || 'General Studies';
    const prompt = `Generate a detailed 4-year roadmap for a ${role === 'pre-university' ? 'B.Tech ' + branchName : 'course in ' + branchName} with focus on ${focus}.
    Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}.
    Include phases with milestones, skills to develop, and resources (YouTube links, courses, books).
    Return as JSON with structure: { title, phases: [{ milestone, duration, skills, resources: [{ type, name, link }] }] }`;

    console.log('Generating roadmap for:', branchName);
    const roadmapData = await generateRoadmapWithLLM(prompt);

    // Return the generated roadmap immediately without saving
    const roadmapResponse = {
      title: roadmapData.title || `${branchName} Roadmap`,
      phases: roadmapData.phases || [],
      branch: branchName,
      interests: Array.isArray(interests) ? interests : [interests],
      focus,
      generated: true
    };

    res.status(200).json(roadmapResponse);
  } catch (error) {
    console.error('Roadmap generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save roadmap
router.post('/save', authenticateToken, async (req, res) => {
  try {
    const { title, phases, branch, interests, focus } = req.body;

    console.log('Saving roadmap:', { title, branch, interests, focus, phasesCount: phases?.length });

    if (!title || !phases) {
      return res.status(400).json({ error: 'Title and phases are required' });
    }

    const roadmap = new Roadmap({
      userId: req.user.id,
      title,
      phases,
      branch,
      interests,
      focus,
    });

    await roadmap.save();

    // Add to user's saved roadmaps
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user.id, { $push: { savedRoadmaps: roadmap._id } });

    console.log('Roadmap saved successfully:', roadmap._id);
    res.status(201).json(roadmap);
  } catch (error) {
    console.error('Save roadmap error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user's roadmaps
router.get('/', authenticateToken, async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.user.id });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific roadmap
router.get('/:roadmapId', authenticateToken, async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.roadmapId);
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete roadmap
router.delete('/:roadmapId', authenticateToken, async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.roadmapId);
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Roadmap.findByIdAndDelete(req.params.roadmapId);

    // Remove from user's saved roadmaps
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user.id, { $pull: { savedRoadmaps: req.params.roadmapId } });

    res.json({ message: 'Roadmap deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
