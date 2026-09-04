"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { fetchApi } from '../../../lib/api';
import toast from 'react-hot-toast';

export default function GradesPage() {
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [classSubjects, setClassSubjects] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    studentId: '',
    classSubjectId: '',
    term: 'TERM1',
    score: '',
    maxScore: '100'
  });

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const data = await fetchApi('/grades');
      setGrades(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load grades');
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
      await fetchApi('/grades', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          score: Number(formData.score),
          maxScore: Number(formData.maxScore)
        })
      });
      toast.success('Grade recorded successfully!');
      setShowForm(false);
      setFormData({ ...formData, studentId: '', score: '' }); // reset student and score
      loadGrades();
    } catch (err: any) {
      toast.error(err.message || 'Failed to record grade');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Grades</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage student grades and marks.</p>
        </div>
        <Button onClick={handleOpenForm}>{showForm ? 'Cancel' : 'Enter Grades'}</Button>
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

              <div style={{ flex: '1 1 120px' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Term</label>
                <select 
                  className="form-input" 
                  value={formData.term} 
                  onChange={e => setFormData({...formData, term: e.target.value})}
                  required
                >
                  <option value="TERM1">Term 1</option>
                  <option value="TERM2">Term 2</option>
                  <option value="TERM3">Term 3</option>
                </select>
              </div>

              <div style={{ flex: '1 1 100px' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Score</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={formData.score}
                  onChange={e => setFormData({...formData, score: e.target.value})}
                  required
                  min="0"
                  step="0.1"
                />
              </div>

              <div style={{ flex: '1 1 100px' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Max</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={formData.maxScore}
                  onChange={e => setFormData({...formData, maxScore: e.target.value})}
                  required
                  min="1"
                />
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
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Student</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Subject</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Teacher</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Term</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</td></tr>
              ) : grades.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No grades found.</td></tr>
              ) : (
                grades.map(grade => (
                  <tr key={grade.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem' }}>{grade.student?.firstName} {grade.student?.lastName}</td>
                    <td style={{ padding: '1rem' }}>{grade.classSubject?.subject?.name || 'Unknown'}</td>
                    <td style={{ padding: '1rem' }}>{grade.teacher ? `${grade.teacher.firstName} ${grade.teacher.lastName}` : 'Unknown'}</td>
                    <td style={{ padding: '1rem' }}>{grade.term}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>
                      <span style={{ color: (grade.score / grade.maxScore) >= 0.5 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                        {grade.score}
                      </span> / {grade.maxScore}
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
