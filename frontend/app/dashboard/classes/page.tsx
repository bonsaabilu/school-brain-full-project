"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { fetchApi } from '../../../lib/api';

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const data = await fetchApi('/classes');
      setClasses(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Classes</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage academic classes.</p>
        </div>
        <Button>Add Class</Button>
      </div>
      {error && <div style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</div>}
      <Card>
        <CardContent style={{ padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Academic Year</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={2} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</td></tr>
              ) : classes.length === 0 ? (
                <tr><td colSpan={2} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No classes found.</td></tr>
              ) : (
                classes.map(cls => (
                  <tr key={cls.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem' }}>{cls.name}</td>
                    <td style={{ padding: '1rem' }}>{cls.academicYear}</td>
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
