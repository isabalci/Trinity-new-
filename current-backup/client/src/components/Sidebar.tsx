import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FiHome, FiBarChart2, FiBriefcase, FiList, FiSettings } from 'react-icons/fi';
import IconWrapper from './IconWrapper';
import i18n from '../i18n';

const Sidebar: React.FC = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}>
      <Link 
        to="/dashboard" 
        className={`sidebar-item ${isActive('/dashboard') ? 'active' : ''}`}
        title={String(i18n.t('navigation.dashboard'))}
      >
        <IconWrapper icon={FiHome} size={20} />
      </Link>
      
      <Link 
        to="/markets" 
        className={`sidebar-item ${isActive('/markets') ? 'active' : ''}`}
        title={String(i18n.t('navigation.markets'))}
      >
        <IconWrapper icon={FiBarChart2} size={20} />
      </Link>
      
      <Link 
        to="/portfolio" 
        className={`sidebar-item ${isActive('/portfolio') ? 'active' : ''}`}
        title={String(i18n.t('navigation.portfolio'))}
      >
        <IconWrapper icon={FiBriefcase} size={20} />
      </Link>
      
      <Link 
        to="/watchlist" 
        className={`sidebar-item ${isActive('/watchlist') ? 'active' : ''}`}
        title={String(i18n.t('navigation.watchlist'))}
      >
        <IconWrapper icon={FiList} size={20} />
      </Link>
      
      <Link 
        to="/settings" 
        className={`sidebar-item ${isActive('/settings') ? 'active' : ''}`}
        title={String(i18n.t('navigation.settings'))}
      >
        <IconWrapper icon={FiSettings} size={20} />
      </Link>
    </div>
  );
};

export default Sidebar; 