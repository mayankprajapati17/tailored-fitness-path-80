
export interface Job {
  _id: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  date: string;
  link?: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'tip';
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type FitnessGoal = 'strength' | 'cardio' | 'endurance' | 'yoga' | 'flexibility' | 'balance';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type Equipment = 'none' | 'dumbbells' | 'resistance bands' | 'kettlebell' | 'gym';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets?: number;
  reps?: number;
  duration?: number;
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

export interface WorkoutFormData {
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  equipment: Equipment[];
  daysPerWeek: number;
  focusAreas: string[];
  duration: number;
}
