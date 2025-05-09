/**
 * Real-time data service for Trinity
 * This service handles WebSocket connections and real-time data updates
 */

const WebSocket = require('ws');
const pool = require('../config/db');
const cryptoApi = require('./cryptoApi');

// Update intervals in milliseconds
const PRICE_UPDATE_INTERVAL = 10000; // 10 seconds
const MARKET_UPDATE_INTERVAL = 60000; // 1 minute
const CHART_UPDATE_INTERVAL = 300000; // 5 minutes

// Store for active connections
const clients = new Set();
// Cache for latest market data
let marketDataCache = {};
// Active symbols being watched
const activeSymbols = new Set(['BTC', 'ETH', 'XRP', 'ADA', 'SOL']);

/**
 * Initialize the real-time data service
 * @param {object} server - HTTP server instance
 */
function initRealTimeService(server) {
  // Create WebSocket server
  const wss = new WebSocket.Server({ server });
  console.log('Real-time data service initialized');

  // Start data update loops
  startPriceUpdates();
  startMarketUpdates();
  startChartUpdates();

  // WebSocket connection handler
  wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    // Send initial data
    sendInitialData(ws);

    // Handle client messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        handleClientMessage(ws, data);
      } catch (error) {
        console.error('Error parsing client message:', error.message);
      }
    });

    // Handle disconnection
    ws.on('close', () => {
      console.log('Client disconnected');
      clients.delete(ws);
    });
  });
}

/**
 * Send initial data to a new client
 * @param {WebSocket} ws - WebSocket client
 */
async function sendInitialData(ws) {
  try {
    // If we have cached data, send it immediately
    if (Object.keys(marketDataCache).length > 0) {
      ws.send(JSON.stringify({
        type: 'market_data',
        data: marketDataCache
      }));
    }

    // Otherwise, fetch latest data
    const marketData = await fetchLatestMarketData();
    marketDataCache = marketData;
    
    ws.send(JSON.stringify({
      type: 'market_data',
      data: marketData
    }));
  } catch (error) {
    console.error('Error sending initial data:', error.message);
  }
}

/**
 * Handle client messages
 * @param {WebSocket} ws - WebSocket client
 * @param {object} data - Message data
 */
function handleClientMessage(ws, data) {
  switch (data.type) {
    case 'subscribe':
      if (data.symbol) {
        activeSymbols.add(data.symbol);
        console.log(`Client subscribed to ${data.symbol}`);
      }
      break;
    case 'unsubscribe':
      if (data.symbol) {
        // Only remove if no other clients are watching
        let stillActive = false;
        for (const client of clients) {
          if (client !== ws && client.subscribedSymbols && client.subscribedSymbols.has(data.symbol)) {
            stillActive = true;
            break;
          }
        }
        if (!stillActive) {
          activeSymbols.delete(data.symbol);
          console.log(`Removed ${data.symbol} from active symbols`);
        }
      }
      break;
    default:
      console.log('Unknown message type:', data.type);
  }
}

/**
 * Start the price update loop
 */
function startPriceUpdates() {
  setInterval(async () => {
    try {
      // Only update if we have clients
      if (clients.size === 0) return;

      const priceData = await fetchLatestPrices();
      
      // Broadcast to all clients
      broadcastMessage({
        type: 'price_update',
        data: priceData
      });
    } catch (error) {
      console.error('Error updating prices:', error.message);
    }
  }, PRICE_UPDATE_INTERVAL);
}

/**
 * Start the market update loop
 */
function startMarketUpdates() {
  setInterval(async () => {
    try {
      // Only update if we have clients
      if (clients.size === 0) return;

      const marketData = await fetchLatestMarketData();
      marketDataCache = marketData;
      
      broadcastMessage({
        type: 'market_data',
        data: marketData
      });
    } catch (error) {
      console.error('Error updating market data:', error.message);
    }
  }, MARKET_UPDATE_INTERVAL);
}

/**
 * Start the chart update loop
 */
