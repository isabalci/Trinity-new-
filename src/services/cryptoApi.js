const axios = require('axios');
const pool = require('../config/db');

// CoinGecko API temel URL
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
// CoinGecko API anahtarı (ücretsiz API kullanıyoruz, API anahtarı gerekmiyor)
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || '';

// CoinGecko API istek limitlerine uygun gecikme süresi (milisaniye)
// Free plan için 10-30 istek/dakika (her istek arasında minimum 2 saniye bekleme)
const API_DELAY = 2000;

// Kripto para sembollerini CoinGecko ID'lerine eşleştiren nesne
const CRYPTO_MAPPING = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'XRP': 'ripple',
  'LTC': 'litecoin',
  'ADA': 'cardano',
  'SOL': 'solana',
  'DOT': 'polkadot',
  'AVAX': 'avalanche-2',
  'LINK': 'chainlink',
  'MATIC': 'matic-network'
};

// İstekler arasında beklemek için yardımcı fonksiyon
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Axios instance oluşturma
const coinGeckoApi = axios.create({
  baseURL: COINGECKO_API_URL,
  headers: COINGECKO_API_KEY ? {
    'x-cg-pro-api-key': COINGECKO_API_KEY
  } : {}
});

// Hata durumunda yeniden deneme yapan yardımcı fonksiyon
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 1000) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        console.log(`API hatası, simüle edilmiş veri kullanılacak: ${error.message}`);
        // Maksimum yeniden deneme sayısına ulaşıldıysa, null döndür ve çağıran simüle edilmiş veri kullanabilir
        return null;
      }
      
      // Rate limit veya geçici hata durumunda bekle
      const isRateLimit = error.response && (error.response.status === 429 || error.response.status === 401);
      const delay = isRateLimit ? (initialDelay * Math.pow(2, retries)) : initialDelay;
      
      console.log(`API hatası (${error.message}). Yeniden deneme ${retries}/${maxRetries}, ${delay}ms sonra...`);
      await sleep(delay);
    }
  }
}

/**
 * CoinGecko API'den kripto para verilerini al
 * @returns {Promise<Array>} Kripto para verileri listesi
 */
async function fetchCryptoData() {
  const result = await retryWithBackoff(async () => {
    // ID'leri bir diziye dönüştür
    const coinIds = Object.values(CRYPTO_MAPPING).join(',');
    
    try {
      // API'den verileri al
      const response = await coinGeckoApi.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: coinIds,
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h'
        }
      });
      
      // API anahtarımız yoksa veya sınırlarda çalışıyorsak simüle veri kullanabiliriz
      if (response.status !== 200 || !response.data || response.data.length === 0) {
        console.log('CoinGecko API yanıt vermedi, simüle veri kullanılıyor');
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`CoinGecko API hatası: ${error.message}`);
      return null;
    }
  });
  
  // API'den veri alınamadıysa simüle edilmiş veri kullan
  return result || generateSimulatedCryptoData();
}

/**
 * Belirli bir kripto para için geçmiş verileri al
 * @param {string} coinId CoinGecko coin ID
 * @param {number} days Gün sayısı (1, 7, 30, 90, 365, max)
 * @returns {Promise<Object>} Geçmiş fiyat verileri
 */
