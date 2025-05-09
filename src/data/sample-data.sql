-- Trinity Sample Data SQL

-- Kullanıcılar tablosuna örnek veriler
INSERT INTO users (name, email, password, created_at)
VALUES 
('Admin Kullanıcı', 'admin@trinity.com', '$2a$10$GwXH4JBHZdMIDRBo/9TXdu1MJzjcxC9KrNmgmmUYDSXIIO0vUXi1O', CURRENT_TIMESTAMP), -- şifre: admin123
('Test Kullanıcı', 'test@trinity.com', '$2a$10$RnJsqLhMnK5mkHIqtgQWY.mTu/XA7K6OI0OpB7JXs0R4jC5G3YLYy', CURRENT_TIMESTAMP); -- şifre: test123

-- Markets tablosuna crypto verileri
INSERT INTO markets (symbol, base_asset, quote_asset, market_type, current_price, price_change_24h, volume_24h, market_cap)
VALUES 
('BTC/USD', 'BTC', 'USD', 'crypto', 38245.30, 2.4, 25000000000, 730000000000),
('ETH/USD', 'ETH', 'USD', 'crypto', 2105.42, 1.7, 12000000000, 250000000000),
('XRP/USD', 'XRP', 'USD', 'crypto', 0.48, -1.2, 1500000000, 24000000000),
('LTC/USD', 'LTC', 'USD', 'crypto', 72.35, 0.8, 750000000, 5300000000),
('ADA/USD', 'ADA', 'USD', 'crypto', 0.38, -2.3, 650000000, 13200000000),
('SOL/USD', 'SOL', 'USD', 'crypto', 105.20, 3.5, 2200000000, 42000000000),
('DOT/USD', 'DOT', 'USD', 'crypto', 5.85, 0.5, 320000000, 7300000000),
('AVAX/USD', 'AVAX', 'USD', 'crypto', 28.40, 2.1, 480000000, 10100000000),
('LINK/USD', 'LINK', 'USD', 'crypto', 14.25, 1.3, 550000000, 8200000000),
('MATIC/USD', 'MATIC', 'USD', 'crypto', 0.78, 4.7, 610000000, 7500000000);

-- Markets tablosuna forex verileri
INSERT INTO markets (symbol, base_asset, quote_asset, market_type, current_price, price_change_24h, volume_24h, market_cap)
VALUES 
('EUR/USD', 'EUR', 'USD', 'forex', 1.08, -0.3, 85000000000, NULL),
('GBP/USD', 'GBP', 'USD', 'forex', 1.27, 0.2, 45000000000, NULL),
('USD/JPY', 'USD', 'JPY', 'forex', 153.65, 0.5, 52000000000, NULL),
('USD/CAD', 'USD', 'CAD', 'forex', 1.36, 0.1, 25000000000, NULL),
('AUD/USD', 'AUD', 'USD', 'forex', 0.67, -0.4, 18000000000, NULL);

-- Markets tablosuna stocks verileri
INSERT INTO markets (symbol, base_asset, quote_asset, market_type, current_price, price_change_24h, volume_24h, market_cap)
VALUES 
('AAPL', 'AAPL', 'USD', 'stock', 173.42, 0.8, 12000000000, 2850000000000),
('MSFT', 'MSFT', 'USD', 'stock', 402.65, 1.2, 8500000000, 3000000000000),
('GOOGL', 'GOOGL', 'USD', 'stock', 152.20, 0.5, 5200000000, 1900000000000),
('AMZN', 'AMZN', 'USD', 'stock', 175.35, 0.3, 6800000000, 1800000000000),
('TSLA', 'TSLA', 'USD', 'stock', 215.65, -1.5, 15000000000, 680000000000);

