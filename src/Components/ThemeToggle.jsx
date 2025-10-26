// Components/ThemeToggle.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`
        w-10 h-10 rounded-lg flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
          : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
        }
        shadow-md hover:shadow-lg
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      >
        {isDark ? (
          <FaSun className="text-lg" />
        ) : (
          <FaMoon className="text-lg" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;