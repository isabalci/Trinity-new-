/**
 * Trinity Platform örnek veri oluşturma dosyası
 * Bu dosya veritabanına örnek veriler eklemek için kullanılır
 */

const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function seed() {
  try {
    console.log('Örnek verileri eklemeye başlıyorum...');
    
    // Kullanıcı şifresini hashle
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);
    
    // Kullanıcı ekle (eğer yoksa)
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', ['test@example.com']);
    if (userExists.rows.length === 0) {
      await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        ['Test User', 'test@example.com', password]
      );
      console.log('Örnek kullanıcı eklendi');
    } else {
      console.log('Örnek kullanıcı zaten mevcut, atlanıyor');
    }

    // Piyasalar ekleniyor
    const markets = [
      // Kripto piyasaları
      { symbol: 'BTC/USD', base_asset: 'BTC', quote_asset: 'USD', market_type: 'crypto', current_price: 38245.30, price_change_24h: 2.5, volume_24h: 25000000, market_cap: 750000000000 },
      { symbol: 'ETH/USD', base_asset: 'ETH', quote_asset: 'USD', market_type: 'crypto', current_price: 2105.42, price_change_24h: 1.8, volume_24h: 12500000, market_cap: 250000000000 },
      { symbol: 'XRP/USD', base_asset: 'XRP', quote_asset: 'USD', market_type: 'crypto', current_price: 0.512, price_change_24h: -0.7, volume_24h: 3400000, market_cap: 25000000000 },
      { symbol: 'SOL/USD', base_asset: 'SOL', quote_asset: 'USD', market_type: 'crypto', current_price: 142.35, price_change_24h: 4.2, volume_24h: 4800000, market_cap: 62000000000 },
      { symbol: 'ADA/USD', base_asset: 'ADA', quote_asset: 'USD', market_type: 'crypto', current_price: 0.325, price_change_24h: -1.2, volume_24h: 2100000, market_cap: 12000000000 },
      
      // Forex piyasaları
      { symbol: 'EUR/USD', base_asset: 'EUR', quote_asset: 'USD', market_type: 'forex', current_price: 1.0825, price_change_24h: 0.15, volume_24h: 125000000, market_cap: null },
      { symbol: 'GBP/USD', base_asset: 'GBP', quote_asset: 'USD', market_type: 'forex', current_price: 1.2645, price_change_24h: -0.22, volume_24h: 85000000, market_cap: null },
      { symbol: 'USD/JPY', base_asset: 'USD', quote_asset: 'JPY', market_type: 'forex', current_price: 154.28, price_change_24h: 0.32, volume_24h: 95000000, market_cap: null },
      { symbol: 'USD/CAD', base_asset: 'USD', quote_asset: 'CAD', market_type: 'forex', current_price: 1.3652, price_change_24h: -0.11, volume_24h: 45000000, market_cap: null },
      { symbol: 'AUD/USD', base_asset: 'AUD', quote_asset: 'USD', market_type: 'forex', current_price: 0.6615, price_change_24h: 0.08, volume_24h: 37500000, market_cap: null },
      
      // Hisse senedi piyasaları
      { symbol: 'AAPL', base_asset: 'AAPL', quote_asset: 'USD', market_type: 'stock', current_price: 175.30, price_change_24h: 0.85, volume_24h: 65000000, market_cap: 2750000000000 },
      { symbol: 'MSFT', base_asset: 'MSFT', quote_asset: 'USD', market_type: 'stock', current_price: 415.22, price_change_24h: 1.25, volume_24h: 32000000, market_cap: 3100000000000 },
      { symbol: 'GOOGL', base_asset: 'GOOGL', quote_asset: 'USD', market_type: 'stock', current_price: 170.85, price_change_24h: -0.35, volume_24h: 28000000, market_cap: 2150000000000 },
      { symbol: 'AMZN', base_asset: 'AMZN', quote_asset: 'USD', market_type: 'stock', current_price: 181.05, price_change_24h: 2.15, volume_24h: 42000000, market_cap: 1900000000000 },
      { symbol: 'TSLA', base_asset: 'TSLA', quote_asset: 'USD', market_type: 'stock', current_price: 195.32, price_change_24h: -1.45, volume_24h: 80000000, market_cap: 620000000000 }
    ];
    
    // Piyasaları ekle
    for (const market of markets) {
      const marketExists = await pool.query('SELECT * FROM markets WHERE symbol = $1', [market.symbol]);
      
      if (marketExists.rows.length === 0) {
        await pool.query(
          'INSERT INTO markets (symbol, base_asset, quote_asset, market_type, current_price, price_change_24h, volume_24h, market_cap) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [market.symbol, market.base_asset, market.quote_asset, market.market_type, market.current_price, market.price_change_24h, market.volume_24h, market.market_cap]
        );
      }
    }
    console.log('Piyasa verileri eklendi');
    
    // Örnek haberler
    const news = [
      {
        title: 'Bitcoin 40,000 Doları Aştı',
        summary: 'Kurumsal yatırımcıların ilgisinin artmasıyla Bitcoin 40.000 dolar seviyesinin üzerine çıktı.',
        content: 'Bitcoin, kurumsal yatırımcıların artan ilgisi ve olumlu piyasa duyarlılığı ile 40.000 dolar direncini kırdı. Analistler, büyük kurumların kripto para piyasasına girmeye devam etmesiyle fiyatlardaki yükselişin sürebileceğini belirtiyor.',
        category: 'crypto',
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
        source: 'Kripto Haber',
        published: new Date(),
        url: 'https://example.com/bitcoin-40000'
      },
      {
        title: 'Fed Faiz İndirimi Sinyali Verdi',
        summary: 'Federal Rezerv, enflasyon baskısının azalmasıyla önümüzdeki aylarda faiz indirimi yapabileceğini işaret etti.',
        content: 'ABD Merkez Bankası Fed, son toplantısında enflasyon göstergelerinin iyileşmesi durumunda faiz indirimine gidebileceğini açıkladı. Piyasalar, yılın ikinci yarısında en az iki kez çeyrek puanlık faiz indirimi bekliyor.',
        category: 'economy',
        image: 'https://images.unsplash.com/photo-1611324568415-d1a73c92fc9c',
        source: 'Ekonomi Bülteni',
        published: new Date(Date.now() - 86400000), // 1 gün önce
        url: 'https://example.com/fed-faiz-indirimi'
      },
      {
        title: 'EUR/USD Paritesi 6 Aylık Zirvede',
        summary: 'Avrupa Merkez Bankası\'nın şahin duruşu sonrası EUR/USD paritesi 6 aylık zirveye ulaştı.',
        content: 'EUR/USD paritesi, Avrupa Merkez Bankası\'nın faiz oranlarını yüksek tutma kararı sonrası altı aylık zirveye ulaştı. Analistler, paritedeki yükselişin devam edebileceğini öngörüyor.',
        category: 'forex',
        image: 'https://images.unsplash.com/photo-1620266757065-5814220ee884',
        source: 'Forex Analiz',
        published: new Date(Date.now() - 172800000), // 2 gün önce
        url: 'https://example.com/eurusd-zirve'
      },
      {
        title: 'Apple Yapay Zeka Stratejisini Açıkladı',
        summary: 'Apple, yapay zeka stratejisini açıklayarak ürün ekosisteminde AI özelliklerini genişleteceğini duyurdu.',
        content: 'Apple, yıllık geliştirici konferansında kapsamlı yapay zeka stratejisini açıkladı. Şirket, Siri\'nin yeteneklerini artıracak ve tüm cihazlarında yapay zeka entegrasyonunu genişletecek.',
        category: 'technology',
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9',
        source: 'Teknoloji Haberleri',
        published: new Date(Date.now() - 259200000), // 3 gün önce
        url: 'https://example.com/apple-ai-strategy'
      },
      {
        title: 'Tesla Rekor Çeyrek Teslimatı Açıkladı',
        summary: 'Tesla, beklentilerin üzerinde çeyrek teslimat rakamları açıkladı ve hisse değeri yükseldi.',
        content: 'Elektrikli araç üreticisi Tesla, rekor kıran çeyrek dönem teslimat rakamlarını açıkladı. Şirket, beklentilerin üzerinde 240.000 araç teslim etti ve hisse değeri %8 yükseldi.',
        category: 'stocks',
        image: 'https://images.unsplash.com/photo-1620057832532-a868c9b3a4b3',
        source: 'Borsa Haberleri',
        published: new Date(Date.now() - 345600000), // 4 gün önce
        url: 'https://example.com/tesla-deliveries'
      }
    ];
    
    // Haberleri ekle
    for (const item of news) {
      const newsExists = await pool.query('SELECT * FROM news WHERE title = $1', [item.title]);
      
      if (newsExists.rows.length === 0) {
        await pool.query(
          'INSERT INTO news (title, summary, content, category, image, source, published, url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [item.title, item.summary, item.content, item.category, item.image, item.source, item.published, item.url]
        );
      }
    }
    console.log('Haber verileri eklendi');
    
    // BTC/USD için örnek grafik verileri
    const now = new Date();
    const intervals = ['1h', '4h', '1d'];
    let basePrice = 38245.30;
    
    for (const interval of intervals) {
      // Her interval için son 100 veri noktası oluştur
      let timeStep;
      switch (interval) {
        case '1h': timeStep = 60 * 60 * 1000; break; // 1 saat
        case '4h': timeStep = 4 * 60 * 60 * 1000; break; // 4 saat
        case '1d': timeStep = 24 * 60 * 60 * 1000; break; // 1 gün
      }
      
      for (let i = 100; i > 0; i--) {
        const time = new Date(now.getTime() - (i * timeStep));
        
        // Rastgele fiyat değişimleri
        const change = (Math.random() - 0.5) * 0.02; // -1% ile +1% arası
        basePrice = basePrice * (1 + change);
        
        // OHLCV verileri
        const open = basePrice;
        const high = basePrice * (1 + Math.random() * 0.01);
        const low = basePrice * (1 - Math.random() * 0.01);
        const close = basePrice * (1 + (Math.random() - 0.5) * 0.005);
        const volume = Math.floor(Math.random() * 1000) + 100;
        
        // Veriyi ekle (eğer mevcut değilse)
        const dataExists = await pool.query(
          'SELECT * FROM chart_data WHERE symbol = $1 AND interval = $2 AND time = $3',
          ['BTC/USD', interval, time]
        );
        
        if (dataExists.rows.length === 0) {
          await pool.query(
            'INSERT INTO chart_data (symbol, interval, time, open, high, low, close, volume) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            ['BTC/USD', interval, time, open, high, low, close, volume]
          );
        }
      }
    }
    console.log('BTC/USD için grafik verileri eklendi');
    
    console.log('Veritabanı örnek verileri başarıyla eklendi!');
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    // Bağlantıyı kapat (opsiyonel)
    // pool.end();
  }
}

// Seed fonksiyonunu çalıştır
seed(); 