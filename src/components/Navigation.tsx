import React from 'react';
import { 
  LayoutDashboard, 
  Battery, 
  AlertTriangle, 
  Calendar, 
  Settings, 
  Activity,
  Network
} from 'lucide-react';
import { cn } from '../utils/cn';

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab = 'dashboard', 
  onTabChange = () => {} 
}) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'battery', icon: Battery, label: 'Battery' },
    { id: 'sld', icon: Activity, label: 'SLD' },
    { id: 'alarms', icon: AlertTriangle, label: 'Alarms', badge: 11 },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'network', icon: Network, label: 'Network' },
    { id: 'system', icon: Settings, label: 'System' }
  ];

  return (
    <nav className="flex space-x-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "px-3 py-2 flex items-center space-x-2 rounded-md transition-colors",
              activeTab === item.id
                ? "text-blue-500 bg-blue-500/10"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            )}
          >
            <Icon size={20} />
            <span>{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;