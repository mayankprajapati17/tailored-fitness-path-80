
export type FitnessGoal = 'strength' | 'cardio' | 'endurance' | 'yoga' | 'flexibility' | 'balance';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type Equipment = 'none' | 'dumbbells' | 'resistance bands' | 'gym' | 'kettlebell';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface WorkoutFormData {
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  equipment: Equipment[];
  daysPerWeek: number;
  focusAreas: string[];
  duration: number; // workout duration in minutes
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  imageUrl?: string;
}

export interface WorkoutDay {
  day: DayOfWeek;
  exercises: Exercise[];
  completed: boolean;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  goal: FitnessGoal;
  level: ExperienceLevel;
  days: WorkoutDay[];
  createdAt: Date;
  completionPercentage: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'tip' | 'warning' | 'success' | 'error';
  read: boolean;
}
