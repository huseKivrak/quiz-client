'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import { getAndSetUser } from '@/utils/authUtils';
import { AuthContext } from '@/context/AuthContext';

export default function LandingPage() {
  const router = useRouter();

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await getAndSetUser({ setUser });
          if (fetchedUser !== null) {
            router.push('/dashboard');
          } else {
            router.push('/login');
          }
        } catch (error) {
          console.log(error);
          router.push('/login');
        }
      };
      fetchUser();
    }
  }, [setUser, router]);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
