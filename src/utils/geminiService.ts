
import { GoogleGenerativeAI } from "@google/generative-ai";
import { WorkoutFormData, WorkoutPlan, Exercise, DayOfWeek } from '../types';
import { generateWorkoutPlan as generateMockWorkoutPlan } from './workoutGenerator';

// Initialize the Google Generative AI with the API key
// Note: In production, this should come from environment variables
const GEMINI_API_KEY = "AIzaSyBtcu2LlCb8IdUG9LTnti6PRcw5TvIp3xA";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Define the model to use
const MODEL_NAME = "gemini-1.5-flash";

/**
 * Generate a workout plan using Google's Gemini API
 */
export const generateWorkoutPlanWithGemini = async (formData: WorkoutFormData): Promise<WorkoutPlan> => {
  try {
    // Access the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Format the prompt based on the form data
    const prompt = formatWorkoutPrompt(formData);

    // Call the Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the response as JSON
    try {
      // Extract JSON from the response text
      const jsonStartIndex = text.indexOf('{');
      const jsonEndIndex = text.lastIndexOf('}') + 1;
      const jsonStr = text.substring(jsonStartIndex, jsonEndIndex);
      
      const parsedResponse = JSON.parse(jsonStr);
      
      // Map the API response to our WorkoutPlan type
      return mapToWorkoutPlan(parsedResponse, formData);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError);
      // Fall back to mock plan if we can't parse the response
      return generateMockWorkoutPlan(formData);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fall back to mock plan if the API call fails
    return generateMockWorkoutPlan(formData);
  }
};

/**
 * Format the workout prompt based on the form data
 */
const formatWorkoutPrompt = (formData: WorkoutFormData): string => {
  const {
    fitnessGoal,
    experienceLevel,
    equipment,
    daysPerWeek,
    focusAreas,
    duration
  } = formData;

  // Convert arrays to comma-separated strings
  const equipmentStr = equipment.join(', ');
  const focusAreasStr = focusAreas.length > 0 ? focusAreas.join(', ') : 'full body';

  return `
Generate a detailed ${daysPerWeek}-day workout plan for a ${experienceLevel} level person focusing on ${fitnessGoal} with the following equipment: ${equipmentStr}.
The person wants to focus on these areas: ${focusAreasStr}.
Each workout should last approximately ${duration} minutes.

For each exercise, provide:
1. A descriptive name
2. A brief explanation of how to perform it
3. Number of sets and reps (or duration in seconds for timed exercises)
4. Required equipment (or specify "bodyweight" if none needed)
5. Which body part it targets

Be specific and provide exercises that are appropriate for the ${experienceLevel} level and will help achieve the ${fitnessGoal} goal.

Return ONLY a JSON object with the following structure:
{
  "name": "A descriptive name for the plan",
  "days": [
    {
      "day": "Monday",
      "exercises": [
        {
          "id": "1",
          "name": "Exercise Name",
          "description": "Brief description of the exercise and how to perform it",
          "sets": 3,
          "reps": 10,
          "duration": null,
          "equipment": "equipment type or 'none' if bodyweight"
        }
      ]
    }
  ]
}

For time-based exercises like planks or cardio, use "duration" (in seconds) instead of "reps".
Include ${daysPerWeek} days in the plan.
Make sure the exercises are appropriate for the specified fitness goal and experience level.
`;
};

/**
 * Map the API response to our WorkoutPlan type
 */
const mapToWorkoutPlan = (apiResponse: any, formData: WorkoutFormData): WorkoutPlan => {
  // If the API response doesn't match our expected format, return a mock plan
  if (!apiResponse.days || !Array.isArray(apiResponse.days)) {
    console.error("API response doesn't match expected format:", apiResponse);
    return generateMockWorkoutPlan(formData);
  }

  // Map the response days to our WorkoutDay type
  const workoutDays = apiResponse.days.map((day: any) => {
    // Ensure the day value is a valid DayOfWeek
    const dayName = validateDayOfWeek(day.day);
    
    // Map exercises, providing default values for missing properties
    const exercises = day.exercises.map((exercise: any, index: number) => ({
      id: exercise.id || `ex_${index}_${Date.now()}`,
      name: exercise.name || "Unknown Exercise",
      description: exercise.description || "No description provided",
      sets: exercise.sets || undefined,
      reps: exercise.reps || undefined,
      duration: exercise.duration || undefined,
      imageUrl: exercise.imageUrl || getDefaultImageForExercise(exercise.name),
      equipment: exercise.equipment || "none"
    }));

    return {
      day: dayName,
      exercises,
      completed: false
    };
  });

  // Construct the complete workout plan
  return {
    id: `plan_${Date.now()}`,
    name: apiResponse.name || `${formData.experienceLevel.charAt(0).toUpperCase() + formData.experienceLevel.slice(1)} ${formData.fitnessGoal.charAt(0).toUpperCase() + formData.fitnessGoal.slice(1)} Plan`,
    goal: formData.fitnessGoal,
    level: formData.experienceLevel,
    days: workoutDays,
    createdAt: new Date(),
    completionPercentage: 0
  };
};

/**
 * Validate that the day string is a valid DayOfWeek
 */
const validateDayOfWeek = (day: string): DayOfWeek => {
  const validDays: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Capitalize first letter for consistency
  const formattedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  
  // Check if the day is valid
  if (validDays.includes(formattedDay as DayOfWeek)) {
    return formattedDay as DayOfWeek;
  }
  
  // Default to Monday if invalid
  return 'Monday';
};

/**
 * Get a default image URL for an exercise based on its name
 */
const getDefaultImageForExercise = (exerciseName: string): string => {
  // Convert exercise name to lowercase for matching
  const name = exerciseName.toLowerCase();
  
  // Match exercise names with default images
  if (name.includes('push-up') || name.includes('pushup')) {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b';
  } else if (name.includes('squat')) {
    return 'https://images.unsplash.com/photo-1434682881908-b43d0467b798';
  } else if (name.includes('plank')) {
    return 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1';
  } else if (name.includes('burpee')) {
    return 'https://images.unsplash.com/photo-1593164842264-854604db2260';
  } else if (name.includes('lunge')) {
    return 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb';
  } else if (name.includes('mountain climber')) {
    return 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5';
  } else if (name.includes('row') || name.includes('pull')) {
    return 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61';
  } else if (name.includes('jump') || name.includes('rope')) {
    return 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7';
  } else if (name.includes('crunch') || name.includes('sit-up') || name.includes('situp')) {
    return 'https://images.unsplash.com/photo-1571945153237-4929e783af4a';
  } else if (name.includes('kettlebell') || name.includes('swing')) {
    return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438';
  } else if (name.includes('yoga') || name.includes('downward')) {
    return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b';
  } else if (name.includes('warrior')) {
    return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773';
  } else if (name.includes('jog') || name.includes('run')) {
    return 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8';
  } else if (name.includes('deadlift')) {
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48';
  } else if (name.includes('bench') || name.includes('press')) {
    return 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50';
  }
  
  // Default image if no match is found
  return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd';
};
