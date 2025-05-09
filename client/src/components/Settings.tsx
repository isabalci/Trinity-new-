import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import i18n from '../i18n';
import { FiGlobe, FiSun, FiMoon, FiSettings, FiBell, FiEye, FiSave } from 'react-icons/fi';
import IconWrapper from './IconWrapper';
import '../App.css';

const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentLang, setCurrentLang] = useState(i18n.getCurrentLanguage());
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [newsAlerts, setNewsAlerts] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [chartType, setChartType] = useState('candle');
  const [defaultTimeframe, setDefaultTimeframe] = useState('1d');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
  };

  const handleSavePreferences = () => {
    // Save preferences logic would go here
    console.log('Saving preferences:', {
      notificationsEnabled,
      priceAlerts,
      newsAlerts,
      chartType,
      defaultTimeframe
    });
  };

  return (
    <div className={`settings-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="page-header">
        <h1><IconWrapper icon={FiSettings} size={24} /> {i18n.t('sidebar.settings')}</h1>
        <p>{i18n.t('settings.subtitle')}</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <button 
            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            {i18n.t('settings.general')}
          </button>
          <button 
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            {i18n.t('settings.notifications')}
          </button>
          <button 
            className={`tab-button ${activeTab === 'chart' ? 'active' : ''}`}
            onClick={() => setActiveTab('chart')}
          >
            {i18n.t('settings.chartPreferences')}
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'general' && (
            <>
              <div className="settings-card">
                <div className="card-header">
                  <IconWrapper icon={FiGlobe} size={20} />
                  <h2>{i18n.t('settings.language')}</h2>
                </div>
                <div className="card-content">
                  <p>{i18n.t('settings.languageDescription')}</p>
                  <div className="language-options">
                    <button 
                      className={`language-button ${currentLang === 'en' ? 'active' : ''}`}
                      onClick={() => changeLanguage('en')}
                    >
                      <span className="language-flag">🇬🇧</span>
                      {i18n.t('settings.english')}
                    </button>
                    
                    <button 
                      className={`language-button ${currentLang === 'tr' ? 'active' : ''}`}
                      onClick={() => changeLanguage('tr')}
                    >
                      <span className="language-flag">🇹🇷</span>
                      {i18n.t('settings.turkish')}
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <div className="card-header">
                  <IconWrapper icon={isDarkMode ? FiSun : FiMoon} size={20} />
                  <h2>{i18n.t('settings.theme')}</h2>
                </div>
                <div className="card-content">
                  <p>{i18n.t('settings.themeDescription')}</p>
                  <div className="theme-switcher">
                    <span className={`theme-option ${!isDarkMode ? 'active' : ''}`}>
                      <FiSun size={18} />
                    </span>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={isDarkMode}
                        onChange={toggleTheme}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className={`theme-option ${isDarkMode ? 'active' : ''}`}>
                      <FiMoon size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-card">
              <div className="card-header">
                <IconWrapper icon={FiBell} size={20} />
                <h2>{i18n.t('settings.notifications')}</h2>
              </div>
              <div className="card-content">
                <div className="settings-option">
                  <div className="option-info">
                    <h3>{i18n.t('settings.enableNotifications')}</h3>
                    <p>{i18n.t('settings.enableNotificationsDesc')}</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                {notificationsEnabled && (
                  <>
                    <div className="settings-option">
                      <div className="option-info">
                        <h3>{i18n.t('settings.priceAlerts')}</h3>
                        <p>{i18n.t('settings.priceAlertsDesc')}</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={priceAlerts}
                          onChange={() => setPriceAlerts(!priceAlerts)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    
                    <div className="settings-option">
                      <div className="option-info">
                        <h3>{i18n.t('settings.newsAlerts')}</h3>
                        <p>{i18n.t('settings.newsAlertsDesc')}</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={newsAlerts}
                          onChange={() => setNewsAlerts(!newsAlerts)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </>
                )}

                <button 
                  className="save-button" 
                  onClick={handleSavePreferences}
                >
                  <IconWrapper icon={FiSave} size={16} />
                  {i18n.t('settings.savePreferences')}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="settings-card">
              <div className="card-header">
                <IconWrapper icon={FiEye} size={20} />
                <h2>{i18n.t('settings.chartPreferences')}</h2>
              </div>
              <div className="card-content">
                <div className="settings-option">
                  <div className="option-info">
                    <h3>{i18n.t('settings.defaultChartType')}</h3>
                  </div>
                  <div className="radio-buttons">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="chartType" 
                        value="candle"
                        checked={chartType === 'candle'}
                        onChange={() => setChartType('candle')}
                      />
                      <span>{i18n.t('settings.candlestick')}</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="chartType" 
                        value="line"
                        checked={chartType === 'line'}
                        onChange={() => setChartType('line')}
                      />
                      <span>{i18n.t('settings.line')}</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="chartType" 
                        value="bar"
                        checked={chartType === 'bar'}
                        onChange={() => setChartType('bar')}
                      />
                      <span>{i18n.t('settings.bar')}</span>
                    </label>
                  </div>
                </div>
                
                <div className="settings-option">
                  <div className="option-info">
                    <h3>{i18n.t('settings.defaultTimeframe')}</h3>
                  </div>
                  <div className="select-wrapper">
                    <select
                      value={defaultTimeframe}
                      onChange={(e) => setDefaultTimeframe(e.target.value)}
                      className="timeframe-select"
                    >
                      <option value="1m">1 {i18n.t('settings.minute')}</option>
                      <option value="5m">5 {i18n.t('settings.minutes')}</option>
                      <option value="15m">15 {i18n.t('settings.minutes')}</option>
                      <option value="30m">30 {i18n.t('settings.minutes')}</option>
                      <option value="1h">1 {i18n.t('settings.hour')}</option>
                      <option value="4h">4 {i18n.t('settings.hours')}</option>
                      <option value="1d">1 {i18n.t('settings.day')}</option>
                      <option value="1w">1 {i18n.t('settings.week')}</option>
                    </select>
                  </div>
                </div>

                <button 
                  className="save-button" 
                  onClick={handleSavePreferences}
                >
                  <IconWrapper icon={FiSave} size={16} />
                  {i18n.t('settings.savePreferences')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 