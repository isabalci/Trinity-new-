import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import activityService from './activity.service';
import { Request } from 'express';

export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  is_admin: boolean;
  is_active: boolean;
}

export interface UserWithPassword extends User {
  password_hash: string;
}

class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private readonly SALT_ROUNDS = 10;

  async register(username: string, email: string, password: string, fullName?: string, req?: Request): Promise<User> {
    try {
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        throw new Error('Username or email already exists');
      }

      const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS);

      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash, full_name) VALUES ($1, $2, $3, $4) RETURNING id, username, email, full_name, is_admin, is_active',
        [username, email, passwordHash, fullName]
      );

      // Create default user settings
      await pool.query(
        'INSERT INTO user_settings (user_id) VALUES ($1)',
        [result.rows[0].id]
      );

      // Create default watchlist
      await pool.query(
        'INSERT INTO watchlists (user_id, name) VALUES ($1, $2)',
        [result.rows[0].id, 'Default']
      );

      // Log activity
      if (req) {
        const clientInfo = activityService.getClientInfo(req);
        await activityService.logActivity({
          userId: result.rows[0].id,
          activityType: activityService.ACTIVITY_TYPES.REGISTER,
          description: 'User registration',
          ...clientInfo
        });
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string, req?: Request): Promise<{ user: User; token: string }> {
    try {
      const result = await pool.query<UserWithPassword>(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );

      if (result.rows.length === 0) {
        throw new Error('Invalid username or password');
      }

      const user = result.rows[0];

      if (!user.is_active) {
        throw new Error('Account is inactive');
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        throw new Error('Invalid username or password');
      }

      // Update last login time
      await pool.query(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
        [user.id]
      );

      const token = jwt.sign(
        { userId: user.id, username: user.username, isAdmin: user.is_admin },
        this.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Log activity
      if (req) {
        const clientInfo = activityService.getClientInfo(req);
        await activityService.logActivity({
          userId: user.id,
          activityType: activityService.ACTIVITY_TYPES.LOGIN,
          description: 'User login',
          ...clientInfo
        });
      }

      const { password_hash, ...userWithoutPassword } = user;
      return { user: userWithoutPassword, token };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: number): Promise<User | null> {
    try {
      const result = await pool.query<User>(
        'SELECT id, username, email, full_name, is_admin, is_active FROM users WHERE id = $1',
        [userId]
      );

      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: number, updates: Partial<User>, req?: Request): Promise<User> {
    try {
      const { username, email, full_name } = updates;
      const result = await pool.query<User>(
        'UPDATE users SET username = COALESCE($1, username), email = COALESCE($2, email), full_name = COALESCE($3, full_name) WHERE id = $4 RETURNING id, username, email, full_name, is_admin, is_active',
        [username, email, full_name, userId]
      );

      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      // Log activity
      if (req) {
        const clientInfo = activityService.getClientInfo(req);
        await activityService.logActivity({
          userId,
          activityType: activityService.ACTIVITY_TYPES.PROFILE_UPDATE,
          description: 'Profile updated',
          ...clientInfo
        });
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string, req?: Request): Promise<void> {
    try {
      const result = await pool.query<UserWithPassword>(
        'SELECT * FROM users WHERE id = $1',
        [userId]
      );

      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      const user = result.rows[0];
      const isValidPassword = await bcrypt.compare(oldPassword, user.password_hash);

      if (!isValidPassword) {
        throw new Error('Invalid current password');
      }

      const newPasswordHash = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

      await pool.query(
        'UPDATE users SET password_hash = $1 WHERE id = $2',
        [newPasswordHash, userId]
      );

      // Log activity
      if (req) {
        const clientInfo = activityService.getClientInfo(req);
        await activityService.logActivity({
          userId,
          activityType: activityService.ACTIVITY_TYPES.PASSWORD_CHANGE,
          description: 'Password changed',
          ...clientInfo
        });
      }
    } catch (error) {
      throw error;
    }
  }

  verifyToken(token: string): { userId: number; username: string; isAdmin: boolean } {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: number; username: string; isAdmin: boolean };
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export default new AuthService(); 