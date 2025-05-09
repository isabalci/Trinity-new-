const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');

// Emir defteri alma
router.get('/book/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    // Alış emirleri
    const bidsResult = await pool.query(
      "SELECT price, SUM(quantity) as amount FROM orders WHERE symbol = $1 AND side = 'buy' AND status = 'open' GROUP BY price ORDER BY price DESC",
      [symbol]
    );
    
    // Satış emirleri
    const asksResult = await pool.query(
      "SELECT price, SUM(quantity) as amount FROM orders WHERE symbol = $1 AND side = 'sell' AND status = 'open' GROUP BY price ORDER BY price ASC",
      [symbol]
    );
    
    // Toplamları hesapla
    const bids = bidsResult.rows.map(row => {
      return {
        price: parseFloat(row.price),
        amount: parseFloat(row.amount),
        total: parseFloat(row.price) * parseFloat(row.amount)
      };
    });
    
    const asks = asksResult.rows.map(row => {
      return {
        price: parseFloat(row.price),
        amount: parseFloat(row.amount),
        total: parseFloat(row.price) * parseFloat(row.amount)
      };
    });
    
    res.json({ bids, asks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Son işlemler
router.get('/trades/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM trades WHERE symbol = $1 ORDER BY time DESC LIMIT 20',
      [symbol]
    );
    
    // İşlem formatını düzenle
    const trades = result.rows.map(row => {
      return {
        id: row.id,
        time: row.time.toLocaleTimeString(),
        timestamp: new Date(row.time).getTime(),
        price: parseFloat(row.price),
        amount: parseFloat(row.amount),
        type: row.type
      };
    });
    
    res.json(trades);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Emir oluştur (kimlik doğrulama gerekli)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { symbol, side, type, quantity, price, stopPrice } = req.body;
    
    // Tüm gerekli alanların kontrolü
    if (!symbol || !side || !type || !quantity) {
      return res.status(400).json({ error: 'Eksik bilgi: symbol, side, type, quantity alanları gerekli' });
    }
    
    // Emir tipi kontrolü
    if (type === 'limit' && !price) {
      return res.status(400).json({ error: 'Limit emirleri için fiyat bilgisi gerekli' });
    }
    
    if (type === 'stop' && !stopPrice) {
      return res.status(400).json({ error: 'Stop emirleri için stopPrice bilgisi gerekli' });
    }
    
    // Emir oluştur
    const result = await pool.query(
      'INSERT INTO orders (user_id, symbol, side, type, quantity, price, stop_price, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [req.user.id, symbol, side, type, quantity, price || null, stopPrice || null, 'open']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Kullanıcının emirlerini getir (kimlik doğrulama gerekli)
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Emir iptal et (kimlik doğrulama gerekli)
router.delete('/:orderId', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Kullanıcının kendi emrini iptal edebilmesi için kontrol
    const checkResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [orderId, req.user.id]
    );
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Emir bulunamadı veya erişim izniniz yok' });
    }
    
    // Emir durumunu iptal olarak güncelle
    await pool.query(
      "UPDATE orders SET status = 'cancelled' WHERE id = $1",
      [orderId]
    );
    
    res.json({ message: 'Emir başarıyla iptal edildi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

module.exports = router; 