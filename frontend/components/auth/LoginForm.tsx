"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchApi } from '../../lib/api';
import styles from './LoginForm.module.css';
import toast from 'react-hot-toast';

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      if (response.user.mustChangePassword) {
        toast.success('Login successful! Please change your password.');
        router.push('/change-password');
      } else {
        toast.success(`Welcome back, ${response.user.firstName}!`);
        // Route based on role
        if (response.user.role === 'STUDENT') {
          router.push('/dashboard/student');
        } else if (response.user.role === 'TEACHER') {
          router.push('/dashboard/teacher');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your SchoolBrain account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              className={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="name@school.edu"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label className={styles.label} htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
              <a href="#" className={styles.forgotPassword}>Forgot password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <input 
                id="password"
                type={showPassword ? "text" : "password"} 
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="••••••••"
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          
          <div className={styles.switchText}>
            Don't have an account? 
            <Link href="/register" className={styles.switchLink}>Sign up here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
