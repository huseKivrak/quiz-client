'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAndSetUser } from '@/utils/authUtils';
import { useAuth } from '@/context/AuthContext';

export default function LandingPage() {
  const router = useRouter();
  const authContext = useAuth();

  useEffect(() => {
    getAndSetUser(authContext).then((user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
  }, []);

  return (
    <div>
      <h1>Welcome to My App</h1>
      {!authContext.user && (
        <>
          <h2>Hello, Guest!</h2>
          <p>You are not logged in.</p>
        </>
      )}
    </div>
  );
}
