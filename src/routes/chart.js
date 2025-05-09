const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Belirli bir sembol için grafik verilerini getir
router.get('/:symbol', async (req, res) => {
  try {
    const symbol = decodeURIComponent(req.params.symbol);
    const interval = req.query.interval || '1h';
    const limit = req.query.limit || 100;
    
    // Veritabanından grafik verilerini çek
    const result = await pool.query(
      'SELECT * FROM chart_data WHERE symbol = $1 AND interval = $2 ORDER BY time DESC LIMIT $3',
      [symbol, interval, limit]
    );
    
    // Verileri OHLCV formatına dönüştür
    const chartData = result.rows.map(row => ({
      time: new Date(row.time).getTime(),
      open: parseFloat(row.open),
      high: parseFloat(row.high),
      low: parseFloat(row.low),
      close: parseFloat(row.close),
      volume: parseFloat(row.volume)
    }));
    
    res.json(chartData);
  } catch (err) {
    console.error('Error fetching chart data:', err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Belirli bir sembol için geçmiş verileri getir
router.get('/:symbol/historical', async (req, res) => {
  try {
    const symbol = decodeURIComponent(req.params.symbol);
    const from = req.query.from;
    const to = req.query.to;
    const interval = req.query.interval || '1d';
    
    if (!from || !to) {
      return res.status(400).json({ error: 'from ve to parametreleri gerekli' });
    }
    
    // Veritabanından tarih aralığına göre verileri çek
    const result = await pool.query(
      'SELECT * FROM chart_data WHERE symbol = $1 AND interval = $2 AND time BETWEEN $3 AND $4 ORDER BY time',
      [symbol, interval, new Date(from), new Date(to)]
    );
    
    // Verileri OHLCV formatına dönüştür
    const historicalData = result.rows.map(row => ({
      time: new Date(row.time).getTime(),
      open: parseFloat(row.open),
      high: parseFloat(row.high),
      low: parseFloat(row.low),
      close: parseFloat(row.close),
      volume: parseFloat(row.volume)
    }));
    
    res.json(historicalData);
  } catch (err) {
    console.error('Error fetching historical data:', err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

module.exports = router; 