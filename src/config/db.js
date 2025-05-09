const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Database konfigürasyonu
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'trinity_db',
  password: '107040',
  port: 5432
};

// PostgreSQL bağlantı havuzu
const pool = new Pool(dbConfig);

// Veritabanı bağlantısını test et
pool.connect()
  .then(client => {
    console.log('Veritabanı bağlantısı başarılı');
    client.release();
  })
  .catch(err => {
    console.error('Veritabanına bağlanılamadı:', err.message);
  });

module.exports = pool; 