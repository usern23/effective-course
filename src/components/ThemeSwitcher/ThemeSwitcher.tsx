import { useState, useEffect } from 'react';
import classes from './ThemeSwitcher.module.css';
import { useTranslation } from 'react-i18next';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { t } = useTranslation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={classes.switcher} onClick={toggleTheme}>
      <span className={classes.text}>
        {theme === 'light' ? t('theme.dark') : t('theme.light')}
      </span>
    </div>
  );
};

export default ThemeSwitcher; 