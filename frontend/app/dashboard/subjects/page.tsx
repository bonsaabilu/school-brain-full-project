"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { fetchApi } from '../../../lib/api';
import toast from 'react-hot-toast';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await fetchApi('/subjects');
      setSubjects(data);
      toast.success('Subjects loaded successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Subjects</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage academic subjects.</p>
        </div>
        <Button>Add Subject</Button>
      </div>
      <Card>
        <CardContent style={{ padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Code</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={2} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</td></tr>
              ) : subjects.length === 0 ? (
                <tr><td colSpan={2} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No subjects found.</td></tr>
              ) : (
                subjects.map(subject => (
                  <tr key={subject.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{subject.code}</td>
                    <td style={{ padding: '1rem' }}>{subject.name}</td>
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
