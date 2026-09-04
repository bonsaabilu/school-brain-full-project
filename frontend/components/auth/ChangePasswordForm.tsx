"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { fetchApi } from '../../lib/api';

export const ChangePasswordForm = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      await fetchApi('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.mustChangePassword = false;
        localStorage.setItem('user', JSON.stringify(user));
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>Change Password</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Please update your temporary password to continue</p>
      </div>
      <Card glass>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="currentPassword">Current Password</label>
              <input 
                id="currentPassword"
                type="password" 
                className="form-input" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">New Password</label>
              <input 
                id="newPassword"
                type="password" 
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
                minLength={8}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
              <input 
                id="confirmPassword"
                type="password" 
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
                minLength={8}
              />
            </div>
            {error && <div className="form-error" style={{marginBottom: '1rem'}}>{error}</div>}
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
