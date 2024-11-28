import React from 'react';
import { Bell, User, HelpCircle } from 'lucide-react';
import Navigation from './Navigation';

const TopBar: React.FC = () => {
  return (
    <div className="h-16 bg-navy-800 fixed top-0 right-0 left-0 z-10">
      <div className="max-w-[1920px] mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-white text-xl font-semibold">
            IoT Dashboard
          </div>
          <Navigation />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="text-gray-300 hover:text-white">
            <HelpCircle size={20} />
          </button>
          
          <div className="flex items-center space-x-2 text-gray-300">
            <User size={20} />
            <span>Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;