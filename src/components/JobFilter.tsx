
import React from 'react';
import { FilterOptions } from '../types';

interface JobFilterProps {
  filter: FilterOptions;
  onFilterChange: (filter: FilterOptions) => void;
}

const JobFilter: React.FC<JobFilterProps> = ({ filter, onFilterChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filter,
      status: e.target.value as FilterOptions['status']
    });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filter,
      sortBy: e.target.value as FilterOptions['sortBy']
    });
  };

  const handleSortDirectionChange = () => {
    onFilterChange({
      ...filter,
      sortDirection: filter.sortDirection === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div>
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status-filter"
          value={filter.status}
          onChange={handleStatusChange}
          className="p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          id="sort-by"
          value={filter.sortBy}
          onChange={handleSortByChange}
          className="p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="date">Date</option>
          <option value="company">Company</option>
          <option value="role">Role</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Order
        </label>
        <button
          onClick={handleSortDirectionChange}
          className="p-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          aria-label={`Sort ${filter.sortDirection === 'asc' ? 'ascending' : 'descending'}`}
        >
          {filter.sortDirection === 'asc' ? '↑ Ascending' : '↓ Descending'}
        </button>
      </div>
    </div>
  );
};

export default JobFilter;
