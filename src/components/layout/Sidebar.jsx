import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout, BookOpen, Key, Settings, Share2, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = {
  main: [
    { 
      id: 'playground', 
      icon: Layout, 
      label: 'Playground',
      disabled: true 
    },
    { 
      id: 'documentation', 
      icon: BookOpen, 
      label: 'Documentation',
      disabled: true 
    },
    { 
      id: 'apikeys', 
      icon: Key, 
      label: 'API Keys',
      path: '/apikeys' 
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings',
      disabled: true 
    },
  ],
  social: [
    { 
      id: 'discord', 
      icon: Share2, 
      label: 'Discord',
      disabled: true 
    },
    { 
      id: 'chat', 
      icon: MessageCircle, 
      label: 'Chat with us',
      disabled: true 
    },
  ]
};

const NavItem = ({ icon: Icon, label, path, disabled, className = '' }) => {
  if (disabled) {
    return (
      <button
        disabled
        className={`w-full flex items-center px-4 py-2 rounded-lg opacity-50 cursor-not-allowed ${className}`}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span>{label}</span>
      </button>
    );
  }

  if (path) {
    return (
      <NavLink
        to={path}
        className={({ isActive }) => 
          `w-full flex items-center px-4 py-2 rounded-lg ${
            isActive ? 'bg-gray-800' : 'hover:bg-gray-800'
          } ${className}`
        }
      >
        <Icon className="w-5 h-5 mr-3" />
        <span>{label}</span>
      </NavLink>
    );
  }

  return (
    <button
      className={`w-full flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 ${className}`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{label}</span>
    </button>
  );
};

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-[#1E1E1E] text-gray-300 flex flex-col h-screen">
      <div className="p-4">
        <h1 className="text-4xl font-bold">
          Dental<span className="text-[#FF4B55]">ai</span>
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {NAV_ITEMS.main.map((item) => (
            <li key={item.id}>
              <NavItem {...item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <ul className="space-y-2">
          {NAV_ITEMS.social.map((item) => (
            <li key={item.id}>
              <NavItem {...item} className="text-white-500 hover:text-gray-300" />
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          className="w-full mt-4 text-white-500"
          onClick={logout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );  
};

export default Sidebar;