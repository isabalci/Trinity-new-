import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import i18n from '../../i18n';
import { FiMail, FiLock } from 'react-icons/fi';
import IconWrapper from '../IconWrapper';
import '../styles/Auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, error, isLoading } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // Error will be handled by AuthContext
      console.error('Login error:', err);
    }
  };

  return (
    <div className={`auth-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">Trinity</div>
          <h1>{String(i18n.t('auth.login'))}</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <IconWrapper icon={FiMail} size={16} />
              {String(i18n.t('auth.email'))}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={String(i18n.t('auth.email'))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <IconWrapper icon={FiLock} size={16} />
              {String(i18n.t('auth.password'))}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={String(i18n.t('auth.password'))}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              {String(i18n.t('auth.rememberMe'))}
            </label>
            <Link to="/forgot-password" className="auth-link">
              {String(i18n.t('auth.forgotPassword'))}
            </Link>
          </div>

          <button 
            type="submit" 
            className="auth-button" 
            disabled={isLoading}
          >
            {isLoading ? String(i18n.t('common.loading')) : String(i18n.t('auth.login'))}
          </button>

          <div className="auth-links">
            <span>{String(i18n.t('auth.dontHaveAccount'))}</span>
            <Link to="/register" className="auth-link">
              {String(i18n.t('auth.register'))}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 