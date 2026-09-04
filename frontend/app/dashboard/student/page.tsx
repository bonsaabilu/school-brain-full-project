"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card';
import { fetchApi } from '../../../lib/api';
import { getUser } from '../../../lib/auth';

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const storedUser = getUser() || {};
        if (storedUser.id) {
          // Attempt to fetch fresh data from backend
          try {
            const userData = await fetchApi(`/users/${storedUser.id}`);
            setUser(userData);
          } catch (e) {
            setUser(storedUser);
          }

          // Mocking data that would eventually come from the backend (e.g., /grades, /attendance)
          setStats({
            gpa: '3.8',
            attendance: '96%',
            assignmentsDue: 3,
            upcomingExams: 1
          });
        }
      } catch (error) {
        console.error('Failed to load student data', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Student Portal</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Welcome back, {user?.firstName} {user?.lastName}. Here is your academic overview.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Current GPA</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>{stats?.gpa}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Attendance Rate</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)' }}>{stats?.attendance}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Assignments Due</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-warning)' }}>{stats?.assignmentsDue}</p>
          </CardContent>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Your latest academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-text-muted)', padding: '2rem 0', textAlign: 'center' }}>No recent grades found.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-text-muted)', padding: '2rem 0', textAlign: 'center' }}>No classes scheduled for today.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
