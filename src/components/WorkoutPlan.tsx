
import { useState } from 'react';
import { WorkoutPlan as WorkoutPlanType, WorkoutDay, FitnessGoal } from '../types';
import WorkoutCard from './WorkoutCard';
import ProgressBar from './ProgressBar';
import { calculateCompletionPercentage } from '../utils/workoutGenerator';
import { Button } from '@/components/ui/button';
import { Share2, Edit, Trophy, DumbellIcon } from 'lucide-react';

interface WorkoutPlanProps {
  plan: WorkoutPlanType;
  onUpdate: (updatedPlan: WorkoutPlanType) => void;
}

// Define workout type header images
const workoutTypeHeaders: Record<FitnessGoal, string> = {
  strength: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
  cardio: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8',
  endurance: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  yoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
  flexibility: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
  balance: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e'
};

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
  
  // Handle marking an exercise as complete
  const handleExerciseComplete = () => {
    // This could be expanded to track individual exercise completion if needed
  };

  // Get the appropriate header image for the workout goal
  const headerImage = workoutTypeHeaders[plan.goal] || workoutTypeHeaders.strength;
  
  return (
    <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm animate-fade-in overflow-hidden">
      {/* Workout Type Header Image */}
      <div 
        className="relative h-48 w-full bg-cover bg-center" 
        style={{ backgroundImage: `url('${headerImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="text-white">
            <h2 className="text-2xl font-display font-medium">{plan.name}</h2>
            <p className="text-white/80">
              Created on {plan.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-full bg-primary/10">
              {plan.goal === 'strength' && <DumbellIcon className="w-5 h-5 text-primary" />}
              {plan.goal === 'cardio' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 7v10M18 12h-8m0-9.5v17" />
                </svg>
              )}
              {plan.goal === 'endurance' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19.52 13.842a10 10 0 1 0-15.043 0M22 12l-3 9h-5.5" />
                </svg>
              )}
              {(plan.goal === 'yoga' || plan.goal === 'flexibility' || plan.goal === 'balance') && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v3m0 9v10M14 2v6m0 6v8" />
                </svg>
              )}
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">{plan.goal.charAt(0).toUpperCase() + plan.goal.slice(1)}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm font-medium text-muted-foreground">{plan.level.charAt(0).toUpperCase() + plan.level.slice(1)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="max-w-md">
          <div className="flex items-center mb-1">
            <h3 className="text-sm font-medium">Progress</h3>
            {plan.completionPercentage === 100 && (
              <div className="ml-2 flex items-center text-amber-500">
                <Trophy className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Complete!</span>
              </div>
            )}
          </div>
          <ProgressBar value={plan.completionPercentage} showValue showMilestones />
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
          <h3 className="text-lg font-display font-medium mb-4">
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
