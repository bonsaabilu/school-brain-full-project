"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { logout } from '../../lib/auth';
import styles from './DashboardLayout.module.css';

interface HeaderProps {
  user: { firstName: string; lastName: string; role: string };
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ user, title }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <div className={styles.headerActions}>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{user?.firstName} {user?.lastName}</p>
          <p className={styles.userRole}>{user?.role?.replace('_', ' ') || 'User'}</p>
        </div>
        <Button variant="secondary" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
};
