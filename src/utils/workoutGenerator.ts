
import { FitnessGoal, ExperienceLevel, Equipment, WorkoutFormData, WorkoutPlan, WorkoutDay, Exercise, DayOfWeek } from "../types";

// Mock exercise database
const exerciseDatabase: Record<FitnessGoal, Record<ExperienceLevel, Exercise[]>> = {
  strength: {
    beginner: [
      { 
        id: 'sb1', 
        name: 'Push-ups', 
        description: 'Place your hands shoulder-width apart and lower your body until your chest nearly touches the floor.',
        sets: 3, 
        reps: 10,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'sb2', 
        name: 'Bodyweight Squats', 
        description: 'Stand with feet shoulder-width apart, lower your body as if sitting in an invisible chair.',
        sets: 3, 
        reps: 15,
        imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'sb3', 
        name: 'Plank', 
        description: 'Hold a push-up position with your body in a straight line from head to heels.',
        sets: 3, 
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1566241142559-40a9552db917?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'sb4', 
        name: 'Lunges', 
        description: 'Step forward with one leg, lowering your hips until both knees are bent at 90 degrees.',
        sets: 3, 
        reps: 10,
        imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d8a9e40047?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'sb5', 
        name: 'Glute Bridges', 
        description: 'Lie on your back with knees bent, lift hips towards the ceiling.',
        sets: 3, 
        reps: 15,
        imageUrl: 'https://images.unsplash.com/photo-1517637382994-f02da38c6728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    intermediate: [
      { 
        id: 'si1', 
        name: 'Pull-ups', 
        description: 'Hang from a bar with palms facing away, pull your body up until chin is over the bar.',
        sets: 4, 
        reps: 8,
        imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'si2', 
        name: 'Dumbbell Bench Press', 
        description: 'Lie on a bench, holding dumbbells at chest level, press them upward.',
        sets: 4, 
        reps: 10,
        imageUrl: 'https://images.unsplash.com/photo-1584863231364-2edc166de576?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'si3', 
        name: 'Barbell Squats', 
        description: 'Place a barbell on your upper back, squat down until thighs are parallel to floor.',
        sets: 4, 
        reps: 12,
        imageUrl: 'https://images.unsplash.com/photo-1534368959876-26d6f0631696?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    advanced: [
      { 
        id: 'sa1', 
        name: 'Deadlifts', 
        description: 'With barbell in front, hinge at hips and bend knees to lower and grab bar, then stand up straight.',
        sets: 5, 
        reps: 5,
        imageUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'sa2', 
        name: 'Power Cleans', 
        description: 'Explosively lift barbell from floor to shoulders in one motion.',
        sets: 5, 
        reps: 3,
        imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ]
  },
  cardio: {
    beginner: [
      { 
        id: 'cb1', 
        name: 'Brisk Walking', 
        description: 'Walk at a pace that elevates your heart rate.',
        duration: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1538263703604-1c2fb9d5576f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'cb2', 
        name: 'Stationary Bike (Low Intensity)', 
        description: 'Cycle at a comfortable pace with low resistance.',
        duration: 900,
        imageUrl: 'https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    intermediate: [
      { 
        id: 'ci1', 
        name: 'Jogging', 
        description: 'Run at a moderate pace that allows you to maintain conversation.',
        duration: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'ci2', 
        name: 'Jump Rope', 
        description: 'Skip rope at a steady pace, alternating foot patterns.',
        sets: 3, 
        duration: 180,
        imageUrl: 'https://images.unsplash.com/photo-1559476613-e52819baa7b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    advanced: [
      { 
        id: 'ca1', 
        name: 'HIIT Sprints', 
        description: 'Alternate between 30 seconds of all-out sprinting and 30 seconds of rest.',
        sets: 10, 
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'ca2', 
        name: 'Rowing Machine Intervals', 
        description: 'Row hard for 1 minute, rest for 30 seconds.',
        sets: 8, 
        duration: 60,
        imageUrl: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ]
  },
  endurance: {
    beginner: [
      { 
        id: 'eb1', 
        name: 'Swimming (Slow Pace)', 
        description: 'Swim using any stroke at a comfortable pace.',
        duration: 900,
        imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'eb2', 
        name: 'Elliptical Trainer', 
        description: 'Use the elliptical at a steady pace with low resistance.',
        duration: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    intermediate: [
      { 
        id: 'ei1', 
        name: 'Distance Running', 
        description: 'Run at a comfortable pace for a longer duration.',
        duration: 2400,
        imageUrl: 'https://images.unsplash.com/photo-1543683532-5e19d4de09ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'ei2', 
        name: 'Cycling', 
        description: 'Bike outdoors or use a stationary bike at moderate resistance.',
        duration: 3000,
        imageUrl: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    advanced: [
      { 
        id: 'ea1', 
        name: 'Marathon Training', 
        description: 'Long-distance running with varying intensities and distances.',
        duration: 5400,
        imageUrl: 'https://images.unsplash.com/photo-1527056859620-31dae403762a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'ea2', 
        name: 'Triathlon Training', 
        description: 'Alternating between swimming, cycling, and running.',
        duration: 3600,
        imageUrl: 'https://images.unsplash.com/photo-1519311840873-5f7e9570f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ]
  },
  yoga: {
    beginner: [
      { 
        id: 'yb1', 
        name: 'Sun Salutation', 
        description: 'A flowing sequence of yoga poses.',
        sets: 3, 
        duration: 300,
        imageUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'yb2', 
        name: 'Child\'s Pose', 
        description: 'A resting pose that gently stretches the lower back.',
        duration: 120,
        imageUrl: 'https://images.unsplash.com/photo-1566838330756-b5a5f3594499?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    intermediate: [
      { 
        id: 'yi1', 
        name: 'Warrior Sequence', 
        description: 'A series of standing poses that build strength and stability.',
        sets: 2, 
        duration: 300,
        imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'yi2', 
        name: 'Crow Pose', 
        description: 'An arm balance where knees rest on the backs of your upper arms.',
        sets: 3, 
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    advanced: [
      { 
        id: 'ya1', 
        name: 'Handstand', 
        description: 'An inverted pose where the body is balanced on the hands.',
        sets: 5, 
        duration: 60,
        imageUrl: 'https://images.unsplash.com/photo-1566940700635-8440ef4f2233?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'ya2', 
        name: 'Ashtanga Primary Series', 
        description: 'A dynamic, flowing practice that synchronizes breath with movement.',
        duration: 5400,
        imageUrl: 'https://images.unsplash.com/photo-1532798442725-41036acc7489?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ]
  },
  flexibility: {
    beginner: [
      { 
        id: 'fb1', 
        name: 'Hamstring Stretch', 
        description: 'Sit with legs extended and reach for your toes.',
        sets: 3, 
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1581385339821-5b358673a883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'fb2', 
        name: 'Shoulder Stretch', 
        description: 'Bring one arm across your chest and use the other to hold it in place.',
        sets: 3, 
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1581385339878-fa6b936290e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    intermediate: [
      { 
        id: 'fi1', 
        name: 'Pigeon Pose', 
        description: 'A hip opener that also stretches your glutes.',
        sets: 2, 
        duration: 60,
        imageUrl: 'https://images.unsplash.com/photo-1575052814806-659ab5f62159?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'fi2', 
        name: 'Butterfly Stretch', 
        description: 'Sit with the soles of your feet together and knees dropped to the sides.',
        sets: 3, 
        duration: 45,
        imageUrl: 'https://images.unsplash.com/photo-1593164842264-990881aebcda?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    advanced: [
      { 
        id: 'fa1', 
        name: 'Full Split', 
        description: 'Extend both legs in opposite directions until they form a straight line.',
        sets: 3, 
        duration: 60,
        imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f21f984ae7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'fa2', 
        name: 'Backbend', 
        description: 'From standing, arch backward until hands touch the floor.',
        sets: 3, 
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ]
  },
  balance: {
    beginner: [
      { 
        id: 'bb1', 
        name: 'Single Leg Stand', 
        description: 'Stand on one leg with the other foot raised slightly off the ground.',
        sets: 2, 
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'bb2', 
        name: 'Heel-to-Toe Walk', 
        description: 'Walk in a straight line placing the heel of one foot directly in front of the toes of the other foot.',
        duration: 60,
        imageUrl: 'https://images.unsplash.com/photo-1590739293831-5f0e971dc92c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    intermediate: [
      { 
        id: 'bi1', 
        name: 'Tree Pose', 
        description: 'Stand on one leg with the sole of the other foot placed against the inner thigh.',
        sets: 3, 
        duration: 45,
        imageUrl: 'https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'bi2', 
        name: 'Standing Figure Four', 
        description: 'Balance on one leg while the other is bent with ankle resting on the standing leg\'s thigh.',
        sets: 3, 
        duration: 30,
        imageUrl: 'https://images.unsplash.com/flagged/photo-1563420577667-aaf15c8bfef6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    advanced: [
      { 
        id: 'ba1', 
        name: 'Dancer\'s Pose', 
        description: 'Standing on one leg, grab the other foot behind you and extend it upward while leaning forward.',
        sets: 3, 
        duration: 45,
        imageUrl: 'https://images.unsplash.com/photo-1513384312027-9fa69a360337?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: 'ba2', 
        name: 'One-Legged King Pigeon Pose', 
        description: 'From pigeon pose, bend the back leg and reach behind to grab the foot.',
        sets: 3, 
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ]
  }
};

// Workout tips based on goals
const workoutTips: Record<FitnessGoal, string[]> = {
  strength: [
    "Ensure proper form to prevent injuries and maximize effectiveness.",
    "Progressive overload is key - gradually increase weight or reps over time.",
    "Allow 48 hours of recovery for muscle groups between strength sessions.",
    "Protein intake is crucial for muscle repair and growth.",
    "Compound exercises give you more bang for your buck than isolation exercises."
  ],
  cardio: [
    "Warm up properly before intense cardio sessions.",
    "Mix high and low intensity cardio for optimal heart health.",
    "Stay hydrated during cardio workouts.",
    "Monitor your heart rate to ensure you're in the right zone for your goals.",
    "Consistency is more important than intensity for cardiovascular health."
  ],
  endurance: [
    "Build endurance gradually to avoid injury.",
    "Proper nutrition before long sessions is crucial for sustained energy.",
    "Cross-training can help improve overall endurance while reducing injury risk.",
    "Recovery is as important as training for endurance development.",
    "Proper breathing techniques can significantly improve endurance performance."
  ],
  yoga: [
    "Focus on your breath - it's the foundation of yoga practice.",
    "Don't compare your practice to others - yoga is a personal journey.",
    "Consistency matters more than duration - daily practice is beneficial.",
    "Props can help make poses more accessible and beneficial.",
    "Balance challenging poses with restorative practices for a complete practice."
  ],
  flexibility: [
    "Warm up before stretching to increase blood flow to muscles.",
    "Hold static stretches for 30 seconds to 2 minutes for best results.",
    "Breathe deeply while stretching to help muscles relax.",
    "Stretch regularly - ideally daily - for best improvements in flexibility.",
    "Avoid bouncing in stretches as it can cause micro-tears in muscles."
  ],
  balance: [
    "Practice balance exercises daily for consistent improvement.",
    "A strong core is essential for better balance.",
    "Focus your gaze on a fixed point during balance poses to help stabilize.",
    "Barefoot training can improve proprioception and balance.",
    "Progress gradually from stable to more unstable surfaces as your balance improves."
  ]
};

// Generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Get random items from an array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get days of the week
const getDaysOfWeek = (count: number): DayOfWeek[] => {
  const allDays: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return getRandomItems(allDays, count);
};

// Get a random tip based on fitness goal
export const getRandomTip = (goal: FitnessGoal): string => {
  const tips = workoutTips[goal];
  return tips[Math.floor(Math.random() * tips.length)];
};

// Generate a workout plan based on user preferences
export const generateWorkoutPlan = (formData: WorkoutFormData): WorkoutPlan => {
  const { fitnessGoal, experienceLevel, daysPerWeek } = formData;
  
  // Get exercises based on goal and experience level
  const availableExercises = exerciseDatabase[fitnessGoal][experienceLevel];
  
  // Get workout days
  const workoutDays = getDaysOfWeek(daysPerWeek);
  
  // Create workout plan
  const workoutPlan: WorkoutPlan = {
    id: generateId(),
    name: `${experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)} ${fitnessGoal.charAt(0).toUpperCase() + fitnessGoal.slice(1)} Plan`,
    goal: fitnessGoal,
    level: experienceLevel,
    days: workoutDays.map(day => {
      // Get random exercises for this day
      const exercises = getRandomItems(
        availableExercises, 
        Math.floor(Math.random() * 3) + 2 // 2-4 exercises per day
      );
      
      return {
        day,
        exercises,
        completed: false
      };
    }),
    createdAt: new Date(),
    completionPercentage: 0
  };
  
  return workoutPlan;
};

// Calculate completion percentage for a workout plan
export const calculateCompletionPercentage = (plan: WorkoutPlan): number => {
  if (plan.days.length === 0) return 0;
  
  const completedDays = plan.days.filter(day => day.completed).length;
  return Math.round((completedDays / plan.days.length) * 100);
};
