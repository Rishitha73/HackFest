const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const degreeRoutes = require('./routes/degrees');
const courseRoutes = require('./routes/courses');
const roadmapRoutes = require('./routes/roadmaps');
const profileRoutes = require('./routes/profile');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/academic-roadmap', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log('✓ MongoDB connected successfully');
    console.log(`Connected to: ${conn.connection.name}`);
    return true;
  } catch (err) {
    console.error('✗ MongoDB connection failed:', err.message);
    console.log('⚠ Backend will still run - API endpoints are available');
    console.log('⚠ Check MongoDB Atlas IP whitelist: https://cloud.mongodb.com/');
    return false;
  }
};

let dbConnected = false;

// Initialize DB connection
connectDB().then(connected => {
  dbConnected = connected;
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/degrees', degreeRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/roadmaps', roadmapRoutes);
app.use('/api/v1/profile', profileRoutes);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    database: dbConnected ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: {
      auth: ['/api/v1/auth/register', '/api/v1/auth/login'],
      degrees: ['/api/v1/degrees', '/api/v1/degrees/:degreeId/branches', '/api/v1/degrees/branch/:branchId'],
      courses: ['/api/v1/courses', '/api/v1/courses/:courseId'],
      roadmaps: ['/api/v1/roadmaps', '/api/v1/roadmaps/:roadmapId'],
      profile: ['/api/v1/profile', '/api/v1/profile (PUT)']
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Frontend should connect to: http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/api/v1/health`);
  console.log(`${'='.repeat(50)}\n`);
});
