import axios from 'axios';

// Get API URL from environment variables or use a default
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

// Define interfaces
export interface OrderBookEntry {
  price: number;
  amount: number;
}

export interface OrderBook {
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
}

export interface Trade {
  id: string;
  time: string;
  timestamp: number;
  price: number;
  amount: number;
  type: string;
}

export interface ChartDataPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Market {
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

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Position {
  id: string;
  symbol: string;
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface PortfolioResponse {
  positions: Position[];
  totalValue: number;
  totalProfitLoss: number;
  profitLossPercentage: number;
}

// Add NewsItem interface
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  source: string;
  published: string;
  url: string;
}

// Set up axios instance with proper error handling
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Set a timeout to prevent hanging requests
});

// Add token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message || 'Unknown error');
    // Always use simulated data when in development
    return Promise.reject(error);
  }
);

// Always use simulated data for now to avoid backend dependency
const ALWAYS_USE_SIMULATED_DATA = true;

// Generate mock user for development
const mockUser = {
  id: 'user-1',
  name: 'Demo User',
  email: 'demo@trinity.com',
  avatar: ''
};

// API modules
export const API = {
  auth: {
    login: async (email: string, password: string) => {
      if (ALWAYS_USE_SIMULATED_DATA) {
        return {
          token: 'mock-token',
          user: mockUser
        };
      }
      return apiClient.post('/auth/login', { email, password });
    },
    register: async (name: string, email: string, password: string) => {
      if (ALWAYS_USE_SIMULATED_DATA) {
        return {
          token: 'mock-token',
          user: mockUser
        };
      }
      return apiClient.post('/auth/register', { name, email, password });
    },
    logout: async () => {
      if (ALWAYS_USE_SIMULATED_DATA) {
        return { success: true };
      }
      return apiClient.post('/auth/logout');
    },
    getUser: async () => {
      if (ALWAYS_USE_SIMULATED_DATA) {
        return { data: { user: mockUser } };
      }
      return apiClient.get('/auth/user');
    },
    checkAuth: async () => {
      if (ALWAYS_USE_SIMULATED_DATA) {
        return { data: { isAuthenticated: true } };
      }
      return apiClient.get('/auth/check-auth');
    }
  },
  
  market: {
    getAll: async () => {
      if (ALWAYS_USE_SIMULATED_DATA) {
        return generateSimulatedMarkets();
      }
      const response = await apiClient.get('/markets');
      return response.data;
    },
    getCrypto: async () => {
      if (ALWAYS_USE_SIMULATED_DATA) {
        return generateSimulatedMarkets();
      }
      const response = await apiClient.get('/markets/crypto');
      return response.data;
    },
    getMarket: async (symbol: string) => {
      if (ALWAYS_USE_SIMULATED_DATA) {
        const markets = generateSimulatedMarkets();
        return markets.find(m => m.symbol === symbol) || markets[0];
      }
      const response = await apiClient.get(`/markets/${symbol}`);
      return response.data;
    }
  },
  
  markets: {
    getMarkets: async (): Promise<Market[]> => {
        return generateSimulatedMarkets();
    },
    getCryptoMarkets: async (): Promise<Market[]> => {
      return generateSimulatedMarkets().filter(m => m.symbol.includes('BTC') || m.symbol.includes('ETH'));
    },
    getStockMarkets: async (): Promise<Market[]> => {
        return [];
    },
    getForexMarkets: async (): Promise<Market[]> => {
        return [];
    },
    getMarketById: async (symbol: string): Promise<Market> => {
      return API.markets.getMarket(symbol);
    },
    getMarket: async (symbol: string): Promise<Market> => {
        const market = generateSimulatedMarkets().find(m => m.symbol === symbol);
        if (!market) {
          throw new Error(`Market ${symbol} not found`);
        }
        return market;
    }
  },
  
  chart: {
    getChartData: async (symbol: string, interval: string, limit: number = 100): Promise<ChartDataPoint[]> => {
        return generateSimulatedChartData(limit);
    }
  },
  
  order: {
    getOrderBook: async (symbol: string): Promise<OrderBook> => {
        return generateSimulatedOrderBook();
    },
    
    getRecentTrades: async (symbol: string): Promise<Trade[]> => {
        return generateSimulatedTrades();
    },
    
    placeOrder: async (orderData: any) => {
      return { success: true, order: { ...orderData, id: `order-${Date.now()}` } };
    }
  },
  
  portfolio: {
    getPositions: async () => {
      return [];
    },
    
    getPerformance: async (period: string) => {
      return {
        data: Array(30).fill(0).map((_, i) => ({
          time: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          value: 10000 + Math.random() * 5000
        }))
      };
    },
    
    getPortfolio: async (): Promise<PortfolioResponse> => {
        return {
          positions: [],
          totalValue: 0,
          totalProfitLoss: 0,
          profitLossPercentage: 0
        };
    },
    
    getTransactions: async (): Promise<Transaction[]> => {
        return [];
    },
    
    deletePosition: async (positionId: string) => {
      return { success: true };
    }
  },
  
  user: {
    getProfile: async () => {
      return { user: mockUser };
    },
    
    updateProfile: async (profileData: any) => {
      return { user: { ...mockUser, ...profileData } };
    },
    
    getWatchlist: async () => {
      return { watchlist: generateSimulatedMarkets().slice(0, 5) };
    },
    
    addToWatchlist: async (symbol: string) => {
      return { success: true };
    },
    
    removeFromWatchlist: async (symbol: string) => {
      return { success: true };
    }
  },

  // news namespace for news page
  news: {
    getLatestNews: async (limit: number): Promise<NewsItem[]> => {
      const news: NewsItem[] = [
        {
          id: '1',
          title: 'Bitcoin Hits New All-Time High',
          summary: 'Bitcoin has reached a new all-time high price today.',
          content: 'The world\'s largest cryptocurrency by market capitalization has surged to unprecedented levels, breaking previous records.',
          category: 'crypto',
          image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          source: 'Crypto News',
          published: new Date().toISOString(),
          url: '#'
        },
        {
          id: '2',
          title: 'Stock Markets Rally on Economic Recovery Hopes',
          summary: 'Global stock markets are rallying as economic data shows signs of recovery.',
          content: 'Investor sentiment has improved significantly following encouraging economic indicators that point to a robust recovery.',
          category: 'stocks',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          source: 'Market Watch',
          published: new Date().toISOString(),
          url: '#'
        },
        {
          id: '3',
          title: 'Central Banks Consider Digital Currencies',
          summary: 'Major central banks are exploring the possibility of issuing digital currencies.',
          content: 'The move towards central bank digital currencies (CBDCs) represents a significant shift in monetary policy strategy.',
          category: 'finance',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          source: 'Financial Times',
          published: new Date().toISOString(),
          url: '#'
        }
      ];
      return news.slice(0, limit);
    },
    searchNews: async (query: string): Promise<NewsItem[]> => {
        return [];
    },
    getNewsByCategory: async (category: string, limit: number): Promise<NewsItem[]> => {
        return [];
    }
  }
};

