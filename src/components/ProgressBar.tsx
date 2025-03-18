
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showValue?: boolean;
  className?: string;
  color?: string;
}

const ProgressBar = ({
  value,
  max = 100,
  size = 'md',
  animated = true,
  showValue = true,
  className = '',
  color = 'bg-primary'
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

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className={`bg-secondary rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div 
          className={`${color} rounded-full ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
          style={{ width: `${width}%` }}
        />
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
