const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const router = express.Router();

// JWT token oluşturma fonksiyonu
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email
  };
  
  return jwt.sign(
    payload, 
    process.env.JWT_SECRET || 'trinity-jwt-secret',
    { expiresIn: '24h' }
  );
};

// Kayıt route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Tüm alanların dolu olduğunu kontrol et
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Tüm alanları doldurunuz' });
    }
    
    // Kullanıcının zaten var olup olmadığını kontrol et
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanılıyor' });
    }

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, hashedPassword]
    );
    
    const user = newUser.rows[0];
    
    // JWT token oluştur
    const token = generateToken(user);

    res.status(201).json({
      message: 'Kullanıcı başarıyla kaydedildi',
      token,
      user
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ message: 'Kullanıcı kayıt hatası' });
  }
});

// Giriş route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Tüm alanların dolu olduğunu kontrol et
    if (!email || !password) {
      return res.status(400).json({ message: 'Email ve şifre gereklidir' });
    }

    // Kullanıcıyı email ile bul
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }
    
    const user = userResult.rows[0];

    // Şifreyi doğrula
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    // JWT token oluştur
    const token = generateToken(user);
    
    // Kullanıcı bilgilerini döndür (şifre hariç)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Giriş başarılı',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Giriş yaparken hata oluştu' });
  }
});

module.exports = router; 