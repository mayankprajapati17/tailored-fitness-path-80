
import { useState } from "react";
import JobForm from "@/components/JobForm";
import JobList from "@/components/JobList";
import JobFilter from "@/components/JobFilter";
import { FilterOptions } from "@/types";
import Navbar from "@/components/Navbar";

const Jobs = () => {
  const [filter, setFilter] = useState<FilterOptions>({
    status: "All",
    sortBy: "date",
    sortDirection: "desc",
  });
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleJobAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Job Applications</h2>
                <JobForm 
                  onSubmit={() => {}} 
                  onJobAdded={handleJobAdded} 
                />
              </div>
              <JobFilter filter={filter} onFilterChange={setFilter} />
            </div>
            
            <JobList 
              filter={filter} 
              refreshTrigger={refreshTrigger}
              isLoading={false}
              jobs={[]}
              onStatusChange={() => {}}
              onDelete={() => {}}
            />
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Keep track of all your job applications in one place.
              <br />
              Good luck with your job search!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
