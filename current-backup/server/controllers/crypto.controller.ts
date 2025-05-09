import { Request, Response } from 'express';
import cryptoService from '../services/crypto.service';

class CryptoController {
  async getPriceHistory(req: Request, res: Response) {
    try {
      const { symbol } = req.params;
      const { startTime, endTime } = req.query;

      if (!symbol || !startTime || !endTime) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const data = await cryptoService.getPriceHistory(
        symbol,
        parseInt(startTime as string),
        parseInt(endTime as string)
      );

      res.json(data);
    } catch (error) {
      console.error('Error fetching price history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getLatestPrice(req: Request, res: Response) {
    try {
      const { symbol } = req.params;

      if (!symbol) {
        return res.status(400).json({ error: 'Missing symbol parameter' });
      }

      const data = await cryptoService.getLatestPrice(symbol);
      
      if (!data) {
        return res.status(404).json({ error: 'Price data not found' });
      }

      res.json(data);
    } catch (error) {
      console.error('Error fetching latest price:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updatePriceData(req: Request, res: Response) {
    try {
      const priceData = req.body;

      if (!Array.isArray(priceData)) {
        return res.status(400).json({ error: 'Invalid data format' });
      }

      await cryptoService.savePriceData(priceData);
      res.json({ message: 'Price data updated successfully' });
    } catch (error) {
      console.error('Error updating price data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new CryptoController(); 