import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'trinity_db',
  password: 'postgres123',
  port: 5432,
  ssl: false
});

export default pool; 