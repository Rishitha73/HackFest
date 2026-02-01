const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Mock users for testing when DB is down
const mockUsers = [
  {
    id: 'user1',
    email: 'student@example.com',
    password: 'password123',
    role: 'pre-university',
    branch: null
  },
  {
    id: 'user2',
    email: 'engineer@example.com',
    password: 'password123',
    role: 'undergraduate',
    branch: 'Computer Science and Engineering'
  }
];

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, branch } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (role === 'undergraduate' && !branch) {
      return res.status(400).json({ error: 'Branch required for undergraduate' });
    }

    // Try database first
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = new User({ email, password, role, branch });
      await user.save();

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (dbError) {
      // Fallback: Check if email already exists in mock users
      const existingMockUser = mockUsers.find(u => u.email === email);
      if (existingMockUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create mock user
      const mockUser = {
        id: 'mock_' + Date.now(),
        email,
        password,
        role,
        branch
      };

      const token = jwt.sign(
        { id: mockUser.id, email: mockUser.email, role: mockUser.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return res.status(201).json({ 
        token, 
        user: { id: mockUser.id, email: mockUser.email, role: mockUser.role },
        note: 'Using mock authentication (Database unavailable)'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Try database first
    try {
      const user = await User.findOne({ email });
      if (!user) {
        // Check mock users
        const mockUser = mockUsers.find(u => u.email === email);
        console.log('Mock user found:', mockUser ? 'yes' : 'no');
        if (!mockUser || mockUser.password !== password) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
          { id: mockUser.id, email: mockUser.email, role: mockUser.role },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '7d' }
        );

        return res.json({ 
          token, 
          user: { id: mockUser.id, email: mockUser.email, role: mockUser.role, branch: mockUser.branch },
          note: 'Using mock authentication (Database unavailable)'
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return res.json({ token, user: { id: user._id, email: user.email, role: user.role, branch: user.branch } });
    } catch (dbError) {
      console.log('Database unavailable, checking mock users...', dbError.message);
      
      // Fallback to mock users
      const mockUser = mockUsers.find(u => u.email === email);
      console.log('Mock user found (fallback):', mockUser ? 'yes' : 'no');
      if (!mockUser || mockUser.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: mockUser.id, email: mockUser.email, role: mockUser.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return res.json({ 
        token, 
        user: { id: mockUser.id, email: mockUser.email, role: mockUser.role, branch: mockUser.branch },
        note: 'Using mock authentication (Database unavailable)'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
