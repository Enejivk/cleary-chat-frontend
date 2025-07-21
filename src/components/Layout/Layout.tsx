import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useAppSelector } from '../../hooks/redux';

const Layout: React.FC = () => {
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;