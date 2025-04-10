
import React, { useState } from 'react';
import { Job } from '../types';

interface JobFormProps {
  onSubmit: (job: Omit<Job, '_id'>) => void;
  onJobAdded?: () => void; // Add this prop
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit, onJobAdded }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied' as Job['status'],
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    link: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!formData.company.trim() || !formData.role.trim()) {
      alert('Company and Role are required fields');
      return;
    }
    
    onSubmit(formData);
    
    // Call the onJobAdded callback if provided
    if (onJobAdded) {
      onJobAdded();
    }
    
    // Reset form
    setFormData({
      company: '',
      role: '',
      status: 'Applied',
      date: new Date().toISOString().split('T')[0],
      link: '',
    });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. Google"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. Frontend Developer"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Application</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://company.com/job"
        />
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
      >
        Add Application
      </button>
    </div>
  );
};

export default JobForm;
