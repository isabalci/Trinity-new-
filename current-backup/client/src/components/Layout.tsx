import React from 'react';
import { useTranslation } from 'react-i18next';

const Layout: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Trinity</h1>
          <div>
            <button onClick={() => changeLanguage('en')} style={{ marginRight: '10px' }}>English</button>
            <button onClick={() => changeLanguage('tr')}>Türkçe</button>
          </div>
        </div>
      </header>

      <main style={{ textAlign: 'center' }}>
        <h1>{t('welcome')}</h1>
        <h3>{t('subheading')}</h3>
        <div style={{ marginTop: '30px' }}>
          <button style={{ 
            backgroundColor: '#00bcd4', 
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}>
            {t('getStarted')}
          </button>
          <button style={{ 
            backgroundColor: 'transparent', 
            color: '#00bcd4',
            padding: '10px 20px',
            border: '1px solid #00bcd4',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            {t('learnMore')}
          </button>
        </div>
      </main>

      <footer style={{ marginTop: '40px', textAlign: 'center', color: '#666' }}>
        <p>© {new Date().getFullYear()} Trinity. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Layout; 