import { 
  Exercise, 
  FitnessGoal, 
  ExperienceLevel, 
  Equipment,
  WorkoutFormData, 
  WorkoutPlan, 
  DayOfWeek
} from '../types';

// Exercise database with exercise data and images
const exerciseDatabase: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    description: 'A classic bodyweight exercise that targets your chest, shoulders, and triceps.',
    sets: 3,
    reps: 10,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
  },
  {
    id: '2',
    name: 'Squats',
    description: 'A compound exercise that primarily targets your quadriceps, hamstrings, and glutes.',
    sets: 3,
    reps: 15,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798'
  },
  {
    id: '3',
    name: 'Planks',
    description: 'An isometric core exercise that improves your stability and strengthens your abdomen.',
    duration: 30,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1'
  },
  {
    id: '4',
    name: 'Burpees',
    description: 'A full-body exercise that combines a squat, push-up, and jump, great for cardio.',
    sets: 3,
    reps: 10,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1593164842264-854604db2260'
  },
  {
    id: '5',
    name: 'Lunges',
    description: 'A unilateral exercise that works your quadriceps, hamstrings, and glutes.',
    sets: 3,
    reps: 12,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb'
  },
  {
    id: '6',
    name: 'Mountain Climbers',
    description: 'A dynamic core exercise that also elevates your heart rate for cardio benefits.',
    duration: 45,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5'
  },
  {
    id: '7',
    name: 'Dumbbell Rows',
    description: 'A back exercise that targets your lats, rhomboids, and biceps.',
    sets: 3,
    reps: 12,
    equipment: 'dumbbells',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61'
  },
  {
    id: '8',
    name: 'Jump Rope',
    description: 'A cardiovascular exercise that improves coordination and burns calories.',
    duration: 60,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7'
  },
  {
    id: '9',
    name: 'Bicycle Crunches',
    description: 'A core exercise that targets your obliques and rectus abdominis.',
    sets: 3,
    reps: 20,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a'
  },
  {
    id: '10',
    name: 'Kettlebell Swings',
    description: 'A dynamic exercise that targets your posterior chain and provides cardiovascular benefits.',
    sets: 3,
    reps: 15,
    equipment: 'kettlebell',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438'
  },
  {
    id: '11',
    name: 'Yoga Downward Dog',
    description: 'A yoga pose that stretches the hamstrings, calves, and shoulders.',
    duration: 45,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'
  },
  {
    id: '12',
    name: 'Yoga Warrior Pose',
    description: 'A standing yoga pose that builds strength and improves focus.',
    duration: 30,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
  },
  {
    id: '13',
    name: 'Jogging',
    description: 'A cardiovascular exercise that improves endurance and burns calories.',
    duration: 600,
    equipment: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8'
  },
  {
    id: '14',
    name: 'Deadlifts',
    description: 'A compound exercise that targets your posterior chain, especially your back and hamstrings.',
    sets: 3,
    reps: 8,
    equipment: 'gym',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'
  },
  {
    id: '15',
    name: 'Bench Press',
    description: 'A compound exercise that targets your chest, shoulders, and triceps.',
    sets: 3,
    reps: 8,
    equipment: 'gym',
    imageUrl: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50'
  }
];

// Filter exercises based on fitness goal and available equipment
const filterExercises = (goal: FitnessGoal, equipment: Equipment[]): Exercise[] => {
  // First filter by goal
  let filteredByGoal: Exercise[];
  switch (goal) {
    case 'strength':
      filteredByGoal = exerciseDatabase.filter(e => ['1', '2', '5', '7', '10', '14', '15'].includes(e.id));
      break;
    case 'cardio':
      filteredByGoal = exerciseDatabase.filter(e => ['4', '6', '8', '13'].includes(e.id));
      break;
    case 'endurance':
      filteredByGoal = exerciseDatabase.filter(e => ['1', '2', '4', '8', '13'].includes(e.id));
      break;
    case 'yoga':
      filteredByGoal = exerciseDatabase.filter(e => ['3', '11', '12'].includes(e.id));
      break;
    case 'flexibility':
      filteredByGoal = exerciseDatabase.filter(e => ['5', '11', '12'].includes(e.id));
      break;
    case 'balance':
      filteredByGoal = exerciseDatabase.filter(e => ['3', '5', '11', '12'].includes(e.id));
      break;
    default:
      filteredByGoal = exerciseDatabase;
  }
  
  // Then filter by equipment if equipment array is not empty
  if (equipment && equipment.length > 0) {
    // If 'none' is selected, include bodyweight exercises
    const includeBodyweight = equipment.includes('none');
    
    // If equipment other than 'none' is selected, include those exercises
    return filteredByGoal.filter(exercise => 
      includeBodyweight && exercise.equipment === 'none' || 
      (exercise.equipment !== 'none' && equipment.includes(exercise.equipment as Equipment))
    );
  }
  
  return filteredByGoal;
};

