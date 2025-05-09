const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');

// Tüm portföy rotaları için kimlik doğrulama gerekli
router.use(authMiddleware);

// Kullanıcının portföyünü getir
router.get('/', async (req, res) => {
  try {
    // Pozisyonları getir
    const positionsResult = await pool.query(
      'SELECT p.*, m.current_price FROM portfolio_positions p ' +
      'JOIN markets m ON p.symbol = m.symbol ' +
      'WHERE p.user_id = $1',
      [req.user.id]
    );
    
    const positions = positionsResult.rows.map(position => {
      const currentValue = position.quantity * position.current_price;
      const entryValue = position.quantity * position.entry_price;
      const profitLoss = currentValue - entryValue;
      const profitLossPercentage = (profitLoss / entryValue) * 100;
      
      return {
        id: position.id,
        symbol: position.symbol,
        quantity: position.quantity,
        entryPrice: position.entry_price,
        entryDate: position.entry_date,
        currentPrice: position.current_price,
        currentValue: currentValue,
        profitLoss: profitLoss,
        profitLossPercentage: profitLossPercentage
      };
    });
    
    // Toplam değerleri hesapla
    const totalValue = positions.reduce((sum, position) => sum + position.currentValue, 0);
    const totalProfitLoss = positions.reduce((sum, position) => sum + position.profitLoss, 0);
    const totalCost = positions.reduce((sum, position) => sum + (position.quantity * position.entryPrice), 0);
    const totalProfitLossPercentage = totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;
    
    res.json({
      positions,
      totalValue,
      totalProfitLoss,
      totalProfitLossPercentage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Yeni pozisyon ekle
router.post('/positions', async (req, res) => {
  try {
    const { symbol, quantity, entryPrice, entryDate } = req.body;
    
    // Pozisyonu veritabanına ekle
    const result = await pool.query(
      'INSERT INTO portfolio_positions (user_id, symbol, quantity, entry_price, entry_date) ' +
      'VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, symbol, quantity, entryPrice, entryDate]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Pozisyon güncelle
router.put('/positions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, entryPrice } = req.body;
    
    // Kullanıcının kendi pozisyonunu güncelleyebilmesi için kontrol
    const checkResult = await pool.query(
      'SELECT * FROM portfolio_positions WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Pozisyon bulunamadı veya erişim izniniz yok' });
    }
    
    // Pozisyonu güncelle
    const updateResult = await pool.query(
      'UPDATE portfolio_positions SET quantity = $1, entry_price = $2 WHERE id = $3 RETURNING *',
      [quantity, entryPrice, id]
    );
    
    res.json(updateResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Pozisyon sil
router.delete('/positions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Kullanıcının kendi pozisyonunu silebilmesi için kontrol
    const checkResult = await pool.query(
      'SELECT * FROM portfolio_positions WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Pozisyon bulunamadı veya erişim izniniz yok' });
    }
    
    // Pozisyonu sil
    await pool.query(
      'DELETE FROM portfolio_positions WHERE id = $1',
      [id]
    );
    
    res.json({ message: 'Pozisyon başarıyla silindi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// İşlemleri getir
router.get('/transactions', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM portfolio_transactions WHERE user_id = $1 ORDER BY date DESC',
      [req.user.id]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Yeni işlem ekle
router.post('/transactions', async (req, res) => {
  try {
    const { symbol, type, quantity, price, date, fee } = req.body;
    const total = quantity * price;
    
    // İşlemi veritabanına ekle
    const result = await pool.query(
      'INSERT INTO portfolio_transactions (user_id, symbol, type, quantity, price, total, fee, date) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [req.user.id, symbol, type, quantity, price, total, fee || 0, date]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Performans verilerini getir
router.get('/performance/:period', async (req, res) => {
  try {
    const { period } = req.params;
    const userId = req.user.id;
    
    // Döneme göre tarih aralığı belirle
    let startDate;
    const now = new Date();
    
    switch (period) {
      case 'day':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
      default:
        startDate = new Date(0); // Başlangıç
        break;
    }
    
    // Performans verilerini getir (örnek)
    // Gerçek projede bu kısım daha karmaşık olabilir - portföy değer geçmişi tablosundan veri çekilebilir
    
    // Örnek performans verisi oluştur
    const performanceData = [];
    let portfolioValue = 75000; // Başlangıç değeri
    
    // Döneme göre veri noktası sayısını belirle
    let dataPoints = 30;
    switch (period) {
      case 'day':
        dataPoints = 24; // Saatlik
        break;
      case 'week':
        dataPoints = 7; // Günlük
        break;
      case 'month':
        dataPoints = 30; // Günlük
        break;
      case 'year':
        dataPoints = 12; // Aylık
        break;
      case 'all':
        dataPoints = 24; // Her çeyrek
        break;
    }
    
    // Veri noktaları oluştur
    for (let i = 0; i < dataPoints; i++) {
      const pointDate = new Date(startDate);
      const timeIncrement = (now.getTime() - startDate.getTime()) / (dataPoints - 1);
      pointDate.setTime(startDate.getTime() + i * timeIncrement);
      
      // Trend etkisiyle rastgele değişim
      const change = (Math.random() - 0.45) * 0.03; // Hafif pozitif yanlılık
      portfolioValue = portfolioValue * (1 + change);
      
      performanceData.push({
        date: pointDate.toISOString(),
        value: portfolioValue,
        change: change * 100 // yüzde olarak
      });
    }
    
    // Özet hesapla
    const summary = {
      startValue: performanceData[0].value,
      currentValue: performanceData[performanceData.length - 1].value,
      absoluteChange: performanceData[performanceData.length - 1].value - performanceData[0].value,
      percentageChange: ((performanceData[performanceData.length - 1].value - performanceData[0].value) / performanceData[0].value) * 100
    };
    
    res.json({
      period,
      data: performanceData,
      summary
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

module.exports = router; 