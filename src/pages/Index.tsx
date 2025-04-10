
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import { Job } from '../types';

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/jobs`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job applications');
    } finally {
      setIsLoading(false);
    }
  };

  const addJob = async (job: Omit<Job, '_id'>) => {
    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        throw new Error('Failed to add job');
      }

      const newJob = await response.json();
      setJobs(prevJobs => [...prevJobs, newJob]);
      toast.success('Job application added successfully!');
    } catch (error) {
      console.error('Error adding job:', error);
      toast.error('Failed to add job application');
    }
  };

  const updateJobStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job status');
      }

      const updatedJob = await response.json();
      setJobs(prevJobs => 
        prevJobs.map(job => job._id === id ? updatedJob : job)
      );
      toast.success('Job status updated!');
    } catch (error) {
      console.error('Error updating job status:', error);
      toast.error('Failed to update job status');
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
      toast.success('Job application deleted');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job application');
    }
  };

  const filteredJobs = jobs
    .filter(job => statusFilter === 'all' || job.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center">Student Job Tracker</h1>
          <p className="text-center mt-2 text-blue-100">Keep track of your job applications in one place</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Add New Application</h2>
              <JobForm onSubmit={addJob} />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-semibold">Your Applications</h2>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>
              
              <JobList 
                jobs={filteredJobs}
                onStatusChange={updateJobStatus}
                onDelete={deleteJob}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>Student Job Tracker &copy; {new Date().getFullYear()}</p>
          <p className="text-sm text-gray-400 mt-1">
            Keep organized in your job search
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
