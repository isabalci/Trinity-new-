const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    // Token'ı Authorization başlığından al
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Kimlik doğrulama başarısız. Token bulunamadı.' });
    }
    
    // "Bearer TOKEN" formatından TOKEN kısmını çıkar
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Kimlik doğrulama başarısız. Geçersiz token formatı.' });
    }
    
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'trinity-jwt-secret');
    
    // Kullanıcıyı veritabanından kontrol et
    const userResult = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [decoded.userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Kimlik doğrulama başarısız. Kullanıcı bulunamadı.' });
    }
    
    // Kullanıcı bilgisini isteğe ekle
    const user = userResult.rows[0];
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Kimlik doğrulama başarısız. Geçersiz token.' });
    }
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Kimlik doğrulama başarısız. Token süresi dolmuş.' });
    }
    
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

module.exports = authMiddleware; 