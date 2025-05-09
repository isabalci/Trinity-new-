// @ts-nocheck

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import i18n from '../i18n';
import './styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="dashboard-header">
        <h1>{String(i18n.t('dashboard.welcome'))}, {user?.name}!</h1>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-content">
            <h3>{String(i18n.t('dashboard.portfolioValue'))}</h3>
            <p>$0.00</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-content">
            <h3>{String(i18n.t('dashboard.totalBalance'))}</h3>
            <p>$0.00</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-content">
            <h3>{String(i18n.t('dashboard.todayChange'))}</h3>
            <p className="neutral">0.00%</p>
          </div>
        </div>
      </div>

      <div className="market-overview-section">
        <div className="section-header">
          <h2>{String(i18n.t('dashboard.marketSummary'))}</h2>
        </div>
        <div className="market-table-container">
          <table className="market-table">
            <thead>
              <tr>
                <th>{String(i18n.t('markets.allMarkets'))}</th>
                <th>{String(i18n.t('markets.price'))}</th>
                <th>{String(i18n.t('markets.change'))}</th>
                <th>{String(i18n.t('markets.volume'))}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BTC/USD</td>
                <td>$0.00</td>
                <td className="neutral">0.00%</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>ETH/USD</td>
                <td>$0.00</td>
                <td className="neutral">0.00%</td>
                <td>$0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="chart-section">
        <div className="section-header">
          <h2>{String(i18n.t('dashboard.overview'))}</h2>
        </div>
        <div className="chart-container">
          <div className="chart-placeholder">
            {String(i18n.t('common.loading'))}...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 