async function fetchHistoricalData(coinId, days = 30) {
  return retryWithBackoff(async () => {
    try {
      // API'den geçmiş verileri al
      const response = await coinGeckoApi.get(`/coins/${coinId}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days,
          interval: days <= 1 ? 'minute' : days <= 7 ? 'hour' : 'day'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error(`${coinId} için geçmiş veri alma hatası:`, error.message);
      
      // API hatası durumunda simüle veri oluştur
      return generateSimulatedHistoricalData(days);
    }
  });
}

/**
 * API erişimi olmadığında kullanmak için simüle kripto verileri oluştur
 * @returns {Array} Simüle edilmiş kripto para verileri
 */
function generateSimulatedCryptoData() {
  return Object.entries(CRYPTO_MAPPING).map(([symbol, id]) => {
    const basePrice = getBasePrice(symbol);
    const priceChange = (Math.random() * 10) - 5; // -5% ile +5% arası değişim
    
    return {
      id: id,
      symbol: symbol.toLowerCase(),
      name: getFullName(symbol),
      current_price: basePrice,
      price_change_percentage_24h: priceChange,
      total_volume: Math.random() * 1000000000 + 100000000,
      market_cap: Math.random() * 10000000000 + 1000000000,
      last_updated: new Date().toISOString()
    };
  });
}

/**
 * Simüle geçmiş fiyat verileri oluştur
 * @param {number} days Gün sayısı
 * @returns {Object} Simüle edilmiş geçmiş fiyat verileri
 */
function generateSimulatedHistoricalData(days) {
  const now = Date.now();
  const dataPoints = days <= 1 ? 24 : days <= 7 ? days * 24 : days;
  const timeStep = (days * 24 * 60 * 60 * 1000) / dataPoints;
  
  const prices = [];
  const market_caps = [];
  const total_volumes = [];
  
  const basePrice = 30000 + (Math.random() * 5000);
  let currentPrice = basePrice;
  
  for (let i = 0; i < dataPoints; i++) {
    const timestamp = now - ((dataPoints - i) * timeStep);
    
    // Rastgele fiyat değişimi (-2% ile +2% arası)
    const priceChange = currentPrice * (0.98 + (Math.random() * 0.04));
    currentPrice = Math.max(100, priceChange); // Minimum fiyat 100$
    
    prices.push([timestamp, currentPrice]);
    market_caps.push([timestamp, currentPrice * 19000000]);
    total_volumes.push([timestamp, Math.random() * 50000000000 + 10000000000]);
  }
  
  return { prices, market_caps, total_volumes };
}

/**
 * Sembol için temel fiyat değeri
 */
function getBasePrice(symbol) {
  const prices = {
    'BTC': 30000 + (Math.random() * 5000),
    'ETH': 2000 + (Math.random() * 500),
    'XRP': 0.5 + (Math.random() * 0.2),
    'LTC': 80 + (Math.random() * 20),
    'ADA': 0.3 + (Math.random() * 0.1),
    'SOL': 100 + (Math.random() * 30),
    'DOT': 5 + (Math.random() * 2),
    'AVAX': 15 + (Math.random() * 5),
    'LINK': 10 + (Math.random() * 3),
    'MATIC': 0.8 + (Math.random() * 0.3)
  };
  
  return prices[symbol] || 100;
}

/**
 * Sembol için tam isim
 */
function getFullName(symbol) {
  const names = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'XRP': 'XRP',
    'LTC': 'Litecoin',
    'ADA': 'Cardano',
    'SOL': 'Solana',
    'DOT': 'Polkadot',
    'AVAX': 'Avalanche',
    'LINK': 'Chainlink',
    'MATIC': 'Polygon'
  };
  
  return names[symbol] || symbol;
}

/**
 * CoinGecko verilerini veritabanındaki markets tablosuna aktar
 * @param {Array} cryptoData CoinGecko'dan alınan kripto para verileri
 * @returns {Promise<void>}
 */
async function updateMarketsTable(cryptoData) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // İlk olarak markets tablosunu kontrol et ve gerekirse oluştur
    const tableCheck = await client.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'markets')"
    );
    
    if (!tableCheck.rows[0].exists) {
      console.log('Markets tablosu bulunamadı, oluşturuluyor...');
      await client.query(`
        CREATE TABLE markets (
          id SERIAL PRIMARY KEY,
          base_asset VARCHAR(20) NOT NULL,
          quote_asset VARCHAR(20) NOT NULL,
          market_type VARCHAR(20) NOT NULL,
          current_price NUMERIC(24, 8),
          price_change_24h NUMERIC(12, 2),
          volume_24h NUMERIC(24, 2),
          market_cap NUMERIC(24, 2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(base_asset, quote_asset, market_type)
        )
      `);
    }
    
    for (const coin of cryptoData) {
      // CoinGecko ID'sinden Trinity sembol formatına dönüştür
      const symbol = Object.keys(CRYPTO_MAPPING).find(key => CRYPTO_MAPPING[key] === coin.id);
      
      if (!symbol) continue;
      
      // Önce kaydın var olup olmadığını kontrol et
      const exists = await client.query(
        `SELECT id FROM markets WHERE base_asset = $1 AND quote_asset = 'USD' AND market_type = 'crypto'`,
        [symbol]
      );
      
      if (exists.rows.length === 0) {
        // Yeni kayıt ekleme
        await client.query(
          `INSERT INTO markets 
           (base_asset, quote_asset, market_type, current_price, price_change_24h, volume_24h, market_cap) 
           VALUES ($1, 'USD', 'crypto', $2, $3, $4, $5)`,
          [
            symbol,
            coin.current_price,
            coin.price_change_percentage_24h,
            coin.total_volume,
            coin.market_cap
          ]
        );
        console.log(`${symbol} kaydı oluşturuldu`);
      } else {
        // Mevcut kaydı güncelle
        await client.query(
          `UPDATE markets 
           SET current_price = $1, 
               price_change_24h = $2, 
               volume_24h = $3, 
               market_cap = $4,
               updated_at = CURRENT_TIMESTAMP
           WHERE base_asset = $5 AND quote_asset = 'USD' AND market_type = 'crypto'`,
          [
            coin.current_price,
            coin.price_change_percentage_24h,
            coin.total_volume,
            coin.market_cap,
            symbol
          ]
        );
        console.log(`${symbol} verileri güncellendi`);
      }
    }
    
    await client.query('COMMIT');
    console.log('Tüm kripto verileri başarıyla güncellendi');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Veritabanı güncelleme hatası:', error.message);
  } finally {
    client.release();
  }
}

/**
 * CoinGecko'dan alınan geçmiş verileri chart_data tablosuna aktar
 * @param {string} coinId CoinGecko coin ID
 * @param {Object} historicalData Geçmiş fiyat verileri
 * @returns {Promise<void>}
 */
async function updateChartDataTable(coinId, historicalData) {
  const symbol = Object.keys(CRYPTO_MAPPING).find(key => CRYPTO_MAPPING[key] === coinId);
  if (!symbol) return;
  
  const fullSymbol = `${symbol}/USD`;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // chart_data tablosunu kontrol et ve gerekirse oluştur
    const tableCheck = await client.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'chart_data')"
    );
    
    if (!tableCheck.rows[0].exists) {
      console.log('Chart_data tablosu bulunamadı, oluşturuluyor...');
      await client.query(`
        CREATE TABLE chart_data (
          id SERIAL PRIMARY KEY,
          symbol VARCHAR(20) NOT NULL,
          interval VARCHAR(10) NOT NULL,
          time TIMESTAMP NOT NULL,
          open NUMERIC(24, 8) NOT NULL,
          high NUMERIC(24, 8) NOT NULL,
          low NUMERIC(24, 8) NOT NULL,
          close NUMERIC(24, 8) NOT NULL,
          volume NUMERIC(24, 8) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(symbol, interval, time)
        )
      `);
    }
    
    // Coin için mevcut verileri temizle
    await client.query(
      `DELETE FROM chart_data WHERE symbol = $1`,
      [fullSymbol]
    );
    
    // API'den gelen price verilerini dönüştür
    const prices = historicalData.prices;
    const volumes = historicalData.total_volumes;
    
    // Her bir veri noktası için
    for (let i = 0; i < prices.length; i++) {
      const timestamp = prices[i][0];
      const price = prices[i][1];
      const volume = volumes[i] ? volumes[i][1] : 0;
      
      // Fiyat dalgalanması için sabit değerler
      const variance = price * 0.02; // %2 dalgalanma
      const open = price - (Math.random() * variance) + (variance / 2);
      const high = price + (Math.random() * variance);
      const low = price - (Math.random() * variance);
      const close = price;
      
      // Interval belirle (günlük olarak varsayılan)
      const interval = '1d';
      
      try {
        // Veritabanına ekle
        await client.query(
          `INSERT INTO chart_data (symbol, interval, time, open, high, low, close, volume)
           VALUES ($1, $2, to_timestamp($3 / 1000), $4, $5, $6, $7, $8)
           ON CONFLICT (symbol, interval, time) 
           DO UPDATE SET 
             open = EXCLUDED.open,
             high = EXCLUDED.high,
             low = EXCLUDED.low,
             close = EXCLUDED.close,
             volume = EXCLUDED.volume`,
          [fullSymbol, interval, timestamp, open, high, low, close, volume]
        );
      } catch (error) {
        console.error(`${fullSymbol} veri noktası eklenemedi:`, error.message);
        // Devam et, diğer veri noktalarını işlemeye çalış
      }
    }
    
    await client.query('COMMIT');
    console.log(`${fullSymbol} için grafik verileri güncellendi`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Grafik verisi güncelleme hatası:', error.message);
  } finally {
    client.release();
  }
}

/**
 * Tüm kripto verilerini güncelle
 * @returns {Promise<void>}
 */
async function updateAllCryptoData() {
  try {
    console.log('Kripto verileri güncelleniyor...');
    
    // Market verilerini al ve güncelle
    const cryptoData = await fetchCryptoData();
    await updateMarketsTable(cryptoData);
    
    // Her bir coin için geçmiş verileri al
    for (const [symbol, coinId] of Object.entries(CRYPTO_MAPPING)) {
      console.log(`${symbol} için geçmiş veriler alınıyor...`);
      
      try {
        // API limitlerini aşmamak için bekle
        await sleep(API_DELAY);
        
        // Geçmiş verileri al ve güncelle
        const historicalData = await fetchHistoricalData(coinId, 30);
        await updateChartDataTable(coinId, historicalData);
      } catch (error) {
        console.error(`${symbol} geçmiş verileri güncellenemedi:`, error.message);
        // Diğer coinleri işlemeye devam et
        continue;
      }
    }
    
    console.log('Tüm kripto verileri güncelleme işlemi tamamlandı');
  } catch (error) {
    console.error('Kripto veri güncelleme hatası:', error);
  }
}

// Verileri belirli aralıklarla güncelle (15 dakika)
const AUTO_UPDATE_INTERVAL = 15 * 60 * 1000;

// Program başlatıldığında ilk güncellemeyi yap
console.log('Kripto veri hizmeti başlatılıyor...');
updateAllCryptoData();

// Belirli aralıklarla güncelleme yap
setInterval(updateAllCryptoData, AUTO_UPDATE_INTERVAL);

// Dışa aktarma
module.exports = {
  fetchCryptoData,
  fetchHistoricalData,
  updateAllCryptoData,
  generateSimulatedCryptoData, // Test için simüle veri
  generateSimulatedHistoricalData // Test için simüle geçmiş veri
}; 