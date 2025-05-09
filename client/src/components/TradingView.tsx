// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Chart from './Chart';
import i18n from '../i18n';
import { 
  FiBarChart2, FiTrendingUp, FiClock, FiSettings, 
  FiSearch, FiPlus, FiMinus, FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import IconWrapper from './IconWrapper';
import { useTheme } from '../contexts/ThemeContext';
import './styles/TradingView.css';

interface ChartDataPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const TradingView: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const symbol = searchParams.get('symbol') || 'BTC/USD';
  const { isDarkMode } = useTheme();
  
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');
  const [timeframe, setTimeframe] = useState('1H');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [orderType, setOrderType] = useState('market');
  const [orderSide, setOrderSide] = useState('buy');
  const [orderAmount, setOrderAmount] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  
  // Timeframe options
  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'];
  
  // Generate mock data on mount
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const data = generateMockChartData();
      setChartData(data);
      
      // Set current price to last candle close
      if (data.length > 0) {
        const lastCandle = data[data.length - 1];
        const firstCandle = data[0];
        
        setCurrentPrice(lastCandle.close);
        setPriceChange(lastCandle.close - firstCandle.open);
        setPriceChangePercent((priceChange / firstCandle.open) * 100);
      }
      
      setIsLoading(false);
    }, 1000);
  }, [symbol, timeframe]);
  
  // Generate mock chart data
  const generateMockChartData = (): ChartDataPoint[] => {
    const data: ChartDataPoint[] = [];
    const now = new Date();
    let basePrice = symbol.includes('BTC') ? 65000 : 
                   symbol.includes('ETH') ? 3500 :
                   symbol.includes('SPX') ? 5600 : 1000;
    
    // Create a slight trend direction based on symbol
    const trendStrength = 0.001;
    const trendDirection = symbol.includes('BTC') || symbol.includes('ETH') ? 1 : -0.5;
    
    // Generate candles based on timeframe
    const candleCount = 120; // 120 candles
    
    for (let i = candleCount - 1; i >= 0; i--) {
      const date = new Date();
      
      // Adjust date based on timeframe
      if (timeframe === '1m') date.setMinutes(now.getMinutes() - i);
      else if (timeframe === '5m') date.setMinutes(now.getMinutes() - i * 5);
      else if (timeframe === '15m') date.setMinutes(now.getMinutes() - i * 15);
      else if (timeframe === '1H') date.setHours(now.getHours() - i);
      else if (timeframe === '4H') date.setHours(now.getHours() - i * 4);
      else if (timeframe === '1D') date.setDate(now.getDate() - i);
      else if (timeframe === '1W') date.setDate(now.getDate() - i * 7);
      else if (timeframe === '1M') date.setMonth(now.getMonth() - i);
      
      // Random movement with slight trend
      const randomFactor = Math.random() * 0.02 - 0.01; // -1% to +1%
      const trendFactor = trendDirection * trendStrength * i; // Applying trend
      
      const change = basePrice * (randomFactor + trendFactor);
      basePrice += change;
      
      // Generate candle data
      const range = basePrice * 0.01; // 1% range between high and low
      const open = basePrice - (range / 4) + (Math.random() * range / 2);
      const close = basePrice;
      const high = Math.max(open, close) + (Math.random() * range / 2);
      const low = Math.min(open, close) - (Math.random() * range / 2);
      const volume = Math.random() * 100000 + 50000;
      
      data.push({
        time: date.getTime(),
        open,
        high,
        low,
        close,
        volume
      });
    }
    
    return data;
  };
  
  // Format price with appropriate decimal places
  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 1) return price.toFixed(2);
    return price.toFixed(6);
  };
  
  // Format change percentage
  const formatChangePercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };
  
  // Handle order submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit the order to the API
    alert(`Order placed: ${orderSide.toUpperCase()} ${orderAmount} ${symbol} at ${orderType === 'market' ? 'market price' : `$${orderPrice}`}`);
    
    // Reset form
    setOrderAmount('');
    setOrderPrice('');
  };
  
  return (
    <div className={`trading-view ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Trading header */}
      <div className="trading-header">
        <div className="symbol-info">
          <h1>{symbol}</h1>
          <div className={`price-info ${priceChangePercent >= 0 ? 'positive' : 'negative'}`}>
            <span className="current-price">${formatPrice(currentPrice)}</span>
            <span className="price-change">
              ${formatPrice(priceChange)} ({formatChangePercent(priceChangePercent)})
            </span>
          </div>
        </div>
        
        <div className="chart-controls">
          {/* Chart type buttons */}
          <div className="control-group">
            <button 
              className={`chart-type-button ${chartType === 'line' ? 'active' : ''}`}
              onClick={() => setChartType('line')}
              title={i18n.t('lineChart')}
            >
              <IconWrapper icon={FiTrendingUp} size={16} />
            </button>
            <button 
              className={`chart-type-button ${chartType === 'area' ? 'active' : ''}`}
              onClick={() => setChartType('area')}
              title={i18n.t('areaChart')}
            >
              <IconWrapper icon={FiBarChart2} size={16} />
            </button>
            <button 
              className={`chart-type-button ${chartType === 'bar' ? 'active' : ''}`}
              onClick={() => setChartType('bar')}
              title={i18n.t('barChart')}
            >
              <IconWrapper icon={FiBarChart2} size={16} />
            </button>
          </div>
          
          {/* Timeframe buttons */}
          <div className="timeframe-selector">
            {timeframes.map(tf => (
              <button 
                key={tf}
                className={`timeframe-button ${timeframe === tf ? 'active' : ''}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Chart settings */}
          <button className="chart-settings-button">
            <IconWrapper icon={FiSettings} size={16} />
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="trading-content">
        <div className="trading-main">
          {/* Chart container */}
          <div className="chart-container">
            {isLoading ? (
              <div className="chart-loading">
                <div className="chart-spinner"></div>
                <p>{i18n.t('loading')}</p>
              </div>
            ) : (
              <Chart 
                data={chartData}
                symbol={symbol}
                type={chartType}
                height={500}
                indicators={['vol']}
              />
            )}
          </div>
        </div>
        
        {/* Trading sidebar */}
        <div className="trading-sidebar">
          {/* Order form */}
          <div className="order-panel">
            <div className="order-tabs">
              <button 
                className={`order-tab ${orderSide === 'buy' ? 'active buy' : ''}`}
                onClick={() => setOrderSide('buy')}
              >
                {i18n.t('buy')}
              </button>
              <button 
                className={`order-tab ${orderSide === 'sell' ? 'active sell' : ''}`}
                onClick={() => setOrderSide('sell')}
              >
                {i18n.t('sell')}
              </button>
            </div>
            
            <div className="order-type-selector">
              <button 
                className={`order-type-button ${orderType === 'market' ? 'active' : ''}`}
                onClick={() => setOrderType('market')}
              >
                {i18n.t('market')}
              </button>
              <button 
                className={`order-type-button ${orderType === 'limit' ? 'active' : ''}`}
                onClick={() => setOrderType('limit')}
              >
                {i18n.t('limit')}
              </button>
            </div>
            
            <form className="order-form" onSubmit={handleOrderSubmit}>
              <div className="form-group">
                <label>{i18n.t('amount')}</label>
                <div className="input-with-icon">
                  <input 
                    type="number" 
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(e.target.value)}
                    min="0.0001"
                    step="0.0001"
                    required
                  />
                  <span className="input-suffix">{symbol.split('/')[0]}</span>
                </div>
              </div>
              
              {orderType === 'limit' && (
                <div className="form-group">
                  <label>{i18n.t('price')}</label>
                  <div className="input-with-icon">
                    <input 
                      type="number"
                      value={orderPrice}
                      onChange={(e) => setOrderPrice(e.target.value)}
                      min="0.0001"
                      step="0.0001"
                      required
                    />
                    <span className="input-suffix">{symbol.split('/')[1]}</span>
                  </div>
                </div>
              )}
              
              <div className="order-buttons">
                <button 
                  type="submit" 
                  className={`order-button ${orderSide === 'buy' ? 'buy-button' : 'sell-button'}`}
                >
                  {orderSide === 'buy' ? 
                    <>{i18n.t('buy')} {symbol.split('/')[0]}</> : 
                    <>{i18n.t('sell')} {symbol.split('/')[0]}</>
                  }
                </button>
              </div>
            </form>
            
            <div className="order-summary">
              <div className="summary-row">
                <span>{i18n.t('available')}:</span>
                <span>
                  {orderSide === 'buy' ? 
                    `$10,000.00 ${symbol.split('/')[1]}` : 
                    `5.0000 ${symbol.split('/')[0]}`
                  }
                </span>
              </div>
              {orderAmount && (
                <div className="summary-row">
                  <span>{i18n.t('total')}:</span>
                  <span>
                    ${formatPrice(
                      parseFloat(orderAmount) * (orderType === 'limit' && orderPrice ? parseFloat(orderPrice) : currentPrice)
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Market information */}
          <div className="market-info-panel">
            <h3>{i18n.t('marketInfo')}</h3>
            <div className="info-row">
              <span>{i18n.t('24hHigh')}</span>
              <span>${formatPrice(currentPrice * 1.05)}</span>
            </div>
            <div className="info-row">
              <span>{i18n.t('24hLow')}</span>
              <span>${formatPrice(currentPrice * 0.95)}</span>
            </div>
            <div className="info-row">
              <span>{i18n.t('24hVolume')}</span>
              <span>${formatPrice(Math.random() * 1000000000)}</span>
            </div>
            <div className="info-row">
              <span>{i18n.t('marketCap')}</span>
              <span>${formatPrice(Math.random() * 1000000000000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingView; 