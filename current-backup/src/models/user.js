const bcrypt = require('bcryptjs');
const { query } = require('../config/database');

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password_hash = data.password_hash;
    this.full_name = data.full_name;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create({ username, email, password, full_name }) {
    const password_hash = await bcrypt.hash(password, 10);
    
    const result = await query(
      'INSERT INTO users (username, email, password_hash, full_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password_hash, full_name]
    );
    
    return new User(result.rows[0]);
  }

  static async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  static async findById(id) {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      full_name: this.full_name,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = User; 