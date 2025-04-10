
import React from 'react';
import JobCard from './JobCard';
import { Job } from '../types';

interface JobListProps {
  jobs: Job[];
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, onStatusChange, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No job applications found. Add your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="hidden md:grid md:grid-cols-12 gap-4 bg-gray-100 p-3 rounded-lg font-medium text-gray-600">
        <div className="md:col-span-3">Company</div>
        <div className="md:col-span-3">Role</div>
        <div className="md:col-span-2">Status</div>
        <div className="md:col-span-2">Date</div>
        <div className="md:col-span-2">Actions</div>
      </div>

      <div className="space-y-3">
        {jobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
