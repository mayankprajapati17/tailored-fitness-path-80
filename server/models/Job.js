
/**
 * Job Model
 * Defines the Mongoose schema and model for job applications
 */
const mongoose = require('mongoose');

// Define the schema with validation
const jobSchema = new mongoose.Schema({
  company: { 
    type: String, 
    required: [true, 'Company name is required'],
    trim: true
  },
  role: { 
    type: String, 
    required: [true, 'Job role is required'],
    trim: true
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['Applied', 'Interview', 'Offer', 'Rejected'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Applied'
  },
  date: { 
    type: Date, 
    required: [true, 'Application date is required'],
    default: Date.now
  },
  link: { 
    type: String,
    trim: true
  }
}, { 
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
