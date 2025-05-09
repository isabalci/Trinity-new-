import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n';
import { useTheme } from '../contexts/ThemeContext';
import { API } from '../services/api';
import { FiUser, FiEdit, FiLock, FiLogOut, FiSave, FiX } from 'react-icons/fi';
import IconWrapper from './IconWrapper';

interface ProfileForm {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const [formData, setFormData] = useState<ProfileForm>({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  useEffect(() => {
    // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendir
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    // Kullanıcı bilgileri değişirse formu güncelle
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [isAuthenticated, navigate, user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    
    try {
      // Şifre değiştirme kontrolü
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setMessage({
            type: 'error',
            text: i18n.t('profile.passwordsDoNotMatch')
          });
          setLoading(false);
          return;
        }
        
        if (!formData.currentPassword) {
          setMessage({
            type: 'error',
            text: i18n.t('profile.currentPasswordRequired')
          });
          setLoading(false);
          return;
        }
      }
      
      // API'ye profil güncelleme isteği gönder
      await API.user.updateProfile({
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword || undefined,
        newPassword: formData.newPassword || undefined
      });
      
      setMessage({
        type: 'success',
        text: i18n.t('profile.updateSuccess')
      });
      
      setIsEditing(false);
      
      // Şifre alanlarını temizle
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || i18n.t('profile.updateError')
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={`profile-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="page-header">
        <h1><IconWrapper icon={FiUser} size={24} /> {i18n.t('profile.title')}</h1>
        <p>{i18n.t('profile.subtitle')}</p>
      </div>
      
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}
      
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <h3>{user?.name}</h3>
            <p className="user-email">{user?.email}</p>
          </div>
          
          <div className="profile-tabs">
            <button 
              className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              {i18n.t('profile.personalInfo')}
            </button>
            <button 
              className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              {i18n.t('profile.security')}
            </button>
          </div>
          
          <button className="logout-button" onClick={logout}>
            <IconWrapper icon={FiLogOut} size={16} />
            {i18n.t('profile.logout')}
          </button>
        </div>
        
        <div className="profile-content">
          {activeTab === 'personal' && (
            <div className="profile-card">
              <div className="card-header">
                <h2>{i18n.t('profile.personalInfo')}</h2>
                {!isEditing && (
                  <button 
                    className="icon-button" 
                    onClick={() => setIsEditing(true)}
                  >
                    <IconWrapper icon={FiEdit} size={18} />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name">{i18n.t('profile.name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">{i18n.t('profile.email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                        setMessage(null);
                      }}
                    >
                      <IconWrapper icon={FiX} size={16} />
                      {i18n.t('profile.cancel')}
                    </button>
                    
                    <button 
                      type="submit" 
                      className="save-button"
                      disabled={loading}
                    >
                      <IconWrapper icon={FiSave} size={16} />
                      {loading ? i18n.t('profile.saving') : i18n.t('profile.save')}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="info-display">
                  <div className="info-item">
                    <span className="info-label">{i18n.t('profile.name')}</span>
                    <span className="info-value">{user?.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">{i18n.t('profile.email')}</span>
                    <span className="info-value">{user?.email}</span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="profile-card">
              <div className="card-header">
                <h2>{i18n.t('profile.changePassword')}</h2>
                <IconWrapper icon={FiLock} size={20} />
              </div>
              
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">{i18n.t('profile.currentPassword')}</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">{i18n.t('profile.newPassword')}</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">{i18n.t('profile.confirmPassword')}</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="save-button"
                  disabled={loading || (!formData.currentPassword && !formData.newPassword && !formData.confirmPassword)}
                >
                  <IconWrapper icon={FiSave} size={16} />
                  {loading ? i18n.t('profile.saving') : i18n.t('profile.updatePassword')}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 