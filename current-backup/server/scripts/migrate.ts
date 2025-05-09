import pool from '../config/database';
import fs from 'fs';
import path from 'path';

async function migrate() {
  const client = await pool.connect();
  
  try {
    // Read and execute the SQL file
    const sqlFile = path.join(__dirname, '../config/database.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    
    console.log('Migration completed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

migrate(); 