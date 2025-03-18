
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  description?: string;
}

const Header = ({ title, description }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener on mount
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 py-4 px-6 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-display font-semibold tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5 max-w-xl">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="font-medium">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Plan
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
