import { Request } from 'express';
import pool from '../config/database';

export interface ActivityLog {
  userId: number;
  activityType: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
}

class ActivityService {
  async logActivity(activity: ActivityLog) {
    try {
      await pool.query(
        `INSERT INTO user_activity_log 
        (user_id, activity_type, description, ip_address, user_agent)
        VALUES ($1, $2, $3, $4, $5)`,
        [
          activity.userId,
          activity.activityType,
          activity.description,
          activity.ipAddress,
          activity.userAgent
        ]
      );
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  }

  async getUserActivities(userId: number, limit: number = 50) {
    try {
      const result = await pool.query(
        `SELECT * FROM user_activity_log 
        WHERE user_id = $1 
        ORDER BY created_at DESC 
        LIMIT $2`,
        [userId, limit]
      );

      return result.rows;
    } catch (error) {
      console.error('Failed to fetch user activities:', error);
      return [];
    }
  }

  getClientInfo(req: Request) {
    return {
      ipAddress: req.ip || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    };
  }

  // Activity type constants
  static readonly ACTIVITY_TYPES = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',
    PROFILE_UPDATE: 'PROFILE_UPDATE',
    PASSWORD_CHANGE: 'PASSWORD_CHANGE',
    WATCHLIST_CREATE: 'WATCHLIST_CREATE',
    WATCHLIST_UPDATE: 'WATCHLIST_UPDATE',
    WATCHLIST_DELETE: 'WATCHLIST_DELETE',
    ALARM_CREATE: 'ALARM_CREATE',
    ALARM_UPDATE: 'ALARM_UPDATE',
    ALARM_DELETE: 'ALARM_DELETE',
    ALARM_TRIGGER: 'ALARM_TRIGGER',
    SETTINGS_UPDATE: 'SETTINGS_UPDATE'
  };
}

export default new ActivityService(); 