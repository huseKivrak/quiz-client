'use client';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { getUser } from '@/utils/authUtils';
import { AuthContext } from '@/context/AuthContext';

export default function LandingPage() {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser({ setUser });
      if (fetchedUser !== null) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };
    fetchUser();
  }, [setUser, router]);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
