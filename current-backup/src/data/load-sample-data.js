const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Veritabanı yapılandırması
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'trinity_db',
  password: '107040',
  port: 5432
};

const pool = new Pool(dbConfig);

async function loadSampleData() {
  try {
    console.log('Örnek veriler veritabanına yükleniyor...');
    
    // SQL dosyasını oku
    const sqlPath = path.join(__dirname, 'sample-data.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Veritabanına bağlan
    const client = await pool.connect();
    
    try {
      // İşlemi başlat
      await client.query('BEGIN');
      
      // SQL komutlarını çalıştır
      await client.query(sql);
      
      // İşlemi tamamla
      await client.query('COMMIT');
      
      console.log('Örnek veriler başarıyla yüklendi.');
    } catch (error) {
      // Hata durumunda geri al
      await client.query('ROLLBACK');
      console.error('Hata oluştu:', error.message);
    } finally {
      // Bağlantıyı kapat
      client.release();
    }
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error.message);
  } finally {
    // Havuzu kapat
    await pool.end();
  }
}

// Scripti çalıştır
loadSampleData(); 