import axios from 'axios';
import cryptoService from '../services/crypto.service';

const SYMBOLS = ['BTC', 'ETH', 'XRP', 'ADA', 'SOL', 'DOT', 'DOGE', 'LINK', 'MATIC', 'AVAX'];
const BASE_CURRENCY = 'USD';

const COINGECKO_IDS: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'XRP': 'ripple',
  'ADA': 'cardano',
  'SOL': 'solana',
  'DOT': 'polkadot',
  'DOGE': 'dogecoin',
  'LINK': 'chainlink',
  'MATIC': 'matic-network',
  'AVAX': 'avalanche-2'
};

async function fetchHistoricalData(symbol: string) {
  try {
    const coinId = COINGECKO_IDS[symbol];
    if (!coinId) {
      console.error(`No CoinGecko ID found for symbol: ${symbol}`);
      return;
    }

    console.log(`Fetching historical data for ${symbol} (${coinId})...`);
    
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: BASE_CURRENCY.toLowerCase(),
          days: '30',
          interval: 'daily'
        }
      }
    );

    const { prices, total_volumes } = response.data;
    const priceData = prices.map((item: [number, number], index: number) => ({
      symbol: `${symbol}/${BASE_CURRENCY}`,
      timestamp: Math.floor(item[0] / 1000),
      open: item[1],
      high: item[1] * 1.01, // Approximate values
      low: item[1] * 0.99,
      close: item[1],
      volume: total_volumes[index][1]
    }));

    await cryptoService.savePriceData(priceData);
    console.log(`Successfully updated price data for ${symbol}/${BASE_CURRENCY}`);
  } catch (error: any) {
    console.error(`Error fetching historical data for ${symbol}:`, error.message);
  }
}

async function updateAllCryptoData() {
  console.log('Starting crypto data update...');
  
  for (const symbol of SYMBOLS) {
    await fetchHistoricalData(symbol);
    // Wait to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('Crypto data update completed');
}

updateAllCryptoData(); 