-- Chart_data tablosuna örnek veriler (sadece BTC/USD için birkaç veri noktası)
INSERT INTO chart_data (symbol, interval, time, open, high, low, close, volume)
VALUES
('BTC/USD', '1d', CURRENT_TIMESTAMP - INTERVAL '1 day', 37850.20, 38500.10, 37200.50, 38245.30, 12500000),
('BTC/USD', '1d', CURRENT_TIMESTAMP - INTERVAL '2 days', 38100.40, 38600.30, 37600.20, 37850.20, 11800000),
('BTC/USD', '1d', CURRENT_TIMESTAMP - INTERVAL '3 days', 39200.10, 39500.50, 38050.60, 38100.40, 13200000),
('BTC/USD', '1d', CURRENT_TIMESTAMP - INTERVAL '4 days', 38700.30, 39300.20, 38500.10, 39200.10, 10900000),
('BTC/USD', '1d', CURRENT_TIMESTAMP - INTERVAL '5 days', 38500.70, 38900.40, 38100.30, 38700.30, 9800000);

-- Kullanıcı portföy pozisyonlarını ekle
INSERT INTO portfolio_positions (user_id, symbol, quantity, entry_price, entry_date)
VALUES
(1, 'BTC/USD', 1.25, 36000, CURRENT_TIMESTAMP - INTERVAL '90 days'),
(1, 'ETH/USD', 10, 1800, CURRENT_TIMESTAMP - INTERVAL '60 days'),
(1, 'AAPL', 50, 165.25, CURRENT_TIMESTAMP - INTERVAL '120 days'),
(1, 'EUR/USD', 10000, 1.12, CURRENT_TIMESTAMP - INTERVAL '30 days'),
(2, 'BTC/USD', 0.5, 37500, CURRENT_TIMESTAMP - INTERVAL '45 days'),
(2, 'SOL/USD', 25, 95.50, CURRENT_TIMESTAMP - INTERVAL '20 days');

-- Portföy işlemlerini ekle
INSERT INTO portfolio_transactions (user_id, symbol, type, quantity, price, total, fee, date)
VALUES
(1, 'BTC/USD', 'buy', 1.25, 36000, 45000, 45, CURRENT_TIMESTAMP - INTERVAL '90 days'),
(1, 'ETH/USD', 'buy', 10, 1800, 18000, 18, CURRENT_TIMESTAMP - INTERVAL '60 days'),
(1, 'AAPL', 'buy', 50, 165.25, 8262.5, 8.26, CURRENT_TIMESTAMP - INTERVAL '120 days'),
(1, 'EUR/USD', 'buy', 10000, 1.12, 11200, 11.20, CURRENT_TIMESTAMP - INTERVAL '30 days'),
(2, 'BTC/USD', 'buy', 0.5, 37500, 18750, 18.75, CURRENT_TIMESTAMP - INTERVAL '45 days'),
(2, 'SOL/USD', 'buy', 25, 95.50, 2387.5, 2.39, CURRENT_TIMESTAMP - INTERVAL '20 days');

-- Haberler tablosuna örnek veriler
INSERT INTO news (title, summary, content, category, image, source, published, url)
VALUES
('Bitcoin Surges Past $40,000 as Institutional Interest Grows', 
 'Bitcoin has broken through the $40,000 resistance level, driven by increasing institutional adoption and positive market sentiment.',
 'Bitcoin has surged past $40,000, marking a significant milestone in its recent recovery. The world''s largest cryptocurrency by market capitalization has been on an upward trajectory, fueled by growing institutional interest and positive regulatory developments.',
 'crypto',
 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
 'CryptoDaily',
 CURRENT_TIMESTAMP - INTERVAL '1 day',
 '#'),
('Ethereum 2.0 Upgrade On Track for Q3 Completion',
 'The highly anticipated Ethereum 2.0 upgrade is progressing according to schedule, with developers confirming a Q3 timeline for the final phase.',
 'The Ethereum Foundation has confirmed that the Ethereum 2.0 upgrade remains on track for completion in the third quarter of this year.',
 'crypto',
 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05',
 'ETH News',
 CURRENT_TIMESTAMP - INTERVAL '2 days',
 '#');

-- Kullanıcı tercihlerini ekle
INSERT INTO user_preferences (user_id, theme, language, notifications_enabled)
VALUES
(1, 'dark', 'tr', true),
(2, 'light', 'en', true);

-- İzleme listesine ekle
INSERT INTO watchlist (user_id, symbol)
VALUES
(1, 'BTC/USD'),
(1, 'ETH/USD'),
(1, 'AAPL'),
(2, 'BTC/USD'),
(2, 'SOL/USD'),
(2, 'EUR/USD'); 