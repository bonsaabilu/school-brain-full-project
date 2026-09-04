"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './DashboardLayout.module.css';

type NavItem = {
  label: string;
  href?: string;
  roles: string[];
  subItems?: { label: string; href: string; roles: string[] }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
  { 
    label: 'Create', 
    roles: ['SUPER_ADMIN', 'ADMIN'],
    subItems: [
      { label: 'Admin', href: '/dashboard/create/admin', roles: ['SUPER_ADMIN'] },
      { label: 'Teacher', href: '/dashboard/create/teacher', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { label: 'Student', href: '/dashboard/create/student', roles: ['SUPER_ADMIN', 'ADMIN'] }
    ]
  },
  { label: 'Users', href: '/dashboard/users', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { label: 'Teachers', href: '/dashboard/teachers', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { label: 'Students', href: '/dashboard/students', roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
  { label: 'Parents', href: '/dashboard/parents', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { label: 'Classes', href: '/dashboard/classes', roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
  { label: 'Enrollments', href: '/dashboard/enrollments', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { label: 'Subjects', href: '/dashboard/subjects', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { label: 'Attendance', href: '/dashboard/attendance', roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'] },
  { label: 'Grades', href: '/dashboard/grades', roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
];

export const Sidebar = ({ userRole }: { userRole: string }) => {
  const pathname = usePathname();
  const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(userRole));
  
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <Image src="/assets/logo.png" alt="School Brain Logo" width={180} height={60} style={{ objectFit: 'contain' }} priority />
      </div>
      <nav className={styles.sidebarNav}>
        {visibleItems.map((item) => {
          if (item.subItems) {
            const visibleSubItems = item.subItems.filter(sub => sub.roles.includes(userRole));
            if (visibleSubItems.length === 0) return null;
            
            const isExpanded = expandedItems[item.label];
            const isActive = item.subItems.some(sub => pathname.startsWith(sub.href));

            return (
              <div key={item.label}>
                <div 
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`} 
                  onClick={() => toggleExpand(item.label)}
                  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>{item.label}</span>
                  <span style={{ fontSize: '0.8em' }}>{isExpanded ? '▼' : '▶'}</span>
                </div>
                {isExpanded && (
                  <div style={{ marginLeft: '1rem' }}>
                    {visibleSubItems.map(subItem => (
                      <Link 
                        key={subItem.href} 
                        href={subItem.href}
                        className={`${styles.navItem} ${pathname === subItem.href ? styles.navItemActive : ''}`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href || item.label} 
              href={item.href!}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
