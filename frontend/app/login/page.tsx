import { LoginForm } from '../../components/auth/LoginForm';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT SIDE - Dark Blue Branding */}
      <div style={{ 
        flex: 1, 
        backgroundColor: '#0b345b', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '3rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background decoration */}
        <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(47,163,209,0.15) 0%, rgba(11,52,91,0) 70%)', top: '-100px', left: '-100px', borderRadius: '50%' }}></div>
        
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', zIndex: 2 }}>
          <Image src="/assets/logo.png" alt="SchoolBrain Logo" width={56} height={56} style={{ objectFit: 'contain' }} />
          <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
            <span style={{ color: '#ffffff' }}>School</span>
            <span style={{ color: '#60a5fa' }}>Brain</span>
          </span>
        </Link>
        <div style={{ zIndex: 2, textAlign: 'center', maxWidth: '420px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>Welcome Back</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Sign in to access your dashboard, manage classes, and track student progress seamlessly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Form Area */}
      <div style={{ 
        flex: '0 0 55%', 
        backgroundColor: '#f8fbff', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <LoginForm />
      </div>
      
    </div>
  );
}
