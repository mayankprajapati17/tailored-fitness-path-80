
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutPlan from '../components/WorkoutPlan';
import Notification from '../components/Notification';
import { WorkoutFormData, WorkoutPlan as WorkoutPlanType, Notification as NotificationType } from '../types';
import { generateWorkoutPlan, getRandomTip } from '../utils/workoutGenerator';

const Index = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  
  // Load saved plan from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('workoutPlan');
    
    if (savedPlan) {
      try {
        const parsedPlan = JSON.parse(savedPlan);
        // Convert string date back to Date object
        parsedPlan.createdAt = new Date(parsedPlan.createdAt);
        setWorkoutPlan(parsedPlan);
      } catch (error) {
        console.error('Error parsing saved workout plan', error);
      }
    }
  }, []);
  
  // Save plan to localStorage whenever it changes
  useEffect(() => {
    if (workoutPlan) {
      localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
    }
  }, [workoutPlan]);
  
  // Show a random tip every 60 seconds
  useEffect(() => {
    if (!workoutPlan) return;
    
    // Show initial tip
    showTip();
    
    const interval = setInterval(() => {
      showTip();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [workoutPlan]);
  
  const showTip = () => {
    if (!workoutPlan) return;
    
    const tip = getRandomTip(workoutPlan.goal);
    
    addNotification({
      id: `tip-${Date.now()}`,
      message: tip,
      type: 'tip',
      read: false
    });
  };
  
  const addNotification = (notification: NotificationType) => {
    setNotifications(prev => [notification, ...prev]);
  };
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const handleFormSubmit = async (formData: WorkoutFormData) => {
    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate workout plan
      const newPlan = generateWorkoutPlan(formData);
      
      setWorkoutPlan(newPlan);
      
      // Show success notification
      addNotification({
        id: `success-${Date.now()}`,
        message: 'Your workout plan has been generated successfully!',
        type: 'success',
        read: false
      });
    } catch (error) {
      console.error('Error generating workout plan', error);
      
      // Show error notification
      addNotification({
        id: `error-${Date.now()}`,
        message: 'Failed to generate workout plan. Please try again.',
        type: 'error',
        read: false
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handlePlanUpdate = (updatedPlan: WorkoutPlanType) => {
    setWorkoutPlan(updatedPlan);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        title="AI Workout Planner" 
        description="Create personalized workout routines tailored to your fitness goals" 
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Display notifications */}
        <div className="fixed top-20 right-4 z-50 w-80 space-y-2">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
              onDismiss={() => removeNotification(notification.id)}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto space-y-8">
          {!workoutPlan ? (
            <div className="max-w-3xl mx-auto">
              <WorkoutForm onSubmit={handleFormSubmit} isLoading={isGenerating} />
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-medium">Your Workout Plan</h2>
                
                <button
                  onClick={() => setWorkoutPlan(null)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Create New Plan
                </button>
              </div>
              
              <WorkoutPlan plan={workoutPlan} onUpdate={handlePlanUpdate} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
