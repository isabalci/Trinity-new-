const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const authMiddleware = require('../middleware/auth');

// Veritabanı bağlantısı
const pool = require('../config/db');

// Kullanıcı kimlik doğrulama durumunu kontrol et
router.get('/check-auth', authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      isAuthenticated: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (err) {
    console.error('Auth check error:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı profil bilgilerini getir
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // auth middleware'den kullanıcı ID'sini al
    const userId = req.user.id;
    
    // Kullanıcıyı veritabanından sorgula (şifre hariç)
    const userResult = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    
    res.json(userResult.rows[0]);
  } catch (err) {
    console.error('Profil bilgisi alma hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı profil bilgilerini güncelle
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, currentPassword, newPassword } = req.body;
    
    // Kullanıcıyı veritabanından kontrol et
    const userResult = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    
    const user = userResult.rows[0];
    
    // Şifre değişikliği istendiyse, mevcut şifreyi kontrol et
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Mevcut şifre gerekli' });
      }
      
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Geçersiz kimlik bilgileri' });
      }
      
      // Yeni şifreyi hashle
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Kullanıcı bilgilerini güncelle (isim, email, şifre)
      await pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
        [name, email, hashedPassword, userId]
      );
    } else {
      // Şifre değişikliği yoksa, sadece isim ve email'i güncelle
      await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, userId]
      );
    }
    
    // Güncellenmiş kullanıcı bilgilerini döndür
    const updatedUser = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [userId]
    );
    
    res.json({
      message: 'Profil başarıyla güncellendi',
      user: updatedUser.rows[0]
    });
  } catch (err) {
    console.error('Profil güncelleme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı izleme listesini getir
router.get('/watchlist', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Watchlist tablosunun var olup olmadığını kontrol et
    const tableExists = await pool.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'watchlist')"
    );
    
    if (!tableExists.rows[0].exists) {
      // Tablo yoksa oluştur
      await pool.query(`
        CREATE TABLE watchlist (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          symbol VARCHAR(20) NOT NULL,
          added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, symbol)
        )
      `);
      
      return res.json([]);
    }
    
    const watchlistResult = await pool.query(
      'SELECT w.id, w.symbol, w.added_at FROM watchlist w WHERE w.user_id = $1 ORDER BY w.added_at DESC',
      [userId]
    );
    
    res.json(watchlistResult.rows);
  } catch (err) {
    console.error('İzleme listesi alma hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// İzleme listesine sembol ekle
router.post('/watchlist', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { symbol } = req.body;
    
    if (!symbol) {
      return res.status(400).json({ message: 'Sembol gerekli' });
    }
    
    // Watchlist tablosunun var olup olmadığını kontrol et
    const tableExists = await pool.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'watchlist')"
    );
    
    if (!tableExists.rows[0].exists) {
      // Tablo yoksa oluştur
      await pool.query(`
        CREATE TABLE watchlist (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          symbol VARCHAR(20) NOT NULL,
          added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, symbol)
        )
      `);
    }
    
    // Sembolün zaten listede olup olmadığını kontrol et
    const existingResult = await pool.query(
      'SELECT * FROM watchlist WHERE user_id = $1 AND symbol = $2',
      [userId, symbol]
    );
    
    if (existingResult.rows.length > 0) {
      return res.status(400).json({ message: 'Sembol zaten izleme listesinde' });
    }
    
    // Yeni sembol ekle
    const result = await pool.query(
      'INSERT INTO watchlist (user_id, symbol) VALUES ($1, $2) RETURNING *',
      [userId, symbol]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('İzleme listesine ekleme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// İzleme listesinden sembol çıkar
router.delete('/watchlist/:symbol', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { symbol } = req.params;
    
    const result = await pool.query(
      'DELETE FROM watchlist WHERE user_id = $1 AND symbol = $2 RETURNING *',
      [userId, symbol]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sembol izleme listesinde bulunamadı' });
    }
    
    res.json({ message: 'Sembol izleme listesinden kaldırıldı' });
  } catch (err) {
    console.error('İzleme listesinden çıkarma hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router; 