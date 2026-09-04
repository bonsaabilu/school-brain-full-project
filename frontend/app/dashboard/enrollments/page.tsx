"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { fetchApi } from '../../../lib/api';
import toast from 'react-hot-toast';

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    studentId: '',
    classId: ''
  });

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      const data = await fetchApi('/enrollments');
      setEnrollments(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = async () => {
    setShowForm(!showForm);
    if (!showForm && students.length === 0) {
      try {
        const [stData, clData] = await Promise.all([
          fetchApi('/students'),
          fetchApi('/classes')
        ]);
        setStudents(stData);
        setClasses(clData);
      } catch (err: any) {
        toast.error('Failed to load form data');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.classId) {
      toast.error('Please select student and class');
      return;
    }
    setSubmitting(true);
    try {
      await fetchApi('/enrollments', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      toast.success('Student enrolled successfully!');
      setShowForm(false);
      setFormData({ studentId: '', classId: '' });
      loadEnrollments();
    } catch (err: any) {
      toast.error(err.message || 'Failed to enroll student');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Enrollments</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage student enrollments in classes.</p>
        </div>
        <Button onClick={handleOpenForm}>{showForm ? 'Cancel' : 'Enroll Student'}</Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: '2rem' }}>
          <CardContent>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Student</label>
                <select
                  className="form-input"
                  value={formData.studentId}
                  onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                  required
                >
                  <option value="">Select a student...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.studentCode})</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: '1 1 200px' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Class</label>
                <select
                  className="form-input"
                  value={formData.classId}
                  onChange={e => setFormData({ ...formData, classId: e.target.value })}
                  required
                >
                  <option value="">Select a class...</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: '0 0 auto' }}>
                <Button type="submit" isLoading={submitting}>Enroll</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent style={{ padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Student Code</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Class</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Enrolled At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</td></tr>
              ) : enrollments.length === 0 ? (
                <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No enrollments found.</td></tr>
              ) : (
                enrollments.map(enr => (
                  <tr key={enr.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem' }}>{enr.student?.studentCode || 'Unknown'}</td>
                    <td style={{ padding: '1rem' }}>{enr.class?.name || 'Unknown'}</td>
                    <td style={{ padding: '1rem' }}>{new Date(enr.enrolledAt).toLocaleDateString()}</td>
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
