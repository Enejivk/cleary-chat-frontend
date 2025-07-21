import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, MessageSquare, Code, User, LogOut, Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';
import { setTheme } from '../../store/slices/uiSlice';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.ui.theme);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };
  const navItems = [
    
    
    
  ];

  return (
    <nav className={`border-b px-6 py-4 ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h1 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>ChatBot Studio</h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-blue-900 text-blue-300 border-b-2 border-blue-400'
                        : 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md transition-colors ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center space-x-2">
            <User className="w-6 h-6 text-gray-400" />
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>{user?.name}</span>
          </div>
          
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-1 px-3 py-1 text-sm rounded-md transition-colors ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;