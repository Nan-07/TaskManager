// Components/Header.jsx - Updated
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import NotificationPanel from './NotificationPanel';

const Header = ({ onSearch }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow-sm rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Tasks</h1>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        {onSearch && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              onChange={(e) => onSearch(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
          </div>
        )}

        {/* Notification Panel */}
        <NotificationPanel />
      </div>
    </header>
  );
};

export default Header;