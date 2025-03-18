
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutPlan from '../components/WorkoutPlan';
import Notification from '../components/Notification';
import { WorkoutFormData, WorkoutPlan as WorkoutPlanType, Notification as NotificationType } from '../types';
import { generateWorkoutPlan } from '../utils/workoutGenerator';
import { generateWorkoutPlanWithGemini } from '../utils/geminiService';
import { getRandomTip } from '../utils/workoutGenerator';
import { Button } from '../components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { toast } = useToast();
  
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
      // Use Gemini API to generate workout plan
      const newPlan = await generateWorkoutPlanWithGemini(formData);
      
      setWorkoutPlan(newPlan);
      
      // Show success notification
      toast({
        title: "Success!",
        description: "Your personalized workout plan has been generated with AI.",
        variant: "default",
      });
      
      addNotification({
        id: `success-${Date.now()}`,
        message: 'Your personalized workout plan has been created using Gemini AI!',
        type: 'success',
        read: false
      });
    } catch (error) {
      console.error('Error generating workout plan', error);
      
      // Fall back to mock generator
      const fallbackPlan = generateWorkoutPlan(formData);
      setWorkoutPlan(fallbackPlan);
      
      // Show warning notification about fallback
      toast({
        title: "AI Service Unavailable",
        description: "Using backup generator. Some features may be limited.",
        variant: "destructive",
      });
      
      addNotification({
        id: `warning-${Date.now()}`,
        message: 'Could not connect to Gemini AI. Using backup generator instead.',
        type: 'warning',
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
                <h2 className="text-2xl font-display font-medium">Your Workout Plan</h2>
                
                <Button
                  onClick={() => setWorkoutPlan(null)}
                  variant="outline"
                  className="text-sm font-medium"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create New Plan
                </Button>
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
