
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Home, LogIn, LogOut, User } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface UserData {
  id: string;
  name: string;
  email: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  
  useEffect(() => {
    const userStr = localStorage.getItem('jobTrackerUser');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        localStorage.removeItem('jobTrackerUser');
        localStorage.removeItem('jobTrackerToken');
      }
    }
  }, [location.pathname]);
  
  const handleLogout = () => {
    localStorage.removeItem('jobTrackerUser');
    localStorage.removeItem('jobTrackerToken');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationMenu className="h-16">
          <NavigationMenuList className="flex w-full justify-between">
            <div className="flex space-x-2">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink 
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      "text-gray-700 hover:text-blue-600 hover:bg-gray-100",
                      location.pathname === '/' && "bg-blue-50 text-blue-600"
                    )}
                  >
                    <Home className="mr-2 h-5 w-5" />
                    <span>Home</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/jobs">
                  <NavigationMenuLink 
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      "text-gray-700 hover:text-blue-600 hover:bg-gray-100",
                      location.pathname === '/jobs' && "bg-blue-50 text-blue-600"
                    )}
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    <span>Jobs</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
            
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-700">
                    <User className="inline h-4 w-4 mr-1" />
                    {user.name || user.email}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="flex items-center"
                  >
                    <LogOut className="mr-1 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <LogIn className="mr-1 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Navbar;
