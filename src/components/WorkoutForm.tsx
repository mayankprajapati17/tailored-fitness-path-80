
import { useState } from 'react';
import { WorkoutFormData, FitnessGoal, ExperienceLevel, Equipment } from '../types';

interface WorkoutFormProps {
  onSubmit: (formData: WorkoutFormData) => void;
  isLoading?: boolean;
}

const WorkoutForm = ({ onSubmit, isLoading = false }: WorkoutFormProps) => {
  const [formData, setFormData] = useState<WorkoutFormData>({
    fitnessGoal: 'strength',
    experienceLevel: 'beginner',
    equipment: ['none'],
    daysPerWeek: 3,
    focusAreas: [],
    duration: 30
  });
  
  const fitnessGoals: { value: FitnessGoal; label: string }[] = [
    { value: 'strength', label: 'Strength' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'endurance', label: 'Endurance' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'balance', label: 'Balance' }
  ];
  
  const experienceLevels: { value: ExperienceLevel; label: string }[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];
  
  const equipmentOptions: { value: Equipment; label: string }[] = [
    { value: 'none', label: 'None (Bodyweight)' },
    { value: 'dumbbells', label: 'Dumbbells' },
    { value: 'resistance bands', label: 'Resistance Bands' },
    { value: 'kettlebell', label: 'Kettlebell' },
    { value: 'gym', label: 'Full Gym' }
  ];
  
  const focusAreas: { value: string; label: string }[] = [
    { value: 'upper_body', label: 'Upper Body' },
    { value: 'lower_body', label: 'Lower Body' },
    { value: 'core', label: 'Core' },
    { value: 'full_body', label: 'Full Body' },
    { value: 'mobility', label: 'Mobility' }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const { checked } = checkbox;
      
      if (name === 'focusAreas') {
        setFormData(prev => {
          const currentFocusAreas = [...prev.focusAreas];
          
          if (checked) {
            currentFocusAreas.push(value);
          } else {
            const index = currentFocusAreas.indexOf(value);
            if (index > -1) {
              currentFocusAreas.splice(index, 1);
            }
          }
          
          return { ...prev, focusAreas: currentFocusAreas };
        });
      } else if (name === 'equipment') {
        setFormData(prev => {
          const currentEquipment = [...prev.equipment];
          
          if (checked) {
            currentEquipment.push(value as Equipment);
          } else {
            const index = currentEquipment.indexOf(value as Equipment);
            if (index > -1) {
              currentEquipment.splice(index, 1);
            }
          }
          
          return { ...prev, equipment: currentEquipment };
        });
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: ['daysPerWeek', 'duration'].includes(name) ? Number(value) : value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-card rounded-xl border border-border p-6 shadow-sm animate-fade-in"
    >
      <h2 className="text-xl font-medium mb-6">Create Your Workout Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fitness Goal */}
        <div className="space-y-2">
          <label htmlFor="fitnessGoal" className="block text-sm font-medium text-foreground">
            Fitness Goal
          </label>
          <select
            id="fitnessGoal"
            name="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {fitnessGoals.map(goal => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Experience Level */}
        <div className="space-y-2">
          <label htmlFor="experienceLevel" className="block text-sm font-medium text-foreground">
            Experience Level
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {experienceLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Days Per Week */}
        <div className="space-y-2">
          <label htmlFor="daysPerWeek" className="block text-sm font-medium text-foreground">
            Days Per Week
          </label>
          <input
            type="range"
            id="daysPerWeek"
            name="daysPerWeek"
            min="1"
            max="7"
            value={formData.daysPerWeek}
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </div>
          <p className="text-sm text-center mt-1">
            <span className="font-medium">{formData.daysPerWeek}</span> days per week
          </p>
        </div>
        
        {/* Workout Duration */}
        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-medium text-foreground">
            Workout Duration
          </label>
          <input
            type="range"
            id="duration"
            name="duration"
            min="15"
            max="90"
            step="5"
            value={formData.duration}
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>15m</span>
            <span>30m</span>
            <span>45m</span>
            <span>60m</span>
            <span>75m</span>
            <span>90m</span>
          </div>
          <p className="text-sm text-center mt-1">
            <span className="font-medium">{formData.duration}</span> minutes per workout
          </p>
        </div>
      </div>
      
      {/* Equipment */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Available Equipment
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {equipmentOptions.map(option => (
            <label
              key={option.value}
              className="flex items-center space-x-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                name="equipment"
                value={option.value}
                checked={formData.equipment.includes(option.value)}
                onChange={handleChange}
                className="rounded border-input h-4 w-4 text-primary focus:ring-primary"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Focus Areas */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Focus Areas
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {focusAreas.map(area => (
            <label
              key={area.value}
              className="flex items-center space-x-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                name="focusAreas"
                value={area.value}
                checked={formData.focusAreas.includes(area.value)}
                onChange={handleChange}
                className="rounded border-input h-4 w-4 text-primary focus:ring-primary"
              />
              <span>{area.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-white font-medium rounded-lg px-6 py-2.5 shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none"
        >
          {isLoading ? 'Generating...' : 'Generate Workout Plan'}
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;
