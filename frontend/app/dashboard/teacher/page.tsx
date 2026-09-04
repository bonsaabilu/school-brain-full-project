"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card';
import { fetchApi } from '../../../lib/api';
import { getUser } from '../../../lib/auth';

export default function TeacherDashboard() {
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

          // Mocking data that would eventually come from the backend (e.g., /classes, /submissions)
          setStats({
            activeClasses: 4,
            totalStudents: 112,
            assignmentsToGrade: 28,
            nextClass: 'Mathematics 10A'
          });
        }
      } catch (error) {
        console.error('Failed to load teacher data', error);
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
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Teacher Portal</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Welcome back, {user?.firstName} {user?.lastName}. Here is your class overview.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Active Classes</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>{stats?.activeClasses}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Students</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)' }}>{stats?.totalStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Pending Grades</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-warning)' }}>{stats?.assignmentsToGrade}</p>
          </CardContent>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Manage your assigned classes</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-text-muted)', padding: '2rem 0', textAlign: 'center' }}>No classes assigned yet.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Submissions and student updates</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-text-muted)', padding: '2rem 0', textAlign: 'center' }}>No recent activity to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
