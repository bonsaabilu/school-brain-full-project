"use client";

import { ChangePasswordForm } from '../../components/auth/ChangePasswordForm';

export default function ChangePasswordPage() {
  return (
    <div className="page-container" style={{ 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'radial-gradient(circle at 50% -20%, #e0e7ff 0%, var(--color-bg-main) 100%)'
    }}>
      <div style={{ width: '100%', padding: '2rem' }}>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
