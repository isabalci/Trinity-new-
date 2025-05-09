// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import i18n from '../i18n';
import { API } from '../services/api';
import {
  FiPlus, FiEdit2, FiTrash2, FiPieChart, FiArrowUp, 
  FiArrowDown, FiDollarSign, FiCalendar, FiRefreshCw
} from 'react-icons/fi';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import IconWrapper from './IconWrapper';
import '../App.css';

// Define interfaces for portfolio data
interface PortfolioPosition {
  id: string;
  symbol: string;
  quantity: number;
  entryPrice: number;
  entryDate: string;
  currentPrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  fee: number;
  date: string;
}

interface PerformanceData {
  date: string;
  value: number;
  change: number;
}

interface PerformanceResponse {
  period: string;
  data: PerformanceData[];
  summary: {
    startValue: number;
    currentValue: number;
    absoluteChange: number;
    percentageChange: number;
  };
}

interface PortfolioResponse {
  positions: PortfolioPosition[];
  totalValue: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
}

type PeriodType = 'day' | 'week' | 'month' | 'year' | 'all';

const Portfolio: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  // State variables
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('positions');
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [performance, setPerformance] = useState<PerformanceResponse | null>(null);
  const [timePeriod, setTimePeriod] = useState<PeriodType>('month');
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalProfitLoss, setTotalProfitLoss] = useState<number>(0);
  const [totalProfitLossPercentage, setTotalProfitLossPercentage] = useState<number>(0);
  const [showAddPositionModal, setShowAddPositionModal] = useState<boolean>(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState<boolean>(false);
  const [editingPosition, setEditingPosition] = useState<PortfolioPosition | null>(null);
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
  
  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolioData = async () => {
      setIsLoading(true);
      try {
        // Get portfolio positions
        const portfolioData = await API.portfolio.getPortfolio() as PortfolioResponse;
        setPositions(portfolioData.positions || []);
        setTotalValue(portfolioData.totalValue || 0);
        setTotalProfitLoss(portfolioData.totalProfitLoss || 0);
        setTotalProfitLossPercentage(portfolioData.totalProfitLossPercentage || 0);
        
        // Get transaction history
        const transactionsData = await API.portfolio.getTransactions() as Transaction[];
        setTransactions(transactionsData || []);
        
        // Get performance data
        const performanceData = await API.portfolio.getPerformance(timePeriod) as PerformanceResponse;
        setPerformance(performanceData || null);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setIsLoading(false);
      }
    };
    
    fetchPortfolioData();
  }, [timePeriod]);
  
  // Change time period for performance chart
  const handlePeriodChange = (period: PeriodType) => {
    setTimePeriod(period);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };
  
  // Handlers for position actions
  const handleAddPosition = () => {
    setShowAddPositionModal(true);
  };
  
  const handleEditPosition = (position: PortfolioPosition) => {
    setEditingPosition(position);
    setShowAddPositionModal(true);
  };
  
  const handleDeletePosition = async (positionId: string) => {
    if (window.confirm(i18n.t('portfolio.confirmDelete'))) {
      try {
        await API.portfolio.deletePosition(positionId);
        setPositions(positions.filter(pos => pos.id !== positionId));
        
        // Recalculate totals
        const remainingPositions = positions.filter(pos => pos.id !== positionId);
        const newTotalValue = remainingPositions.reduce((sum, pos) => sum + pos.currentValue, 0);
        const newTotalProfitLoss = remainingPositions.reduce((sum, pos) => sum + pos.profitLoss, 0);
        
        setTotalValue(newTotalValue);
        setTotalProfitLoss(newTotalProfitLoss);
        setTotalProfitLossPercentage(newTotalValue > 0 ? (newTotalProfitLoss / (newTotalValue - newTotalProfitLoss)) * 100 : 0);
      } catch (error) {
        console.error('Error deleting position:', error);
      }
    }
  };
  
  // Handlers for transaction actions
  const handleAddTransaction = () => {
    setShowAddTransactionModal(true);
  };
  
  // Prepare data for portfolio distribution pie chart
  const prepareDistributionData = () => {
    const assetDistribution = positions.reduce((acc: {name: string, value: number}[], position) => {
      // Group by asset (strip the quote currency if it's a trading pair)
      const asset = position.symbol.split('/')[0];
      const existingAsset = acc.find(item => item.name === asset);
      
      if (existingAsset) {
        existingAsset.value += position.currentValue;
      } else {
        acc.push({ name: asset, value: position.currentValue });
      }
      
      return acc;
    }, []);
    
    // Sort by value (descending)
    return assetDistribution.sort((a, b) => b.value - a.value);
  };
  
  // Custom tooltip for performance chart
  const PerformanceTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="performance-tooltip">
          <p>{new Date(data.date).toLocaleDateString()}</p>
          <p>{formatCurrency(data.value)}</p>
          <p style={{ color: data.change >= 0 ? '#00c853' : '#ff1744' }}>
            {data.change.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Refresh portfolio data
  const handleRefresh = async () => {
    await fetchPortfolioData();
  };
  
  // Fetch all portfolio data (for refresh button)
  const fetchPortfolioData = async () => {
    setIsLoading(true);
    try {
      // Get portfolio positions
      const portfolioData = await API.portfolio.getPortfolio() as PortfolioResponse;
      setPositions(portfolioData.positions || []);
      setTotalValue(portfolioData.totalValue || 0);
      setTotalProfitLoss(portfolioData.totalProfitLoss || 0);
      setTotalProfitLossPercentage(portfolioData.totalProfitLossPercentage || 0);
      
      // Get transaction history
      const transactionsData = await API.portfolio.getTransactions() as Transaction[];
      setTransactions(transactionsData || []);
      
      // Get performance data
      const performanceData = await API.portfolio.getPerformance(timePeriod) as PerformanceResponse;
      setPerformance(performanceData || null);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error refreshing portfolio data:', error);
      setIsLoading(false);
    }
  };
  
  return (
    <div className={`portfolio-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="portfolio-header">
        <div className="portfolio-title-section">
          <h1>{i18n.t('portfolio.title')}</h1>
          <p>{i18n.t('portfolio.subtitle')}</p>
        </div>
        
        <button className="refresh-button" onClick={handleRefresh} title="Refresh data">
          <IconWrapper icon={FiRefreshCw} size={16} />
        </button>
      </div>
      
      {!isLoading ? (
        <>
          {/* Portfolio summary cards */}
          <div className="portfolio-summary">
            <div className="summary-card">
              <div className="summary-icon">
                <IconWrapper icon={FiDollarSign} size={24} />
              </div>
              <div className="summary-content">
                <h3>{i18n.t('portfolio.totalValue')}</h3>
                <h2>{formatCurrency(totalValue)}</h2>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon" style={{ 
                background: totalProfitLoss >= 0 ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 23, 68, 0.1)',
                color: totalProfitLoss >= 0 ? '#00c853' : '#ff1744'
              }}>
                <IconWrapper icon={totalProfitLoss >= 0 ? FiArrowUp : FiArrowDown} size={24} />
              </div>
              <div className="summary-content">
                <h3>{i18n.t('portfolio.totalProfitLoss')}</h3>
                <h2 style={{ color: totalProfitLoss >= 0 ? '#00c853' : '#ff1744' }}>
                  {formatCurrency(totalProfitLoss)} ({totalProfitLossPercentage.toFixed(2)}%)
                </h2>
              </div>
            </div>
          </div>
          
          {/* Portfolio tabs */}
          <div className="portfolio-tabs">
            <div 
              className={`tab ${activeTab === 'positions' ? 'active' : ''}`} 
              onClick={() => setActiveTab('positions')}
            >
              {i18n.t('portfolio.positions')}
            </div>
            <div 
              className={`tab ${activeTab === 'performance' ? 'active' : ''}`} 
              onClick={() => setActiveTab('performance')}
            >
              {i18n.t('portfolio.performance')}
            </div>
            <div 
              className={`tab ${activeTab === 'transactions' ? 'active' : ''}`} 
              onClick={() => setActiveTab('transactions')}
            >
              {i18n.t('portfolio.transactions')}
            </div>
            <div 
              className={`tab ${activeTab === 'assets' ? 'active' : ''}`} 
              onClick={() => setActiveTab('assets')}
            >
              {i18n.t('portfolio.assets')}
            </div>
          </div>
          
          {/* Positions tab */}
          {activeTab === 'positions' && (
            <div className="positions-container">
              <div className="positions-header">
                <h2>{i18n.t('portfolio.positions')}</h2>
                <button className="add-button" onClick={handleAddPosition}>
                  <IconWrapper icon={FiPlus} size={16} />
                  {i18n.t('portfolio.addPosition')}
                </button>
              </div>
              
              {positions.length > 0 ? (
                <div className="positions-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{i18n.t('portfolio.symbol')}</th>
                        <th>{i18n.t('portfolio.quantity')}</th>
                        <th>{i18n.t('portfolio.entryPrice')}</th>
                        <th>{i18n.t('portfolio.currentPrice')}</th>
                        <th>{i18n.t('portfolio.currentValue')}</th>
                        <th>{i18n.t('portfolio.profitLoss')}</th>
                        <th>{i18n.t('portfolio.profitLossPercentage')}</th>
                        <th>{i18n.t('portfolio.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((position) => (
                        <tr key={position.id}>
                          <td>{position.symbol}</td>
                          <td>{position.quantity}</td>
                          <td>{formatCurrency(position.entryPrice)}</td>
                          <td>{formatCurrency(position.currentPrice)}</td>
                          <td>{formatCurrency(position.currentValue)}</td>
                          <td style={{ color: position.profitLoss >= 0 ? '#00c853' : '#ff1744' }}>
                            {formatCurrency(position.profitLoss)}
                          </td>
                          <td style={{ color: position.profitLossPercentage >= 0 ? '#00c853' : '#ff1744' }}>
                            {position.profitLossPercentage.toFixed(2)}%
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="edit-button" 
                                onClick={() => handleEditPosition(position)}
                                title={i18n.t('portfolio.edit')}
                              >
                                <IconWrapper icon={FiEdit2} size={16} />
                              </button>
                              <button 
                                className="delete-button" 
                                onClick={() => handleDeletePosition(position.id)}
                                title={i18n.t('portfolio.delete')}
                              >
                                <IconWrapper icon={FiTrash2} size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <p>{i18n.t('portfolio.noPositions')}</p>
                  <button className="add-button" onClick={handleAddPosition}>
                    <IconWrapper icon={FiPlus} size={16} />
                    {i18n.t('portfolio.addPosition')}
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Performance tab */}
          {activeTab === 'performance' && performance && (
            <div className="performance-container">
              <div className="performance-header">
                <h2>{i18n.t('portfolio.performance')}</h2>
                <div className="period-buttons">
                  <button 
                    className={`period-button ${timePeriod === 'day' ? 'active' : ''}`}
                    onClick={() => handlePeriodChange('day')}
                  >
                    {i18n.t('portfolio.day')}
                  </button>
                  <button 
                    className={`period-button ${timePeriod === 'week' ? 'active' : ''}`}
                    onClick={() => handlePeriodChange('week')}
                  >
                    {i18n.t('portfolio.week')}
                  </button>
                  <button 
                    className={`period-button ${timePeriod === 'month' ? 'active' : ''}`}
                    onClick={() => handlePeriodChange('month')}
                  >
                    {i18n.t('portfolio.month')}
                  </button>
                  <button 
                    className={`period-button ${timePeriod === 'year' ? 'active' : ''}`}
                    onClick={() => handlePeriodChange('year')}
                  >
                    {i18n.t('portfolio.year')}
                  </button>
                  <button 
                    className={`period-button ${timePeriod === 'all' ? 'active' : ''}`}
                    onClick={() => handlePeriodChange('all')}
                  >
                    {i18n.t('portfolio.all')}
                  </button>
                </div>
              </div>
              
              <div className="performance-summary">
                <div className="summary-item">
                  <span className="label">{i18n.t('portfolio.totalValue')}</span>
                  <span className="value">{formatCurrency(performance.summary.currentValue)}</span>
                </div>
                
                <div className="summary-item">
                  <span className="label">{`${timePeriod} ${i18n.t('portfolio.profitLoss')}`}</span>
                  <span className="value" style={{ 
                    color: performance.summary.absoluteChange >= 0 ? '#00c853' : '#ff1744'
                  }}>
                    {formatCurrency(performance.summary.absoluteChange)}
                    <span className="percentage">
                      ({performance.summary.percentageChange.toFixed(2)}%)
                    </span>
                  </span>
                </div>
              </div>
              
              <div className="performance-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={performance.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: isDarkMode ? '#aaa' : '#666' }}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return timePeriod === 'day' 
                          ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                      }}
                    />
                    <YAxis 
                      tick={{ fill: isDarkMode ? '#aaa' : '#666' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                    />
                    <Tooltip content={<PerformanceTooltip />} />
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2962FF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2962FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2962FF" 
                      fillOpacity={1}
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          
          {/* Transactions tab */}
          {activeTab === 'transactions' && (
            <div className="transactions-container">
              <div className="transactions-header">
                <h2>{i18n.t('portfolio.transactions')}</h2>
                <button className="add-button" onClick={handleAddTransaction}>
                  <IconWrapper icon={FiPlus} size={16} />
                  {i18n.t('portfolio.addTransaction')}
                </button>
              </div>
              
              {transactions.length > 0 ? (
                <div className="transactions-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{i18n.t('portfolio.date')}</th>
                        <th>{i18n.t('portfolio.symbol')}</th>
                        <th>{i18n.t('portfolio.transactionType')}</th>
                        <th>{i18n.t('portfolio.quantity')}</th>
                        <th>{i18n.t('portfolio.price')}</th>
                        <th>{i18n.t('portfolio.total')}</th>
                        <th>{i18n.t('portfolio.fee')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td>{formatDate(transaction.date)}</td>
                          <td>{transaction.symbol}</td>
                          <td className={transaction.type === 'buy' ? 'buy-type' : 'sell-type'}>
                            {transaction.type === 'buy' 
                              ? i18n.t('portfolio.buy') 
                              : i18n.t('portfolio.sell')}
                          </td>
                          <td>{transaction.quantity}</td>
                          <td>{formatCurrency(transaction.price)}</td>
                          <td>{formatCurrency(transaction.total)}</td>
                          <td>{formatCurrency(transaction.fee)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <p>{i18n.t('portfolio.noTransactions')}</p>
                  <button className="add-button" onClick={handleAddTransaction}>
                    <IconWrapper icon={FiPlus} size={16} />
                    {i18n.t('portfolio.addTransaction')}
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Assets distribution tab */}
          {activeTab === 'assets' && (
            <div className="assets-container">
              <div className="assets-header">
                <h2>{i18n.t('portfolio.distribution')}</h2>
              </div>
              
              {positions.length > 0 ? (
                <div className="assets-chart">
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={prepareDistributionData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={150}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {prepareDistributionData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="assets-legend">
                    {prepareDistributionData().map((entry, index) => (
                      <div key={`legend-${index}`} className="legend-item">
                        <div 
                          className="color-box" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="asset-name">{entry.name}</span>
                        <span className="asset-value">{formatCurrency(entry.value)}</span>
                        <span className="asset-percentage">
                          ({((entry.value / totalValue) * 100).toFixed(2)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <p>{i18n.t('portfolio.noPositions')}</p>
                  <button className="add-button" onClick={handleAddPosition}>
                    <IconWrapper icon={FiPlus} size={16} />
                    {i18n.t('portfolio.addPosition')}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>{i18n.t('loading')}</p>
        </div>
      )}
      
      {/* Placeholder for position modal (implement later) */}
      {showAddPositionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              {editingPosition 
                ? i18n.t('portfolio.edit') 
                : i18n.t('portfolio.addPosition')}
            </h2>
            {/* Form will be implemented here */}
            <div className="modal-actions">
              <button 
                className="cancel-button" 
                onClick={() => {
                  setShowAddPositionModal(false);
                  setEditingPosition(null);
                }}
              >
                {i18n.t('portfolio.cancel')}
              </button>
              <button className="confirm-button">
                {i18n.t('portfolio.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Placeholder for transaction modal (implement later) */}
      {showAddTransactionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{i18n.t('portfolio.addTransaction')}</h2>
            {/* Form will be implemented here */}
            <div className="modal-actions">
              <button 
                className="cancel-button" 
                onClick={() => setShowAddTransactionModal(false)}
              >
                {i18n.t('portfolio.cancel')}
              </button>
              <button className="confirm-button">
                {i18n.t('portfolio.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio; 