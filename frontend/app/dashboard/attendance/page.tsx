"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { fetchApi } from '../../../lib/api';
import toast from 'react-hot-toast';

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [classSubjects, setClassSubjects] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    studentId: '',
    classSubjectId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'PRESENT'
  });

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const data = await fetchApi('/attendance');
      setAttendances(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = async () => {
    setShowForm(!showForm);
    if (!showForm && students.length === 0) {
      try {
        const [stData, csData] = await Promise.all([
          fetchApi('/students'),
          fetchApi('/class-subjects')
        ]);
        setStudents(stData);
        setClassSubjects(csData);
      } catch (err: any) {
        toast.error('Failed to load form data');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.classSubjectId) {
      toast.error('Please select student and class subject');
      return;
    }
    setSubmitting(true);
    try {
      await fetchApi('/attendance', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      toast.success('Attendance recorded successfully!');
      setShowForm(false);
      setFormData({ ...formData, studentId: '' }); // reset student
      loadAttendance();
    } catch (err: any) {
      toast.error(err.message || 'Failed to record attendance');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT': return { bg: 'rgba(16, 185, 129, 0.1)', text: 'var(--color-success)' };
      case 'ABSENT': return { bg: 'rgba(239, 68, 68, 0.1)', text: 'var(--color-danger)' };
      case 'LATE': return { bg: 'rgba(245, 158, 11, 0.1)', text: 'var(--color-warning)' };
      case 'EXCUSED': return { bg: 'rgba(14, 165, 233, 0.1)', text: 'var(--color-secondary)' };
      default: return { bg: 'rgba(100, 116, 139, 0.1)', text: 'var(--color-text-muted)' };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Attendance</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage student attendance.</p>
        </div>
        <Button onClick={handleOpenForm}>{showForm ? 'Cancel' : 'Record Attendance'}</Button>
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
                  onChange={e => setFormData({...formData, studentId: e.target.value})}
                  required
                >
                  <option value="">Select a student...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.studentCode})</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: '1 1 200px' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Class Subject</label>
                <select 
                  className="form-input" 
                  value={formData.classSubjectId} 
                  onChange={e => setFormData({...formData, classSubjectId: e.target.value})}
                  required
                >
                  <option value="">Select a subject...</option>
                  {classSubjects.map(cs => (
                    <option key={cs.id} value={cs.id}>{cs.class?.name} - {cs.subject?.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: '1 1 150px' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              <div style={{ flex: '1 1 150px' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Status</label>
                <select 
                  className="form-input" 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="PRESENT">Present</option>
                  <option value="ABSENT">Absent</option>
                  <option value="LATE">Late</option>
                  <option value="EXCUSED">Excused</option>
                </select>
              </div>

              <div style={{ flex: '0 0 auto' }}>
                <Button type="submit" isLoading={submitting}>Save</Button>
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
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Student</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Class Subject</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</td></tr>
              ) : attendances.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No attendance records found.</td></tr>
              ) : (
                attendances.map(record => (
                  <tr key={record.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem' }}>{new Date(record.date).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem' }}>{record.student?.firstName} {record.student?.lastName}</td>
                    <td style={{ padding: '1rem' }}>{record.classSubject?.subject?.name || 'Unknown'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        backgroundColor: getStatusColor(record.status).bg,
                        color: getStatusColor(record.status).text,
                        fontWeight: 500
                      }}>
                        {record.status}
                      </span>
                    </td>
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
