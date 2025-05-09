import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import i18n from '../i18n';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { login, error, loading, clearError } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    clearError();
    
    // Form validasyonu
    if (!email || !password) {
      setFormError(i18n.t('login.errorEmptyFields'));
      return;
    }
    
    try {
      // Mock login için demo kullanıcı kontrolü
      if (process.env.NODE_ENV === 'development' && email === 'demo@trinity.com' && password === 'password') {
        // Mock giriş
        const mockUser = {
          id: '1',
          name: 'Demo User',
          email: 'demo@trinity.com',
          avatar: ''
        };
        
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Ana sayfaya yönlendir
        navigate('/dashboard');
        return;
      }
      
      // Normal login işlemi
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // Auth context'indeki hata mesajı kullanılacak
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">Trinity</div>
          <h1>{i18n.t('login.title')}</h1>
          <p>{i18n.t('login.subtitle')}</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {(error || formError) && (
            <div className="auth-error">
              {formError || error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">{i18n.t('login.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={i18n.t('login.emailPlaceholder')}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{i18n.t('login.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={i18n.t('login.passwordPlaceholder')}
              required
            />
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">{i18n.t('login.rememberMe')}</label>
            </div>
            
            <Link to="/forgot-password" className="forgot-password">
              {i18n.t('login.forgotPassword')}
            </Link>
          </div>
          
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? i18n.t('login.loggingIn') : i18n.t('login.submit')}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {i18n.t('login.noAccount')}{' '}
            <Link to="/register" className="auth-link">
              {i18n.t('login.signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 