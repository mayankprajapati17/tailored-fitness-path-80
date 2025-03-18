
import { useState, useEffect } from 'react';
import { Notification as NotificationType } from '../types';

interface NotificationProps {
  notification: NotificationType;
  onDismiss: () => void;
  autoDismiss?: boolean;
  dismissTime?: number;
}

const Notification = ({ 
  notification, 
  onDismiss, 
  autoDismiss = true,
  dismissTime = 5000
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  
  // Apply different styles based on notification type
  const typeStyles = {
    tip: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300',
    warning: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300',
    success: 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300',
    error: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300'
  };
  
  // Auto-dismiss notification
  useEffect(() => {
    if (!autoDismiss) return;
    
    const startTime = Date.now();
    const endTime = startTime + dismissTime;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / dismissTime) * 100;
      
      setProgress(newProgress);
      
      if (remaining === 0) {
        clearInterval(timer);
        handleDismiss();
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [autoDismiss, dismissTime]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    
    // Delay calling onDismiss until exit animation completes
    setTimeout(() => {
      onDismiss();
    }, 300);
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`relative animate-fade-in overflow-hidden rounded-lg border p-4 mb-3 ${typeStyles[notification.type]}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
        <button 
          onClick={handleDismiss}
          className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
      
      {autoDismiss && (
        <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20" style={{ width: `${progress}%` }} />
      )}
    </div>
  );
};

export default Notification;