// Helper functions to generate simulated data
function generateSimulatedOrderBook(): OrderBook {
  const asks = [];
  const bids = [];
  
  const basePrice = 38500;
  
  // Generate 10 asks (sell orders) above the base price
  for (let i = 0; i < 10; i++) {
    asks.push({
      price: basePrice + (i * 10) + Math.random() * 5,
      amount: Math.random() * 2 + 0.1
    });
  }
  
  // Generate 10 bids (buy orders) below the base price
  for (let i = 0; i < 10; i++) {
    bids.push({
      price: basePrice - (i * 10) - Math.random() * 5,
      amount: Math.random() * 2 + 0.1
    });
  }
  
  // Sort asks ascending and bids descending by price
  asks.sort((a, b) => a.price - b.price);
  bids.sort((a, b) => b.price - a.price);
  
  return { asks, bids };
}

function generateSimulatedTrades(): Trade[] {
  const trades = [];
  const basePrice = 38500;
  const now = Date.now();
  
  for (let i = 0; i < 15; i++) {
    const price = basePrice + (Math.random() * 200 - 100);
    const amount = Math.random() * 2 + 0.01;
    const timestamp = now - (i * 30000); // 30 seconds apart
    const date = new Date(timestamp);
    
    trades.push({
      id: `t-${i}`,
      time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      timestamp,
      price,
      amount,
      type: Math.random() > 0.5 ? 'buy' : 'sell'
    });
  }
  
  return trades;
}

function generateSimulatedChartData(limit: number = 100): ChartDataPoint[] {
  const data = [];
  const now = Date.now();
  let price = 38500;
  
  for (let i = 0; i < limit; i++) {
    // Random price movement
    price = price + (Math.random() * 100 - 50);
    
    // Create random candle data
    const open = price;
    const high = open + Math.random() * 50;
    const low = open - Math.random() * 50;
    const close = low + Math.random() * (high - low);
    const volume = Math.random() * 1000 + 100;
    
    data.unshift({
      time: now - (i * 3600000), // 1 hour intervals
      open,
      high,
      low,
      close,
      volume
    });
  }
  
  return data;
}

// Simüle edilmiş piyasa verileri oluştur
function generateSimulatedMarkets(): Market[] {
  const cryptoSymbols = [
    {symbol: 'BTC/USD', name: 'Bitcoin', basePrice: 38000},
    {symbol: 'ETH/USD', name: 'Ethereum', basePrice: 2500},
    {symbol: 'XRP/USD', name: 'Ripple', basePrice: 0.5},
    {symbol: 'LTC/USD', name: 'Litecoin', basePrice: 100},
    {symbol: 'ADA/USD', name: 'Cardano', basePrice: 0.3},
    {symbol: 'SOL/USD', name: 'Solana', basePrice: 100},
    {symbol: 'DOT/USD', name: 'Polkadot', basePrice: 5},
    {symbol: 'AVAX/USD', name: 'Avalanche', basePrice: 15},
    {symbol: 'LINK/USD', name: 'Chainlink', basePrice: 8},
    {symbol: 'MATIC/USD', name: 'Polygon', basePrice: 0.8},
  ];
  
  return cryptoSymbols.map((crypto, index) => {
    const change = (Math.random() * 10) - 5; // -5% to +5%
    const price = crypto.basePrice * (1 + change/100);
    const volume = Math.random() * 1000000000 + 100000000;
    const marketCap = price * (Math.random() * 100000000 + 10000000);
    
    return {
      id: `market-${index}`,
      symbol: crypto.symbol,
      baseAsset: crypto.symbol.split('/')[0],
      quoteAsset: 'USD',
      price,
      change,
      volume,
      marketCap,
      high24h: price * (1 + Math.random() * 0.05),
      low24h: price * (1 - Math.random() * 0.05)
    };
  });
}

export default API; 
