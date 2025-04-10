
/**
 * Job Routes
 * Defines the API endpoints for CRUD operations on job applications
 */
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

/**
 * GET /api/jobs
 * Retrieve all job applications
 */
router.get('/', async (req, res, next) => {
  try {
    // Get all jobs, sorted by date (newest first)
    const jobs = await Job.find().sort({ date: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/jobs
 * Create a new job application
 */
router.post('/', async (req, res, next) => {
  try {
    // Create a new job with request body
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation Error', 
        message: error.message,
        details: error.errors
      });
    }
    next(error);
  }
});

/**
 * PUT /api/jobs/:id
 * Update a job application
 */
router.put('/:id', async (req, res, next) => {
  try {
    // Find and update the job by ID
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    // If job doesn't exist, return 404
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(updatedJob);
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation Error', 
        message: error.message,
        details: error.errors
      });
    }
    
    next(error);
  }
});

/**
 * DELETE /api/jobs/:id
 * Delete a job application
 */
router.delete('/:id', async (req, res, next) => {
  try {
    // Find and delete the job by ID
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    
    // If job doesn't exist, return 404
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    
    next(error);
  }
});

module.exports = router;
