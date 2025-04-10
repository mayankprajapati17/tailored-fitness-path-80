
import React from 'react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onStatusChange, onDelete }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interview':
        return 'bg-blue-100 text-blue-800';
      case 'Offer':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="md:hidden space-y-2 mb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{job.company}</h3>
            <p className="text-gray-600">{job.role}</p>
          </div>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
            {job.status}
          </span>
        </div>
        <p className="text-sm text-gray-500">Applied on {formatDate(job.date)}</p>
        
        {job.link && (
          <a 
            href={job.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline block truncate"
          >
            {job.link}
          </a>
        )}
        
        <div className="flex space-x-2 mt-2">
          <select
            value={job.status}
            onChange={(e) => onStatusChange(job._id, e.target.value)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <button
            onClick={() => onDelete(job._id)}
            className="text-sm bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-3">
          <h3 className="font-medium truncate" title={job.company}>{job.company}</h3>
        </div>
        
        <div className="md:col-span-3">
          <p className="truncate" title={job.role}>{job.role}</p>
          {job.link && (
            <a 
              href={job.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline block truncate"
            >
              View Job
            </a>
          )}
        </div>
        
        <div className="md:col-span-2">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
            {job.status}
          </span>
        </div>
        
        <div className="md:col-span-2">
          <p className="text-sm text-gray-600">{formatDate(job.date)}</p>
        </div>
        
        <div className="md:col-span-2 flex items-center space-x-2">
          <select
            value={job.status}
            onChange={(e) => onStatusChange(job._id, e.target.value)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <button
            onClick={() => onDelete(job._id)}
            className="text-red-600 hover:text-red-800"
            title="Delete application"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
