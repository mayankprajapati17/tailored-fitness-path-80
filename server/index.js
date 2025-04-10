
/**
 * Student Job Tracker - Backend API
 * This file sets up an Express server with MongoDB/Mongoose
 * to provide a RESTful API for managing job applications.
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/jobs');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Student Job Tracker API',
    status: 'online',
    endpoints: [
      { method: 'GET', path: '/api/jobs', description: 'Get all job applications' },
      { method: 'POST', path: '/api/jobs', description: 'Create a new job application' },
      { method: 'PUT', path: '/api/jobs/:id', description: 'Update a job application' },
      { method: 'DELETE', path: '/api/jobs/:id', description: 'Delete a job application' }
    ]
  });
});

// Routes
app.use('/api/jobs', jobRoutes);

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
