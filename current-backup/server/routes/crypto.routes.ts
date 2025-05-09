import { Router } from 'express';
import cryptoController from '../controllers/crypto.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/price/:symbol', cryptoController.getLatestPrice);
router.get('/history/:symbol', cryptoController.getPriceHistory);

// Protected routes
router.post('/update', authenticateToken, cryptoController.updatePriceData);

export default router; 