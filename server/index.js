
/**
 * Student Job Tracker - Backend API
 * This file sets up an Express server with MongoDB/Mongoose
 * to provide a RESTful API for managing job applications.
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jobRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend-url.com' : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Student Job Tracker API',
    status: 'online',
    endpoints: [
      { method: 'GET', path: '/api/jobs', description: 'Get all job applications' },
      { method: 'POST', path: '/api/jobs', description: 'Create a new job application' },
      { method: 'PUT', path: '/api/jobs/:id', description: 'Update a job application' },
      { method: 'DELETE', path: '/api/jobs/:id', description: 'Delete a job application' },
      { method: 'POST', path: '/api/auth/register', description: 'Register a new user' },
      { method: 'POST', path: '/api/auth/login', description: 'Login a user' },
      { method: 'GET', path: '/api/auth/me', description: 'Get user profile (requires auth)' }
    ]
  });
});

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-tracker';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Server error', 
    message: err.message || 'Something went wrong on the server'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api/jobs`);
});
