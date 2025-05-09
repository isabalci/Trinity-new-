const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// En son haberleri getir
router.get('/latest', async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const result = await pool.query(
      'SELECT * FROM news ORDER BY published DESC LIMIT $1',
      [limit]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Kategoriye göre haberleri getir
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const limit = req.query.limit || 10;
    
    const result = await pool.query(
      'SELECT * FROM news WHERE category = $1 ORDER BY published DESC LIMIT $2',
      [category, limit]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Haberlerde arama yap
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const limit = req.query.limit || 10;
    
    if (!q) {
      return res.status(400).json({ error: 'Arama sorgusu gerekli' });
    }
    
    const result = await pool.query(
      'SELECT * FROM news WHERE title ILIKE $1 OR summary ILIKE $1 OR content ILIKE $1 ' +
      'ORDER BY published DESC LIMIT $2',
      [`%${q}%`, limit]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// ID'ye göre haber getir
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM news WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Haber bulunamadı' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

module.exports = router; 