"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { getUser, isAuthenticated } from '../../lib/auth';
import styles from './DashboardLayout.module.css';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    const currentUser = getUser();
    if (currentUser?.mustChangePassword) {
      router.push('/change-password');
      return;
    }
    setUser(currentUser);
  }, [router]);

  if (!isMounted || !user) {
    return <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  // Generate title from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const title = pathParts.length > 1 
    ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1) 
    : 'Dashboard';

  return (
    <div className={styles.layout}>
      <Sidebar userRole={user.role} />
      <main className={styles.main}>
        <Header user={user} title={title} />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};
