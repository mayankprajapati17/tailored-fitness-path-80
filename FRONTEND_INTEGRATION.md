
# Frontend Integration Guide

This guide explains how to integrate your React frontend with the newly deployed backend API for the Student Job Tracker application.

## 1. Environment Configuration

Create or update your environment variables in the frontend project:

1. Create a `.env` file in your frontend project root
2. Add your backend API URL:
```
VITE_API_URL=https://your-backend-url.render.com/api
```
3. For local development, you can use:
```
VITE_API_URL=http://localhost:3001/api
```

## 2. API Integration

Update your frontend API calls to use the environment variable. Here's an example:

```javascript
// Create a utility file for API calls (e.g., src/utils/api.js)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const fetchJobs = async () => {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create job');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const updateJob = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update job');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete job');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};
```

## 3. Using the API in Components

Update your components to use these API functions. For example, in your `Jobs` component:

```jsx
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import JobFilter from '../components/JobFilter';
import { fetchJobs, createJob, updateJob, deleteJob } from '../utils/api';
import { Job, FilterOptions } from '../types';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterOptions>({
    status: "All",
    sortBy: "date",
    sortDirection: "desc",
  });
  
  // Fetch jobs on component mount
  useEffect(() => {
    loadJobs();
  }, []);
  
  const loadJobs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      toast.error('Failed to load job applications');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add new job application
  const handleAddJob = async (jobData) => {
    try {
      const newJob = await createJob(jobData);
      setJobs(prevJobs => [...prevJobs, newJob]);
      toast.success('Job application added successfully!');
    } catch (error) {
      toast.error('Failed to add job application');
    }
  };
  
  // Update job status
  const handleStatusChange = async (id, status) => {
    try {
      const updatedJob = await updateJob(id, { status });
      setJobs(prevJobs => 
        prevJobs.map(job => job._id === id ? updatedJob : job)
      );
      toast.success('Job status updated!');
    } catch (error) {
      toast.error('Failed to update job status');
    }
  };
  
  // Delete job application
  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
      toast.success('Job application deleted');
    } catch (error) {
      toast.error('Failed to delete job application');
    }
  };
  
  // Filter and sort jobs
  const filteredJobs = jobs
    .filter(job => filter.status === 'All' || job.status === filter.status)
    .sort((a, b) => {
      const aValue = filter.sortBy === 'date' ? new Date(a.date).getTime() : a[filter.sortBy];
      const bValue = filter.sortBy === 'date' ? new Date(b.date).getTime() : b[filter.sortBy];
      
      if (filter.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your existing UI components */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Job Applications</h2>
                <JobForm 
                  onSubmit={handleAddJob} 
                />
              </div>
              <JobFilter filter={filter} onFilterChange={setFilter} />
            </div>
            
            <JobList 
              jobs={filteredJobs}
              isLoading={isLoading}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
```

## 4. Update TypeScript Types (if applicable)

Make sure your TypeScript types match the API response structure:

```typescript
// src/types/index.ts

export interface Job {
  _id: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  date: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FilterOptions {
  status: 'All' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  sortBy: 'date' | 'company' | 'role';
  sortDirection: 'asc' | 'desc';
}
```

## 5. Vercel Environment Variables

When deploying to Vercel, configure environment variables:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add `VITE_API_URL` with your backend API URL
5. Redeploy your application for changes to take effect

## 6. Testing

After integration:

1. Test adding a new job application
2. Test fetching all job applications
3. Test updating a job application's status
4. Test deleting a job application
5. Check that filtering and sorting works with the backend data

If you encounter CORS issues, make sure your backend has the correct CORS configuration to allow requests from your frontend origin.
