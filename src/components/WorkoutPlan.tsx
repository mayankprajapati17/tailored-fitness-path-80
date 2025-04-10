
import { useState } from 'react';
import { WorkoutPlan as WorkoutPlanType, WorkoutDay, Exercise } from '../types';
import WorkoutCard from './WorkoutCard';
import ProgressBar from './ProgressBar';
import { calculateCompletionPercentage } from '../utils/workoutGenerator';

interface WorkoutPlanProps {
  plan: WorkoutPlanType;
  onUpdate: (updatedPlan: WorkoutPlanType) => void;
}

const WorkoutPlan = ({ plan, onUpdate }: WorkoutPlanProps) => {
  const [selectedDay, setSelectedDay] = useState<WorkoutDay>(plan.days[0]);
  
  // Handle marking a day as complete
  const handleDayCompletion = (day: WorkoutDay) => {
    const updatedDays = plan.days.map(d => 
      d.day === day.day ? { ...d, completed: !d.completed } : d
    );
    
    const updatedPlan = {
      ...plan,
      days: updatedDays,
      completionPercentage: calculateCompletionPercentage({ ...plan, days: updatedDays })
    };
    
    onUpdate(updatedPlan);
  };
  
  // Handle marking an exercise as complete (currently just visual, doesn't affect day completion)
  const handleExerciseComplete = () => {
    // This could be expanded to track individual exercise completion if needed
  };
  
  return (
    <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm animate-fade-in overflow-hidden">
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-medium">{plan.name}</h2>
            <p className="text-sm text-muted-foreground">
              Created on {plan.createdAt.toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="glass-button">
              Edit
            </button>
            <button className="glass-button">
              Share
            </button>
          </div>
        </div>
        
        <div className="max-w-md">
          <ProgressBar value={plan.completionPercentage} showValue />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Day selection sidebar */}
        <div className="w-full md:w-64 border-r border-border">
          <div className="p-3">
            <ul>
              {plan.days.map(day => (
                <li key={day.day} className="mb-1 last:mb-0">
                  <button
                    onClick={() => setSelectedDay(day)}
                    className={`flex justify-between items-center w-full px-4 py-3 rounded-lg text-left transition-colors ${
                      selectedDay.day === day.day
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary'
                    }`}
                  >
                    <span className="font-medium">{day.day}</span>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">{day.exercises.length} exercises</span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDayCompletion(day);
                        }}
                        className={`flex items-center justify-center h-5 w-5 rounded-full border ${
                          day.completed 
                            ? 'bg-green-500 border-green-600 text-white' 
                            : 'border-current'
                        }`}
                      >
                        {day.completed && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        <span className="sr-only">{day.completed ? 'Mark as incomplete' : 'Mark as complete'}</span>
                      </button>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Exercise list */}
        <div className="flex-1 p-6">
          <h3 className="text-lg font-medium mb-4">
            {selectedDay.day}'s Exercises
            {selectedDay.completed && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 ml-2">
                Completed
              </span>
            )}
          </h3>
          
          {selectedDay.exercises.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedDay.exercises.map((exercise, index) => (
                <WorkoutCard
                  key={exercise.id}
                  exercise={exercise}
                  onComplete={handleExerciseComplete}
                  isLast={index === selectedDay.exercises.length - 1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No exercises for this day</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;
