import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n';
import { FiArrowUp, FiArrowDown, FiStar, FiFilter, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { API } from '../services/api';
import './styles/MarketOverview.css';
import IconWrapper from './IconWrapper';

interface Market {
  id: string;
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  high24h: number;
  low24h: number;
}

const MarketOverview: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('crypto');
  const [markets, setMarkets] = useState<Market[]>([]);
  const [filteredMarkets, setFilteredMarkets] = useState<Market[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'marketCap',
    direction: 'desc'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [changeFilter, setChangeFilter] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch market data on component mount and category change
  useEffect(() => {
    const fetchMarkets = async () => {
      setIsLoading(true);
      try {
        let marketData: Market[] = [];
        
        switch(activeCategory) {
          case 'crypto':
            marketData = await API.markets.getCryptoMarkets();
            break;
          case 'forex':
            marketData = await API.markets.getForexMarkets();
            break;
          case 'stocks':
            marketData = await API.markets.getStockMarkets();
            break;
          case 'all':
            marketData = await API.markets.getMarkets();
            break;
          default:
            marketData = await API.markets.getCryptoMarkets();
        }
        
        setMarkets(marketData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching markets:', error);
        setIsLoading(false);
      }
    };
    
    fetchMarkets();
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [activeCategory]);

  // Apply filtering and sorting
  useEffect(() => {
    let result = [...markets];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(market => 
        market.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply favorites filter
    if (showFavoritesOnly) {
      result = result.filter(market => favorites.includes(market.symbol));
    }
    
    // Apply price filter
    if (priceFilter.min !== '') {
      result = result.filter(market => market.price >= parseFloat(priceFilter.min));
    }
    
    if (priceFilter.max !== '') {
      result = result.filter(market => market.price <= parseFloat(priceFilter.max));
    }
    
    // Apply change filter
    if (changeFilter.min !== '') {
      result = result.filter(market => market.change >= parseFloat(changeFilter.min));
    }
    
    if (changeFilter.max !== '') {
      result = result.filter(market => market.change <= parseFloat(changeFilter.max));
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key as keyof Market] < b[sortConfig.key as keyof Market]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof Market] > b[sortConfig.key as keyof Market]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredMarkets(result);
  }, [markets, searchQuery, sortConfig, favorites, showFavoritesOnly, priceFilter, changeFilter]);

  const handleSort = (key: string) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const toggleFavorite = (symbol: string) => {
    const newFavorites = favorites.includes(symbol)
      ? favorites.filter(fav => fav !== symbol)
      : [...favorites, symbol];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const navigateToTradingView = (symbol: string) => {
    navigate(`/trading?symbol=${symbol}`);
  };

  const handleRefresh = () => {
    // Trigger the data fetching effect by changing and reverting activeCategory
    const currentCategory = activeCategory;
    setActiveCategory('refresh');
    setTimeout(() => setActiveCategory(currentCategory), 10);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceFilter({ min: '', max: '' });
    setChangeFilter({ min: '', max: '' });
    setShowFavoritesOnly(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className={`market-overview ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="market-header">
        <h1>{i18n.t('market.overview')}</h1>
        <p>{i18n.t('market.subtitle')}</p>
      </div>
      
      <div className="market-tools">
        <div className="category-tabs">
          <button 
            className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            {i18n.t('all')}
          </button>
          <button 
            className={`category-tab ${activeCategory === 'crypto' ? 'active' : ''}`}
            onClick={() => setActiveCategory('crypto')}
          >
            {i18n.t('crypto')}
          </button>
          <button 
            className={`category-tab ${activeCategory === 'forex' ? 'active' : ''}`}
            onClick={() => setActiveCategory('forex')}
          >
            {i18n.t('forex')}
          </button>
          <button 
            className={`category-tab ${activeCategory === 'stocks' ? 'active' : ''}`}
            onClick={() => setActiveCategory('stocks')}
          >
            {i18n.t('stocks')}
          </button>
        </div>
        
        <div className="market-actions">
          <div className="search-input">
            <IconWrapper icon={FiSearch} size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={i18n.t('search')}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                ×
              </button>
            )}
          </div>
          
          <button 
            className={`favorites-button ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <IconWrapper icon={FiStar} size={18} />
            {i18n.t('favorites')}
          </button>
          
          <button 
            className={`filter-button ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <IconWrapper icon={FiFilter} size={18} />
            {i18n.t('filter')}
          </button>
          
          <button className="refresh-button" onClick={handleRefresh}>
            <IconWrapper icon={FiRefreshCw} size={18} />
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group">
            <h3>{i18n.t('price')}</h3>
            <div className="range-inputs">
              <input 
                type="number" 
                placeholder={i18n.t('min')}
                value={priceFilter.min}
                onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })}
              />
              <span>-</span>
              <input 
                type="number" 
                placeholder={i18n.t('max')}
                value={priceFilter.max}
                onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })}
              />
            </div>
            </div>
            
          <div className="filter-group">
            <h3>{i18n.t('change24h')}</h3>
            <div className="range-inputs">
              <input 
                type="number" 
                placeholder={i18n.t('min')}
                value={changeFilter.min}
                onChange={(e) => setChangeFilter({ ...changeFilter, min: e.target.value })}
              />
              <span>-</span>
              <input 
                type="number" 
                placeholder={i18n.t('max')}
                value={changeFilter.max}
                onChange={(e) => setChangeFilter({ ...changeFilter, max: e.target.value })}
              />
              </div>
          </div>
          
          <button className="clear-filters" onClick={clearFilters}>
            {i18n.t('clearFilters')}
          </button>
          </div>
        )}
        
      <div className="market-table-container">
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>{i18n.t('loading')}</p>
            </div>
        ) : (
          <>
            <table className="market-table">
              <thead>
                <tr>
                  <th className="favorite-column"></th>
                  <th onClick={() => handleSort('symbol')} className="sortable">
                    {i18n.t('symbol')}
                    {sortConfig.key === 'symbol' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('price')} className="sortable">
                    {i18n.t('price')}
                    {sortConfig.key === 'price' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('change')} className="sortable">
                    {i18n.t('change24h')}
                    {sortConfig.key === 'change' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('volume')} className="sortable">
                    {i18n.t('volume')}
                    {sortConfig.key === 'volume' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('marketCap')} className="sortable">
                    {i18n.t('marketCap')}
                    {sortConfig.key === 'marketCap' && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th>{i18n.t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredMarkets.length > 0 ? (
                  filteredMarkets.map((market) => (
                    <tr key={market.id} className="market-row">
                      <td className="favorite-cell">
                        <button 
                          className={`favorite-button ${favorites.includes(market.symbol) ? 'active' : ''}`}
                          onClick={() => toggleFavorite(market.symbol)}
                        >
                          <IconWrapper icon={FiStar} size={16} />
                        </button>
                      </td>
                      <td className="symbol-cell">
                        <span className="market-symbol">{market.symbol}</span>
                        <span className="market-name">{market.baseAsset}/{market.quoteAsset}</span>
                      </td>
                      <td className="price-cell">
                        ${market.price.toFixed(2)}
                      </td>
                      <td className={`change-cell ${market.change >= 0 ? 'positive' : 'negative'}`}>
                        <span className="change-icon">
                          {market.change >= 0 ? <IconWrapper icon={FiArrowUp} /> : <IconWrapper icon={FiArrowDown} />}
                        </span>
                        {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}%
                      </td>
                      <td className="volume-cell">
                        ${market.volume.toLocaleString()}
                      </td>
                      <td className="market-cap-cell">
                        ${market.marketCap.toLocaleString()}
                      </td>
                      <td className="action-cell">
                        <button 
                          className="trade-button"
                          onClick={() => navigateToTradingView(market.symbol)}
                        >
                          {i18n.t('trade')}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="no-results">
                      {i18n.t('noResults')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            <div className="market-stats">
              <div className="stat-item">
                <span className="stat-label">{i18n.t('totalMarkets')}</span>
                <span className="stat-value">{markets.length}</span>
                </div>
              <div className="stat-item">
                <span className="stat-label">{i18n.t('showing')}</span>
                <span className="stat-value">{filteredMarkets.length}</span>
                </div>
              <div className="stat-item">
                <span className="stat-label">{i18n.t('lastUpdated')}</span>
                <span className="stat-value">{new Date().toLocaleTimeString()}</span>
              </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MarketOverview; 