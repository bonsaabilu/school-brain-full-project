"use client";
import React from 'react';
import { CreateUserForm } from '../../../../components/forms/CreateUserForm';

export default function CreateTeacherPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create Teacher</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Register a new teacher and add them to the system.</p>
      </div>
      <CreateUserForm role="TEACHER" />
    </div>
  );
}
