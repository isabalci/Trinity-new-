import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import i18n from '../i18n';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { register, error, loading, clearError } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    clearError();
    
    // Form validasyonu
    if (!name || !email || !password || !confirmPassword) {
      setFormError(i18n.t('register.errorEmptyFields'));
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError(i18n.t('register.errorPasswordMatch'));
      return;
    }
    
    if (password.length < 6) {
      setFormError(i18n.t('register.errorPasswordLength'));
      return;
    }
    
    try {
      // Mock kayıt işlemi (geliştirme ortamında)
      if (process.env.NODE_ENV === 'development' && email === 'demo@trinity.com') {
        // Mock kullanıcı
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
      
      // Normal kayıt işlemi
      await register(name, email, password);
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
          <h1>{i18n.t('register.title')}</h1>
          <p>{i18n.t('register.subtitle')}</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {(error || formError) && (
            <div className="auth-error">
              {formError || error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="name">{i18n.t('register.name')}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={i18n.t('register.namePlaceholder')}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">{i18n.t('register.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={i18n.t('register.emailPlaceholder')}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{i18n.t('register.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={i18n.t('register.passwordPlaceholder')}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">{i18n.t('register.confirmPassword')}</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={i18n.t('register.confirmPasswordPlaceholder')}
              required
            />
          </div>
          
          <div className="form-options">
            <div className="terms-agreement">
              <input
                type="checkbox"
                id="terms"
                required
              />
              <label htmlFor="terms">{i18n.t('register.termsAgreement')} 
                <Link to="/terms" className="auth-link"> {i18n.t('register.terms')}</Link>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? i18n.t('register.registering') : i18n.t('register.submit')}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {i18n.t('register.haveAccount')}{' '}
            <Link to="/login" className="auth-link">
              {i18n.t('register.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 