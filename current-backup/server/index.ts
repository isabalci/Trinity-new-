import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authController from './controllers/auth.controller';
import adminController from './controllers/admin.controller';
import { authenticateToken } from './middleware/auth.middleware';
import { isAdmin } from './middleware/admin.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// Protected routes
app.get('/api/auth/profile', authenticateToken, authController.getProfile);
app.put('/api/auth/profile', authenticateToken, authController.updateProfile);
app.put('/api/auth/change-password', authenticateToken, authController.changePassword);

// Admin routes
app.get('/api/admin/users', authenticateToken, isAdmin, adminController.getUsers);
app.delete('/api/admin/users/:userId', authenticateToken, isAdmin, adminController.deleteUser);
app.put('/api/admin/users/:userId/status', authenticateToken, isAdmin, adminController.updateUserStatus);
app.get('/api/admin/statistics', authenticateToken, isAdmin, adminController.getUserStatistics);
app.get('/api/admin/users/:userId/details', authenticateToken, isAdmin, adminController.getUserDetails);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 