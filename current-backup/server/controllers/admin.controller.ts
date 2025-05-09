import { Request, Response } from 'express';
import pool from '../config/database';

class AdminController {
  async getUsers(req: Request, res: Response) {
    try {
      const result = await pool.query(
        'SELECT id, username, email, full_name, created_at, is_active FROM users ORDER BY created_at DESC'
      );

      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING id',
        [userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }

  async updateUserStatus(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { isActive } = req.body;

      const result = await pool.query(
        'UPDATE users SET is_active = $1 WHERE id = $2 RETURNING id',
        [isActive, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user status' });
    }
  }

  async getUserStatistics(req: Request, res: Response) {
    try {
      const totalUsers = await pool.query('SELECT COUNT(*) FROM users');
      const activeUsers = await pool.query('SELECT COUNT(*) FROM users WHERE is_active = true');
      const inactiveUsers = await pool.query('SELECT COUNT(*) FROM users WHERE is_active = false');
      const newUsersToday = await pool.query(
        "SELECT COUNT(*) FROM users WHERE created_at >= CURRENT_DATE"
      );

      res.status(200).json({
        totalUsers: parseInt(totalUsers.rows[0].count),
        activeUsers: parseInt(activeUsers.rows[0].count),
        inactiveUsers: parseInt(inactiveUsers.rows[0].count),
        newUsersToday: parseInt(newUsersToday.rows[0].count)
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user statistics' });
    }
  }

  async getUserDetails(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const userResult = await pool.query(
        `SELECT 
          u.id,
          u.username,
          u.email,
          u.full_name,
          u.created_at,
          u.is_active,
          us.language,
          us.theme,
          us.chart_preferences,
          us.notification_preferences
        FROM users u
        LEFT JOIN user_settings us ON u.id = us.user_id
        WHERE u.id = $1`,
        [userId]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const watchlistsResult = await pool.query(
        'SELECT id, name FROM watchlists WHERE user_id = $1',
        [userId]
      );

      const alarmsResult = await pool.query(
        'SELECT id, symbol, price, condition, created_at, triggered_at FROM alarms WHERE user_id = $1',
        [userId]
      );

      res.status(200).json({
        user: userResult.rows[0],
        watchlists: watchlistsResult.rows,
        alarms: alarmsResult.rows
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user details' });
    }
  }
}

export default new AdminController(); 