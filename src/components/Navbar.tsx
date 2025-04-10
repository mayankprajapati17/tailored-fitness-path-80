
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Home } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationMenu className="h-16">
          <NavigationMenuList className="flex w-full justify-start">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink 
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
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
                    "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  )}
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  <span>Jobs</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Navbar;
