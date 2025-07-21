import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, MessageSquare, Code, User, LogOut, Moon, Sun, Menu, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';
import { setTheme, toggleSidebar } from '../../store/slices/uiSlice';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.ui.theme);
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const navItems = [
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/chatbot', label: 'Chatbot', icon: MessageSquare },
    { path: '/embed', label: 'Embed', icon: Code },
  ];

  return (
    <>
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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
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
            
            {/* Desktop User Info */}
            <div className="hidden md:flex items-center space-x-2">
              <User className="w-6 h-6 text-gray-400" />
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>{user?.name}</span>
            </div>
            
            {/* Desktop Logout */}
            <button
              onClick={handleLogout}
              className={`hidden md:flex items-center space-x-1 px-3 py-1 text-sm rounded-md transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={handleToggleSidebar}
              className={`md:hidden p-2 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={handleToggleSidebar}>
          <div 
            className={`fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            } shadow-lg`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  <h2 className={`text-lg font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>ChatBot Studio</h2>
                </div>
                <button
                  onClick={handleToggleSidebar}
                  className={`p-1 rounded-md transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleToggleSidebar}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                        isActive
                          ? theme === 'dark'
                            ? 'bg-blue-900 text-blue-300'
                            : 'bg-blue-50 text-blue-700'
                          : theme === 'dark'
                            ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-3 px-4 py-2 mb-4">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>{user?.name}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors w-full ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;