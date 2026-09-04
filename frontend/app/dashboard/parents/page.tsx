"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { fetchApi } from '../../../lib/api';

export default function ParentsPage() {
  const [parents, setParents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadParents();
  }, []);

  const loadParents = async () => {
    try {
      const data = await fetchApi('/parents');
      setParents(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load parents');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Parents</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage parent profiles.</p>
        </div>
        <Button>Add Parent</Button>
      </div>
      {error && <div style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</div>}
      <Card>
        <CardContent style={{ padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Phone</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</td></tr>
              ) : parents.length === 0 ? (
                <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No parents found.</td></tr>
              ) : (
                parents.map(parent => (
                  <tr key={parent.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem' }}>{parent.firstName} {parent.lastName}</td>
                    <td style={{ padding: '1rem' }}>{parent.phone || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{parent.email || 'N/A'}</td>
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
