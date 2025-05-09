const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Tüm piyasaları getir
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM markets ORDER BY symbol'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all markets:', err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Kripto piyasalarını getir
router.get('/crypto', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM markets WHERE market_type = 'crypto' ORDER BY symbol"
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching crypto markets:', err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Forex piyasalarını getir
router.get('/forex', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM markets WHERE market_type = 'forex' ORDER BY symbol"
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching forex markets:', err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Hisse senedi piyasalarını getir
router.get('/stocks', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM markets WHERE market_type = 'stock' ORDER BY symbol"
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching stock markets:', err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Symbol'e göre piyasa getir
router.get('/:symbol', async (req, res) => {
  try {
    const symbol = decodeURIComponent(req.params.symbol);
    
    // Önce symbol ile arama yap
    const result = await pool.query(
      'SELECT * FROM markets WHERE symbol = $1',
      [symbol]
    );
    
    if (result.rows.length === 0) {
      // Symbol bulunamadıysa, ID ile tekrar deneyin (eğer ID sayı ise)
      if (!isNaN(req.params.symbol)) {
        const idResult = await pool.query(
          'SELECT * FROM markets WHERE id = $1',
          [req.params.symbol]
        );
        
        if (idResult.rows.length === 0) {
          return res.status(404).json({ error: 'Piyasa bulunamadı' });
        }
        
        return res.json(idResult.rows[0]);
      }
      
      return res.status(404).json({ error: 'Piyasa bulunamadı' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching market by symbol:', err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

module.exports = router; 