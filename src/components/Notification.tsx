
import { useState, useEffect } from 'react';
import { Notification as NotificationType } from '../types';
import { X, Info, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

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
  
  // Get an icon based on notification type
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'tip':
        return <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />;
    }
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
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {getNotificationIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
        <button 
          onClick={handleDismiss}
          className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
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
