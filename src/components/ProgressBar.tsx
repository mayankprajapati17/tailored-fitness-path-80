
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showValue?: boolean;
  className?: string;
  color?: string;
  showMilestones?: boolean;
}

const ProgressBar = ({
  value,
  max = 100,
  size = 'md',
  animated = true,
  showValue = true,
  className = '',
  color = 'bg-primary',
  showMilestones = true
}: ProgressBarProps) => {
  const [width, setWidth] = useState(0);

  // Normalize value
  const percentage = Math.min(Math.max(0, value), max) / max * 100;
  
  // Determine sizes based on size prop
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Animate progress when value changes
  useEffect(() => {
    // Initial render - start at 0
    setWidth(0);
    
    // Delay to allow animation
    const timeout = setTimeout(() => {
      setWidth(percentage);
    }, 50);
    
    return () => clearTimeout(timeout);
  }, [percentage]);

  // Define milestone images
  const getMilestoneImage = () => {
    if (!showMilestones) return null;
    
    if (percentage >= 100) {
      return (
        <div className="absolute -right-6 -top-8 animate-bounce">
          <img 
            src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb" 
            alt="100% Complete" 
            className="w-12 h-12 rounded-full border-2 border-green-500 object-cover"
          />
        </div>
      );
    } else if (percentage >= 75) {
      return (
        <div className="absolute right-1/4 -top-8">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
            alt="75% Complete" 
            className="w-10 h-10 rounded-full border-2 border-amber-500 object-cover"
          />
        </div>
      );
    } else if (percentage >= 50) {
      return (
        <div className="absolute right-1/2 -top-8">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438" 
            alt="50% Complete" 
            className="w-8 h-8 rounded-full border-2 border-blue-500 object-cover"
          />
        </div>
      );
    } else if (percentage >= 25) {
      return (
        <div className="absolute right-3/4 -top-8">
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" 
            alt="25% Complete" 
            className="w-6 h-6 rounded-full border-2 border-purple-500 object-cover"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className={`relative bg-secondary rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div 
          className={`${color} rounded-full ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
          style={{ 
            width: `${width}%`,
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary) 50%, #fd7e14 100%)'
          }}
        />
        {getMilestoneImage()}
      </div>
      
      {showValue && (
        <div className={`mt-1 text-end ${textSizes[size]} text-muted-foreground`}>
          {value}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
