"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { fetchApi } from '../../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd fetch actual stats, for now mock it to look good
    setTimeout(() => {
      setStats({
        students: 1240,
        teachers: 85,
        classes: 42,
        attendance: '94%'
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back!</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Here is what is happening at your school today.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Students</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {loading ? '...' : stats.students}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Teachers</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
              {loading ? '...' : stats.teachers}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Classes</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-warning)' }}>
              {loading ? '...' : stats.classes}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Average Attendance</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)' }}>
              {loading ? '...' : stats.attendance}
            </p>
          </CardContent>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from the school system</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-text-muted)', padding: '2rem 0', textAlign: 'center' }}>No recent activity to display.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-text-muted)', padding: '2rem 0', textAlign: 'center' }}>No upcoming events.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
