
import { useState } from 'react';
import { Exercise } from '../types';

interface WorkoutCardProps {
  exercise: Exercise;
  onComplete?: () => void;
  completed?: boolean;
  isLast?: boolean;
}

const WorkoutCard = ({ exercise, onComplete, completed = false, isLast = false }: WorkoutCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleComplete = () => {
    setIsCompleted(!isCompleted);
    onComplete?.();
  };
  
  // Format duration from seconds to minutes if needed
  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    
    if (seconds < 60) {
      return `${seconds} sec`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      
      if (remainingSeconds === 0) {
        return `${minutes} min`;
      } else {
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} min`;
      }
    }
  };

  return (
    <div 
      className={`workout-card ${isFlipped ? 'bg-secondary/80' : ''} ${
        isCompleted ? 'border-green-300 dark:border-green-800' : ''
      }`}
    >
      <div className="relative h-full">
        {/* Front of card */}
        <div 
          className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex-1">
            {exercise.imageUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
                <img 
                  src={exercise.imageUrl} 
                  alt={exercise.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            )}
            
            <h3 className="text-lg font-medium mb-1">{exercise.name}</h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {exercise.sets && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {exercise.sets} sets
                </span>
              )}
              
              {exercise.reps && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {exercise.reps} reps
                </span>
              )}
              
              {exercise.duration && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {formatDuration(exercise.duration)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-auto pt-2">
            <button
              onClick={handleFlip}
              className="text-sm text-primary font-medium hover:underline"
            >
              View details
            </button>
            
            <button
              onClick={handleComplete}
              className={`flex items-center justify-center h-6 w-6 rounded-full border ${
                isCompleted 
                  ? 'bg-green-500 border-green-600 text-white' 
                  : 'border-input hover:bg-secondary transition-colors'
              }`}
            >
              {isCompleted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span className="sr-only">{isCompleted ? 'Mark as incomplete' : 'Mark as complete'}</span>
            </button>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-3">{exercise.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {exercise.description}
            </p>
            
            <div className="flex flex-col space-y-2 mb-3">
              {exercise.sets && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sets:</span>
                  <span className="font-medium">{exercise.sets}</span>
                </div>
              )}
              
              {exercise.reps && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">Reps:</span>
                  <span className="font-medium">{exercise.reps}</span>
                </div>
              )}
              
              {exercise.duration && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">Duration:</span>
                  <span className="font-medium">{formatDuration(exercise.duration)}</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleFlip}
            className="mt-auto w-full py-2 text-sm text-primary font-medium hover:underline text-center"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
