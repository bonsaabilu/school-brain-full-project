"use client";
import React from 'react';
import { CreateUserForm } from '../../../../components/forms/CreateUserForm';

export default function CreateAdminPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create Admin</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Create a new administrator for the School Brain system.</p>
      </div>
      <CreateUserForm role="ADMIN" />
    </div>
  );
}
