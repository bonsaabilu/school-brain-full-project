"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { fetchApi } from '../../lib/api';
import styles from './RegisterForm.module.css';
import toast from 'react-hot-toast';

export const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const emailParam = searchParams?.get('email');
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      toast.success('Registration successful! Please log in.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Fill in your details to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={styles.input}
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Jane"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={styles.input}
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@school.edu"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength={6}
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="role">Role</label>
            <select 
              id="role"
              name="role"
              className={styles.select}
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="PARENT">Parent</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div> */}

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className={styles.switchText}>
            Already have an account?
            <Link href="/login" className={styles.switchLink}>Sign in here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
