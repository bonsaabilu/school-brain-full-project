"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { fetchApi } from '../../../lib/api';
import toast from 'react-hot-toast';

const calculateAttendance = (attendances: any[]) => {
  if (!attendances || attendances.length === 0) return <span style={{ color: 'var(--color-text-muted)' }}>N/A</span>;
  const presentCount = attendances.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
  const percentage = Math.round((presentCount / attendances.length) * 100);
  
  let color = 'var(--color-success)';
  if (percentage < 75) color = 'var(--color-danger)';
  else if (percentage < 90) color = 'var(--color-warning)';

  return <span style={{ color, fontWeight: 500, padding: '0.25rem 0.5rem', borderRadius: '9999px', backgroundColor: `${color}20` }}>{percentage}%</span>;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState<string | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await fetchApi('/students');
      setStudents(data);
      toast.success('Students loaded successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const evaluateStudent = async (id: string) => {
    try {
      setEvaluating(id);
      await fetchApi(`/ai/evaluate-student/${id}`, { method: 'POST' });
      toast.success('AI Evaluation complete');
      await loadStudents(); // Reload to get updated flag
    } catch (err: any) {
      toast.error(err.message || 'Evaluation failed');
    } finally {
      setEvaluating(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Students</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage student enrollments and records.</p>
        </div>
        <Button>Register Student</Button>
      </div>
      <Card>
        <CardContent style={{ padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Student Code</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Gender</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Attendance</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>AI Flag</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Risk Score</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No students found.</td></tr>
              ) : (
                students.map(student => (
                  <tr key={student.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem' }}>{student.studentCode}</td>
                    <td style={{ padding: '1rem' }}>{student.firstName} {student.lastName}</td>
                    <td style={{ padding: '1rem' }}>{student.gender || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{calculateAttendance(student.attendances)}</td>
                    <td style={{ padding: '1rem' }}>
                      {student.needsSupport ? (
                        <span style={{ color: 'var(--color-danger)', backgroundColor: 'var(--color-danger)20', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>Needs Support</span>
                      ) : (
                        <span style={{ color: 'var(--color-success)', backgroundColor: 'var(--color-success)20', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>On Track</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {student.riskScore !== null && student.riskScore !== undefined ? (
                        <span style={{ fontWeight: 600, color: student.riskScore >= 0.65 ? 'var(--color-danger)' : 'var(--color-success)' }}>
                          {(student.riskScore * 100).toFixed(0)}%
                        </span>
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)' }}>N/A</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <Button size="sm" onClick={() => evaluateStudent(student.id)} isLoading={evaluating === student.id}>
                        Evaluate AI
                      </Button>
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
