"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { isAuthenticated } from '../lib/auth';
import styles from './home.module.css';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      router.push(`/register?email=${encodeURIComponent(email)}`);
    } else {
      router.push('/register');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bgBlueLight}></div>
      <div className={styles.bgBlueDark}></div>

      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Image src="/assets/logo.png" alt="SchoolBrain Logo" width={86} height={86} className={styles.logoImage} />

        </div>
        <div className={styles.navLinks}>
          {/* <Link href="#features" className={styles.navLink}>Features</Link>
          <Link href="#pricing" className={styles.navLink}>Pricing</Link>
          <Link href="#faq" className={styles.navLink}>FAQ</Link> */}
          {isLoggedIn ? (
            <Link href="/dashboard" className={styles.loginBtn}>Go to Dashboard</Link>
          ) : (
            <Link href="/login" className={styles.loginBtn}>Get Started</Link>
          )}
        </div>
      </nav>

      <main className={styles.container}>
        <div className={styles.leftContent}>
          <h1 className={styles.title}>
            Intelligent Education.<br />
            Simplified for Everyone.
          </h1>
          <p className={styles.subtitle}>
            Manage schools, classes, grades, and communication<br />
            seamlessly. Secure and Role-Based.
          </p>

          <form onSubmit={handleCreateAccount} className={styles.ctaContainer}>
            <input
              type="email"
              placeholder="Your email address."
              className={styles.emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.createAccountBtn}>
              Create Your Account
            </button>
          </form>

          <div className={styles.rolesSection}>
            <div className={styles.rolesList}>
              <div className={styles.roleItem}>
                <div className={styles.roleAvatar} style={{ backgroundColor: '#cce2ff' }}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=cce2ff" alt="Admin" className={styles.roleImg} />
                </div>
                <span className={styles.roleName}>Admin</span>
              </div>
              <div className={styles.roleItem}>
                <div className={styles.roleAvatar} style={{ backgroundColor: '#d1fae5' }}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher&backgroundColor=d1fae5" alt="Teacher" className={styles.roleImg} />
                </div>
                <span className={styles.roleName}>Teacher</span>
              </div>
              <div className={styles.roleItem}>
                <div className={styles.roleAvatar} style={{ backgroundColor: '#fef3c7' }}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Student&backgroundColor=fef3c7" alt="Student" className={styles.roleImg} />
                </div>
                <span className={styles.roleName}>Student</span>
              </div>
              <div className={styles.roleItem}>
                <div className={styles.roleAvatar} style={{ backgroundColor: '#ffe4e6' }}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Parent&backgroundColor=ffe4e6" alt="Parent" className={styles.roleImg} />
                </div>
                <span className={styles.roleName}>Parent</span>
              </div>
            </div>

            <div className={styles.divider}></div>

            <button className={styles.takeTourBtn} type="button">
              Take a Tour
            </button>
          </div>
        </div>


      </main>

      {/* RIGHT SIDE IMAGE: Placed outside the max-width container so it aligns strictly to the right edge of the browser window */}
      <div className={styles.illustrationWrapper}>
        <Image
          src="/hero-illustration.png"
          alt="School Brain Dashboard and AI Illustration"
          fill
          className={styles.illustration}
          priority
        />
      </div>
    </div>
  );
}
