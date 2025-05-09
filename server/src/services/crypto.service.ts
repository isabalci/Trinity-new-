import { Pool, PoolClient } from 'pg';
import pool from '../config/database';

interface CryptoPriceData {
  symbol: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

class CryptoService {
  private async withTransaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async savePriceData(data: CryptoPriceData[]): Promise<void> {
    await this.withTransaction(async (client) => {
      for (const item of data) {
        try {
          await client.query(
            `INSERT INTO crypto_price_history (symbol, timestamp, open, high, low, close, volume)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (symbol, timestamp) DO UPDATE
             SET open = $3, high = $4, low = $5, close = $6, volume = $7`,
            [
              item.symbol,
              item.timestamp,
              item.open,
              item.high,
              item.low,
              item.close,
              item.volume
            ]
          );
        } catch (error) {
          console.error(`Error saving price data for ${item.symbol}:`, error);
          throw error;
        }
      }
    });
  }

  async getPriceHistory(symbol: string, startTime: number, endTime: number): Promise<CryptoPriceData[]> {
    const result = await pool.query(
      `SELECT symbol, timestamp, open, high, low, close, volume
       FROM crypto_price_history
       WHERE symbol = $1 AND timestamp BETWEEN $2 AND $3
       ORDER BY timestamp ASC`,
      [symbol, startTime, endTime]
    );
    return result.rows;
  }

  async getLatestPrice(symbol: string): Promise<CryptoPriceData | null> {
    const result = await pool.query(
      `SELECT symbol, timestamp, open, high, low, close, volume
       FROM crypto_price_history
       WHERE symbol = $1
       ORDER BY timestamp DESC
       LIMIT 1`,
      [symbol]
    );
    return result.rows[0] || null;
  }
}

export default new CryptoService(); 