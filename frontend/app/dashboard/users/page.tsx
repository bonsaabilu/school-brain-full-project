"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { fetchApi } from '../../../lib/api';
import { User } from '../../../types/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchApi('/users');
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>User Management</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage system users and their roles.</p>
        </div>
        <Button>Add User</Button>
      </div>
      {error && <div style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</div>}
      <Card>
        <CardContent style={{ padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Role</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No users found.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem' }}>{user.firstName} {user.lastName}</td>
                    <td style={{ padding: '1rem' }}>{user.email}</td>
                    <td style={{ padding: '1rem' }}>{user.role}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        backgroundColor: user.isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: user.isActive ? 'var(--color-success)' : 'var(--color-danger)'
                      }}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
