import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="text-2xl p-3 rounded-full bg-white/20 dark:bg-gray-700 hover:bg-white/30 dark:hover:bg-gray-600 backdrop-blur-md shadow-md"
      aria-label="Переключить тему"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;