function startChartUpdates() {
  setInterval(async () => {
    try {
      // Only update if we have clients
      if (clients.size === 0) return;

      // Update one symbol at a time to avoid overloading the API
      for (const symbol of activeSymbols) {
        const chartData = await fetchLatestChartData(symbol);
        
        broadcastMessage({
          type: 'chart_update',
          symbol,
          data: chartData
        });
        
        // Wait before updating the next symbol
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error('Error updating chart data:', error.message);
    }
  }, CHART_UPDATE_INTERVAL);
}

/**
 * Fetch latest prices from the database
 * @returns {Promise<object>} Latest price data
 */
async function fetchLatestPrices() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT base_asset as symbol, current_price as price, price_change_24h as change FROM markets WHERE market_type = $1',
      ['crypto']
    );
    client.release();

    const priceData = {};
    result.rows.forEach(row => {
      priceData[row.symbol] = {
        price: row.price,
        change: row.change
      };
    });

    return priceData;
  } catch (error) {
    console.error('Error fetching latest prices:', error.message);
    return {};
  }
}

/**
 * Fetch latest market data
 * @returns {Promise<object>} Latest market data
 */
async function fetchLatestMarketData() {
  try {
    // Try to get from database first
    const client = await pool.connect();
    const result = await client.query(
      `SELECT 
        base_asset as symbol, 
        current_price as price, 
        price_change_24h as change, 
        volume_24h as volume, 
        market_cap as market_cap,
        updated_at
      FROM markets 
      WHERE market_type = $1`,
      ['crypto']
    );
    client.release();

    // If data is fresh, use it
    const marketData = {};
    const now = new Date();
    let needsRefresh = false;

    result.rows.forEach(row => {
      const updatedAt = new Date(row.updated_at);
      const minutesOld = (now - updatedAt) / (1000 * 60);
      
      // If data is older than 15 minutes, flag for refresh
      if (minutesOld > 15) {
        needsRefresh = true;
      }

      marketData[row.symbol] = {
        price: row.price,
        change: row.change,
        volume: row.volume,
        marketCap: row.market_cap,
        updatedAt: row.updated_at
      };
    });

    // If data needs refresh or we don't have enough data, update from API
    if (needsRefresh || Object.keys(marketData).length < 5) {
      console.log('Market data needs refresh, fetching from API...');
      await cryptoApi.updateAllCryptoData();
      
      // After update, fetch again from database
      return await fetchLatestMarketData();
    }

    return marketData;
  } catch (error) {
    console.error('Error fetching market data:', error.message);
    
    // Fall back to simulated data if database query fails
    return cryptoApi.generateSimulatedCryptoData().reduce((acc, coin) => {
      const symbol = coin.symbol.toUpperCase();
      acc[symbol] = {
        price: coin.current_price,
        change: coin.price_change_percentage_24h,
        volume: coin.total_volume,
        marketCap: coin.market_cap,
        updatedAt: coin.last_updated
      };
      return acc;
    }, {});
  }
}

/**
 * Fetch latest chart data for a symbol
 * @param {string} symbol - The symbol to fetch chart data for
 * @returns {Promise<object>} Chart data
 */
async function fetchLatestChartData(symbol) {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT 
        time, 
        open, 
        high, 
        low, 
        close, 
        volume 
      FROM chart_data 
      WHERE symbol = $1 
      ORDER BY time DESC 
      LIMIT 100`,
      [`${symbol}/USD`]
    );
    client.release();

    // If we have enough data points, return them
    if (result.rows.length > 0) {
      return result.rows.reverse();
    }

    // Otherwise try to update from the API
    console.log(`No chart data for ${symbol}, fetching from API...`);
    const coinId = cryptoApi.CRYPTO_MAPPING[symbol];
    if (coinId) {
      const historicalData = await cryptoApi.fetchHistoricalData(coinId, 30);
      await cryptoApi.updateChartDataTable(coinId, historicalData);
      
      // Try fetching again after update
      return await fetchLatestChartData(symbol);
    }

    return [];
  } catch (error) {
    console.error(`Error fetching chart data for ${symbol}:`, error.message);
    return [];
  }
}

/**
 * Broadcast a message to all connected clients
 * @param {object} message - The message to broadcast
 */
function broadcastMessage(message) {
  const messageString = JSON.stringify(message);
  
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageString);
    }
  }
}

module.exports = {
  initRealTimeService
}; 