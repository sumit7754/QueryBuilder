// src/components/ThemeToggle.tsx
import React from 'react';

const ThemeToggle: React.FC = () => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded">
      Toggle Dark Mode
    </button>
  );
};

export default ThemeToggle;
