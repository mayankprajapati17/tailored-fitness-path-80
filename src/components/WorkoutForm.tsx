
import { useState } from 'react';
import { WorkoutFormData, FitnessGoal, ExperienceLevel, Equipment } from '../types';
import { Button } from "@progress/kendo-react-buttons";
import { Play } from 'lucide-react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Slider } from '@progress/kendo-react-inputs';
import { Switch } from '@progress/kendo-react-inputs';
import { DatePicker } from '@progress/kendo-react-dateinputs';

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
  
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<boolean>(false);
  
  const fitnessGoals = [
    { text: 'Strength', value: 'strength' },
    { text: 'Cardio', value: 'cardio' },
    { text: 'Endurance', value: 'endurance' },
    { text: 'Yoga', value: 'yoga' },
    { text: 'Flexibility', value: 'flexibility' },
    { text: 'Balance', value: 'balance' }
  ];
  
  const experienceLevels = [
    { text: 'Beginner', value: 'beginner' },
    { text: 'Intermediate', value: 'intermediate' },
    { text: 'Advanced', value: 'advanced' }
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
  
  const handleDropDownChange = (e: any, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.value
    }));
  };
  
  const handleSliderChange = (e: any, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
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
      <h2 className="text-xl font-display font-medium mb-6">Create Your Workout Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fitness Goal - using KendoReact DropDownList */}
        <div className="space-y-2">
          <label htmlFor="fitnessGoal" className="block text-sm font-medium text-foreground">
            Fitness Goal
          </label>
          <DropDownList
            data={fitnessGoals}
            textField="text"
            dataItemKey="value"
            value={fitnessGoals.find(g => g.value === formData.fitnessGoal)}
            onChange={(e) => handleDropDownChange(e, 'fitnessGoal')}
            className="w-full rounded-md"
          />
        </div>
        
        {/* Experience Level - using KendoReact DropDownList */}
        <div className="space-y-2">
          <label htmlFor="experienceLevel" className="block text-sm font-medium text-foreground">
            Experience Level
          </label>
          <DropDownList
            data={experienceLevels}
            textField="text"
            dataItemKey="value"
            value={experienceLevels.find(l => l.value === formData.experienceLevel)}
            onChange={(e) => handleDropDownChange(e, 'experienceLevel')}
            className="w-full rounded-md"
          />
        </div>
        
        {/* Start Date - using KendoReact DatePicker */}
        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-foreground">
            Start Date
          </label>
          <DatePicker
            value={startDate}
            onChange={(e) => setStartDate(e.value || new Date())}
            format="MMMM d, yyyy"
            className="w-full"
          />
        </div>
        
        {/* Reminders - using KendoReact Switch */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Enable Workout Reminders
          </label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={reminders}
              onChange={(e) => setReminders(e.value)}
              onLabel="On"
              offLabel="Off"
            />
            <span className="text-sm text-muted-foreground">
              {reminders ? 'You will receive workout reminders' : 'No reminders will be sent'}
            </span>
          </div>
        </div>
        
        {/* Days Per Week - using KendoReact Slider */}
        <div className="space-y-2">
          <label htmlFor="daysPerWeek" className="block text-sm font-medium text-foreground">
            Days Per Week
          </label>
          <Slider
            min={1}
            max={7}
            step={1}
            value={formData.daysPerWeek}
            onChange={(e) => handleSliderChange(e, 'daysPerWeek')}
            className="w-full"
          />
          <p className="text-sm text-center mt-1">
            <span className="font-medium">{formData.daysPerWeek}</span> days per week
          </p>
        </div>
        
        {/* Workout Duration - using KendoReact Slider */}
        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-medium text-foreground">
            Workout Duration
          </label>
          <Slider
            min={15}
            max={90}
            step={5}
            value={formData.duration}
            onChange={(e) => handleSliderChange(e, 'duration')}
            className="w-full"
          />
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
                onChange={handleCheckboxChange}
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
                onChange={handleCheckboxChange}
                className="rounded border-input h-4 w-4 text-primary focus:ring-primary"
              />
              <span>{area.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          themeColor="primary"
          fillMode="solid"
          size="medium"
          type="submit"
          disabled={isLoading}
          icon="play"
          className="font-medium rounded-lg px-6 py-2.5 hover:bg-primary/90 transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Workout Plan'}
        </Button>
      </div>
    </form>
  );
};

export default WorkoutForm;
