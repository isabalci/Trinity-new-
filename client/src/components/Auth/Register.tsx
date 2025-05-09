import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import i18n from '../../i18n';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import IconWrapper from '../IconWrapper';
import '../styles/Auth.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { register, error, isLoading } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch error
      return;
    }
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      // Error will be handled by AuthContext
      console.error('Registration error:', err);
    }
  };

  return (
    <div className={`auth-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">Trinity</div>
          <h1>{String(i18n.t('auth.register'))}</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">
              <IconWrapper icon={FiUser} size={16} />
              {String(i18n.t('auth.name'))}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={String(i18n.t('auth.name'))}
              required
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <IconWrapper icon={FiLock} size={16} />
              {String(i18n.t('auth.confirmPassword'))}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={String(i18n.t('auth.confirmPassword'))}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
              />
              {String(i18n.t('auth.agreeToTerms'))}
            </label>
          </div>

          <button 
            type="submit" 
            className="auth-button" 
            disabled={isLoading || !agreeToTerms}
          >
            {isLoading ? String(i18n.t('common.loading')) : String(i18n.t('auth.register'))}
          </button>

          <div className="auth-links">
            <span>{String(i18n.t('auth.alreadyHaveAccount'))}</span>
            <Link to="/login" className="auth-link">
              {String(i18n.t('auth.login'))}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 