// Adjust exercise difficulty based on experience level
const adjustForExperience = (exercises: Exercise[], level: ExperienceLevel): Exercise[] => {
  return exercises.map(exercise => {
    const adjusted = { ...exercise };
    
    // Adjust reps/sets/duration based on experience level
    if (level === 'beginner') {
      if (adjusted.sets) adjusted.sets = Math.max(2, adjusted.sets - 1);
      if (adjusted.reps) adjusted.reps = Math.max(6, adjusted.reps - 4);
      if (adjusted.duration) adjusted.duration = Math.max(20, adjusted.duration * 0.7);
    } else if (level === 'advanced') {
      if (adjusted.sets) adjusted.sets += 1;
      if (adjusted.reps) adjusted.reps += 4;
      if (adjusted.duration) adjusted.duration = adjusted.duration * 1.3;
    }
    
    return adjusted;
  });
};

// Generate a workout plan based on user input
export const generateWorkoutPlan = (formData: WorkoutFormData): WorkoutPlan => {
  const {
    fitnessGoal,
    experienceLevel,
    equipment,
    daysPerWeek,
    focusAreas,
    duration
  } = formData;
  
  // Filter exercises based on goal and equipment
  let availableExercises = filterExercises(fitnessGoal, equipment);
  
  // Adjust exercises for experience level
  availableExercises = adjustForExperience(availableExercises, experienceLevel);
  
  // Determine workout days
  const allDays: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const workoutDays = allDays.slice(0, daysPerWeek);
  
  // Create workout days with exercises
  const days = workoutDays.map(day => {
    // Randomly select 3-5 exercises for each day
    const numberOfExercises = Math.floor(Math.random() * 3) + 3;
    const shuffled = [...availableExercises].sort(() => 0.5 - Math.random());
    const exercises = shuffled.slice(0, numberOfExercises);
    
    return {
      day,
      exercises,
      completed: false
    };
  });
  
  // Generate plan name based on goal and level
  const planName = `${experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)} ${fitnessGoal.charAt(0).toUpperCase() + fitnessGoal.slice(1)} Plan`;
  
  return {
    id: `plan_${Date.now()}`,
    name: planName,
    goal: fitnessGoal,
    level: experienceLevel,
    days,
    createdAt: new Date(),
    completionPercentage: 0
  };
};

// Calculate completion percentage for a workout plan
export const calculateCompletionPercentage = (plan: WorkoutPlan): number => {
  const totalDays = plan.days.length;
  const completedDays = plan.days.filter(day => day.completed).length;
  
  return Math.round((completedDays / totalDays) * 100);
};

// Get a random tip based on the fitness goal
export const getRandomTip = (goal: FitnessGoal): string => {
  const generalTips = [
    "Remember to stay hydrated throughout your workout.",
    "Proper form is more important than the amount of weight lifted.",
    "Make sure to warm up before and cool down after each workout.",
    "Rest days are essential for muscle recovery and growth.",
    "Consistency is key to seeing results in your fitness journey."
  ];
  
  const goalSpecificTips: Record<FitnessGoal, string[]> = {
    strength: [
      "Progressive overload is essential for building strength - gradually increase weight or reps.",
      "Compound exercises like squats and deadlifts give you the most bang for your buck.",
      "Aim for 1-2 minutes of rest between strength training sets.",
      "Protein intake is crucial for muscle repair and growth."
    ],
    cardio: [
      "Mix high-intensity intervals with steady-state cardio for optimal heart health.",
      "Find cardio activities you enjoy to stay motivated.",
      "Morning cardio on an empty stomach can help with fat burning.",
      "Track your heart rate to ensure you're working in the right zone."
    ],
    endurance: [
      "Gradually increase duration before intensity for endurance training.",
      "Proper breathing techniques can improve your endurance performance.",
      "Carbohydrates are your primary fuel source for endurance activities.",
      "Cross-training can help prevent overuse injuries in endurance athletes."
    ],
    yoga: [
      "Focus on your breath - it's the foundation of yoga practice.",
      "Don't compare your practice to others - yoga is a personal journey.",
      "Consistency matters more than duration in yoga practice.",
      "Use props like blocks and straps to help you achieve proper alignment."
    ],
    flexibility: [
      "Hold static stretches for 20-30 seconds to effectively improve flexibility.",
      "Warm muscles stretch more effectively than cold ones.",
      "Dynamic stretching is best before workouts, static stretching after.",
      "Stretching should never cause pain - ease into positions gradually."
    ],
    balance: [
      "Try practicing balance exercises barefoot to strengthen foot muscles.",
      "Focus your gaze on a fixed point to help maintain balance.",
      "Core strength is fundamental to good balance.",
      "Challenge yourself with unstable surfaces as your balance improves."
    ]
  };
  
  // Select from both general tips and goal-specific tips
  const allTips = [...generalTips, ...goalSpecificTips[goal]];
  const randomIndex = Math.floor(Math.random() * allTips.length);
  
  return allTips[randomIndex];
};
