import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import i18n from '../i18n';
import '../App.css';
import { FiUser, FiMenu, FiLogOut, FiSettings, FiBarChart2, FiHome, FiTrendingUp, FiBriefcase, FiMessageSquare, FiSun, FiMoon, FiGlobe } from 'react-icons/fi';
import IconWrapper from './IconWrapper';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentLang] = useState(i18n.getCurrentLanguage());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Dışarı tıklandığında menüleri kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sayfa değiştiğinde menüleri kapat
  useEffect(() => {
    setUserMenuOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLang);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Trinity
        </Link>

        <div className="navbar-links">
          <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <IconWrapper icon={FiHome} size={16} />
            <span>{i18n.t('dashboard')}</span>
          </Link>
          <Link to="/trading" className={`navbar-link ${isActive('/trading') ? 'active' : ''}`}>
            <IconWrapper icon={FiBarChart2} size={16} />
            <span>{i18n.t('charts')}</span>
          </Link>
          <Link to="/markets" className={`navbar-link ${isActive('/markets') ? 'active' : ''}`}>
            <IconWrapper icon={FiTrendingUp} size={16} />
            <span>{i18n.t('markets')}</span>
          </Link>
          <Link to="/portfolio" className={`navbar-link ${isActive('/portfolio') ? 'active' : ''}`}>
            <IconWrapper icon={FiBriefcase} size={16} />
            <span>{i18n.t('portfolio')}</span>
          </Link>
          <Link to="/news" className={`navbar-link ${isActive('/news') ? 'active' : ''}`}>
            <IconWrapper icon={FiMessageSquare} size={16} />
            <span>{i18n.t('news')}</span>
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        <button
          className="navbar-icon-btn"
          onClick={toggleTheme}
          title={isDarkMode ? String(i18n.t('settings.lightMode')) : String(i18n.t('settings.darkMode'))}
        >
          <IconWrapper icon={isDarkMode ? FiSun : FiMoon} size={20} />
        </button>

        <div className="navbar-dropdown">
          <button
            className="navbar-icon-btn"
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            title={String(i18n.t('settings.language'))}
          >
            <IconWrapper icon={FiGlobe} size={20} />
          </button>
          {isLanguageDropdownOpen && (
            <div className="dropdown-menu">
              <button
                className={`dropdown-item ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => {
                  i18n.changeLanguage('en');
                  setIsLanguageDropdownOpen(false);
                }}
              >
                English
              </button>
              <button
                className={`dropdown-item ${i18n.language === 'tr' ? 'active' : ''}`}
                onClick={() => {
                  i18n.changeLanguage('tr');
                  setIsLanguageDropdownOpen(false);
                }}
              >
                Türkçe
              </button>
            </div>
          )}
        </div>

        {isAuthenticated ? (
          <div className="navbar-dropdown">
            <button
              className="user-menu-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="user-avatar" />
              ) : (
                <div className="user-avatar-placeholder">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="user-info">
                  <div className="user-name">{user?.name}</div>
                  <div className="user-email">{user?.email}</div>
                </div>
                <div className="dropdown-divider" />
                <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                  <IconWrapper icon={FiUser} size={16} />
                  {String(i18n.t('navigation.profile'))}
                </Link>
                <Link to="/settings" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                  <IconWrapper icon={FiSettings} size={16} />
                  {String(i18n.t('navigation.settings'))}
                </Link>
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={handleLogout}>
                  <IconWrapper icon={FiLogOut} size={16} />
                  {String(i18n.t('auth.logout'))}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-btn login-btn">
              {String(i18n.t('auth.login'))}
            </Link>
            <Link to="/register" className="auth-btn register-btn">
              {String(i18n.t('auth.register'))}
            </Link>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IconWrapper icon={FiMenu} size={20} />
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard" className={`mobile-menu-item ${isActive('/dashboard') ? 'active' : ''}`}>
            <IconWrapper icon={FiHome} size={20} />
            <span>{i18n.t('dashboard')}</span>
          </Link>
          <Link to="/trading" className={`mobile-menu-item ${isActive('/trading') ? 'active' : ''}`}>
            <IconWrapper icon={FiBarChart2} size={20} />
            <span>{i18n.t('charts')}</span>
          </Link>
          <Link to="/markets" className={`mobile-menu-item ${isActive('/markets') ? 'active' : ''}`}>
            <IconWrapper icon={FiTrendingUp} size={20} />
            <span>{i18n.t('markets')}</span>
          </Link>
          <Link to="/portfolio" className={`mobile-menu-item ${isActive('/portfolio') ? 'active' : ''}`}>
            <IconWrapper icon={FiBriefcase} size={20} />
            <span>{i18n.t('portfolio')}</span>
          </Link>
          <Link to="/news" className={`mobile-menu-item ${isActive('/news') ? 'active' : ''}`}>
            <IconWrapper icon={FiMessageSquare} size={20} />
            <span>{i18n.t('news')}</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 