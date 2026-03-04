import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // Save preference to localStorage
    if (localStorage.getItem('theme') !== theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, colorTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light'); // Optional
    }
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return [theme, toggleTheme];
};

export default useDarkMode;
