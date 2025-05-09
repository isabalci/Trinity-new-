const express = require('express');
const cors = require('cors');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const http = require('http');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Import services
const realTimeData = require('./services/realTimeData');

// Route dosyalarını içe aktar
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const marketRoutes = require('./routes/markets');
const chartRoutes = require('./routes/chart');
const newsRoutes = require('./routes/news');
const orderRoutes = require('./routes/orders');
const portfolioRoutes = require('./routes/portfolio');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database configuration
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'trinity_db',
  password: '107040',
  port: 5432
};

console.log('Database Config:', {
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  port: dbConfig.port
});

const pool = new Pool(dbConfig);

// Variable to track database connection status
let isDatabaseConnected = false;

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.message);
    console.error('Please check your PostgreSQL password and make sure it matches pgAdmin');
    isDatabaseConnected = false;
    return;
  }
  console.log('Successfully connected to database');
  isDatabaseConnected = true;
  release();
  
  // Initialize services after database connection
  try {
    require('./services/cryptoApi');
    console.log('Crypto API service started');
    
    // Initialize real-time data service
    realTimeData.initRealTimeService(server);
    console.log('Real-time data service started');
  } catch (error) {
    console.error('Service initialization error:', error.message);
  }
});

// Load translations
const enTranslations = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales/en/common.json'), 'utf8'));
const trTranslations = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales/tr/common.json'), 'utf8'));

// i18next configuration
i18next
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'tr'],
    resources: {
      en: {
        common: enTranslations
      },
      tr: {
        common: trTranslations
      }
    },
    ns: ['common'],
    defaultNS: 'common'
  });

app.use(i18nextMiddleware.handle(i18next));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/chart', chartRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle any requests that don't match the API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Test route
app.get('/', async (req, res) => {
  const lang = req.language || 'en';
  
  try {
    // Test the database connection
    const client = await pool.connect();
    client.release();
    isDatabaseConnected = true;
    
    // Veritabanındaki crypto veri sayısını kontrol et
    const cryptoDataResult = await pool.query("SELECT COUNT(*) FROM markets WHERE market_type = 'crypto'");
    const cryptoDataCount = parseInt(cryptoDataResult.rows[0].count || 0);
    
    res.json({
      message: req.t('welcome'),
      status: 'success',
      language: lang,
      dbConnected: isDatabaseConnected,
      cryptoDataCount: cryptoDataCount,
      dataReady: cryptoDataCount > 0,
      version: '1.1.0', // Add version to track updates
      realTime: true // Flag indicating real-time updates are enabled
    });
  } catch (err) {
    console.error('Database connection test failed:', err.message);
    isDatabaseConnected = false;
    
    res.json({
      message: req.t('welcome'),
      status: 'success',
      language: lang,
      dbConnected: false,
      error: err.message,
      version: '1.1.0'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Sabit 3002 portu kullanacağız
const PORT = process.env.PORT || 3002;

// Port dinleme ve hata yakalama
const startServer = () => {
  server.listen(PORT)
    .on('listening', () => {
      console.log(`Server is running on port ${PORT}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Trying alternative port ${PORT + 1}`);
        // Port zaten kullanımda, 1 artırarak tekrar dene
        const alternativePort = PORT + 1;
        app.listen(alternativePort, () => {
          console.log(`Server is running on alternative port ${alternativePort}`);
        });
      } else {
        console.error('Server error:', err);
      }
    });
};

startServer(); 