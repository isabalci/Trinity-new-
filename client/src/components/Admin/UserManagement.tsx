import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiTrash2, FiEdit2, FiUserX, FiUserCheck } from 'react-icons/fi';
import IconWrapper from '../IconWrapper';
import '../styles/Admin.css';

interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  created_at: string;
  is_active: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm(t('confirmDeleteUser'))) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const handleToggleUserStatus = async (userId: number, isActive: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive })
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_active: isActive } : user
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user status');
    }
  };

  if (loading) {
    return <div className="admin-loading">{t('loading')}</div>;
  }

  if (error) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="admin-container">
      <h2>{t('userManagement')}</h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t('username')}</th>
              <th>{t('email')}</th>
              <th>{t('fullName')}</th>
              <th>{t('createdAt')}</th>
              <th>{t('status')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.full_name || '-'}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                    {user.is_active ? t('active') : t('inactive')}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-button"
                      onClick={() => handleToggleUserStatus(user.id, !user.is_active)}
                      title={user.is_active ? t('deactivateUser') : t('activateUser')}
                    >
                      <IconWrapper 
                        icon={user.is_active ? FiUserX : FiUserCheck} 
                        size={16}
                      />
                    </button>
                    <button
                      className="action-button edit"
                      onClick={() => {/* TODO: Implement edit user */}}
                      title={t('editUser')}
                    >
                      <IconWrapper icon={FiEdit2} size={16} />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteUser(user.id)}
                      title={t('deleteUser')}
                    >
                      <IconWrapper icon={FiTrash2} size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 