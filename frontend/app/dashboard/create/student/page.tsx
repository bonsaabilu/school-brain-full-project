"use client";
import React from 'react';
import { CreateUserForm } from '../../../../components/forms/CreateUserForm';

export default function CreateStudentPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create Student</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Register a new student, their academic information, and optionally link a parent account.</p>
      </div>
      <CreateUserForm role="STUDENT" />
    </div>
  );
}
