import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TradingView from './TradingView';
import i18n from '../i18n';
import { FiStar, FiSearch, FiX, FiArrowUp, FiArrowDown, FiFilter, FiRefreshCw } from 'react-icons/fi';
import IconWrapper from './IconWrapper';
import { useTheme } from '../contexts/ThemeContext';
import { API } from '../services/api';
import './styles/TradingPage.css';

interface MarketItem {
  id?: string;
  symbol: string;
  price: number;
  change: number;
  volume?: number;
  marketCap?: number;
  favorite?: boolean;
  baseAsset?: string;
  quoteAsset?: string;
  high24h?: number;
  low24h?: number;
}

// Function to extract query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TradingPage: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  // Get symbol from URL or use default
  const symbolParam = query.get('symbol');
  
  const [marketList, setMarketList] = useState<MarketItem[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<MarketItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch markets data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Get all markets
        const marketsData = await API.markets.getMarkets();
        const markets = Array.isArray(marketsData) ? marketsData : [];
        
        // Get favorites from localStorage
        const savedFavorites = localStorage.getItem('favorites');
        const favs = savedFavorites ? JSON.parse(savedFavorites) : [];
        setFavorites(favs);
        
        // Format market data
        const formattedMarkets: MarketItem[] = markets.map((market: any) => ({
          id: market.id,
          symbol: market.symbol,
          price: market.price,
          change: market.change,
          volume: market.volume,
          marketCap: market.marketCap,
          favorite: favs.includes(market.symbol),
          baseAsset: market.baseAsset,
          quoteAsset: market.quoteAsset,
          high24h: market.high24h,
          low24h: market.low24h
        }));
        
        setMarketList(formattedMarkets);
        
        // Set selected market based on URL parameter or default to BTC/USD
        const symbolToSelect = symbolParam || 'BTC/USD';
        const marketToSelect = formattedMarkets.find((m: MarketItem) => m.symbol === symbolToSelect) || formattedMarkets[0];
        
        if (marketToSelect) {
          setSelectedMarket(marketToSelect);
          // Update URL if needed
          if (!symbolParam && marketToSelect.symbol) {
            navigate(`/trading?symbol=${marketToSelect.symbol}`, { replace: true });
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading markets:", error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [symbolParam, navigate]);
  
  const toggleFavorite = (symbol: string, event: React.MouseEvent) => {
    // Prevent the click from selecting the market
    event.stopPropagation();
    
    const newFavorites = favorites.includes(symbol)
      ? favorites.filter(s => s !== symbol)
      : [...favorites, symbol];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    // Update market list to reflect favorite status
    setMarketList(marketList.map(market => {
      if (market.symbol === symbol) {
        return { ...market, favorite: !market.favorite };
      }
      return market;
    }));
  };
  
  const handleMarketSelect = (market: MarketItem) => {
    setSelectedMarket(market);
    // Update URL when selecting a market
    navigate(`/trading?symbol=${market.symbol}`, { replace: true });
  };
  
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const marketsData = await API.markets.getMarkets();
      const markets = Array.isArray(marketsData) ? marketsData : [];
      
      const formattedMarkets: MarketItem[] = markets.map((market: any) => ({
        id: market.id,
        symbol: market.symbol,
        price: market.price,
        change: market.change,
        volume: market.volume,
        marketCap: market.marketCap,
        favorite: favorites.includes(market.symbol),
        baseAsset: market.baseAsset,
        quoteAsset: market.quoteAsset,
        high24h: market.high24h,
        low24h: market.low24h
      }));
      
      setMarketList(formattedMarkets);
      
      // Update selected market with fresh data
      if (selectedMarket) {
        const updatedMarket = formattedMarkets.find((m: MarketItem) => m.symbol === selectedMarket.symbol);
        if (updatedMarket) {
          setSelectedMarket(updatedMarket);
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
      setIsLoading(false);
    }
  };
  
  // Filter and search logic
  const getFilteredMarkets = () => {
    let filtered = [...marketList];
    
    // Apply filter
    if (filter === 'favorites') {
      filtered = filtered.filter(market => favorites.includes(market.symbol));
    }
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(market => 
        market.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  const filteredMarkets = getFilteredMarkets();
  
  // Format price with appropriate decimal places
  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 1) return price.toFixed(2);
    return price.toFixed(6);
  };
  
  // Format change percentage
  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };
  
  return (
    <div className={`trading-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="trading-page-header">
        <h1>{i18n.t('tradingView')}</h1>
        {selectedMarket && (
          <div className="selected-market-info">
            <h2>{selectedMarket.symbol}</h2>
            <div className={`market-change ${selectedMarket.change >= 0 ? 'positive' : 'negative'}`}>
              <span className="change-icon">
                {selectedMarket.change >= 0 ? <IconWrapper icon={FiArrowUp} /> : <IconWrapper icon={FiArrowDown} />}
              </span>
              {formatChange(selectedMarket.change)}
            </div>
          </div>
        )}
      </div>
      
      <div className="trading-page-content">
        <div className="markets-sidebar">
          <div className="markets-tools">
            <div className="markets-filter">
              <button 
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`} 
                onClick={() => setFilter('all')}
              >
                {i18n.t('allMarkets')}
              </button>
              <button 
                className={`filter-tab ${filter === 'favorites' ? 'active' : ''}`} 
                onClick={() => setFilter('favorites')}
              >
                {i18n.t('favorites')}
              </button>
            </div>
            
            <div className="market-search">
              <div className="search-input-wrapper">
                <IconWrapper icon={FiSearch} size={16} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={i18n.t('search')} 
                />
                {searchQuery && (
                  <button 
                    className="clear-button" 
                    onClick={() => setSearchQuery('')}
                  >
                    <IconWrapper icon={FiX} size={16} />
                  </button>
                )}
              </div>
              
              <button 
                className="refresh-button"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <IconWrapper icon={FiRefreshCw} size={16} className={isLoading ? 'spinning' : ''} />
              </button>
            </div>
          </div>
          
          <div className="market-list">
            {isLoading ? (
              <div className="loading-markets">
                <div className="spinner"></div>
                <p>{i18n.t('loading')}</p>
              </div>
            ) : filteredMarkets.length > 0 ? (
              filteredMarkets.map(market => (
                <div 
                  key={market.symbol} 
                  className={`market-item ${selectedMarket?.symbol === market.symbol ? 'active' : ''}`}
                  onClick={() => handleMarketSelect(market)}
                >
                  <div className="market-symbol">
                    <span 
                      className={`favorite-icon ${market.favorite ? 'active' : ''}`}
                      onClick={(e) => toggleFavorite(market.symbol, e)}
                    >
                      <IconWrapper icon={FiStar} size={16} />
                    </span>
                    <span>{market.symbol}</span>
                  </div>
                  <div className="market-details">
                    <div className="market-price">${formatPrice(market.price)}</div>
                    <div className={`market-change ${market.change >= 0 ? 'positive' : 'negative'}`}>
                      {formatChange(market.change)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-markets">
                {filter === 'favorites' ? i18n.t('noFavorites') : i18n.t('noMarketsFound')}
              </div>
            )}
          </div>
          
          <div className="page-count">
            {i18n.t('showing')} {filteredMarkets.length} {i18n.t('of')} {marketList.length} {i18n.t('markets')}
          </div>
        </div>
        
        <div className="main-content">
          {selectedMarket && (
            <TradingView symbol={selectedMarket.symbol} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingPage; 