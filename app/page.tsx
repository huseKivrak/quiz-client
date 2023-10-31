'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  return (
    <div>
      <h1>welcome to quiz</h1>
      <h2>Sint ullamco in cillum labore.</h2>
      <p>
        Esse cillum pariatur ex labore do qui lorem. Pariatur ex labore, do qui
        lorem. Do qui lorem, proident amet officia. Proident amet officia
        incididunt elit. Officia incididunt elit, irure. Irure qui ipsum eiusmod
        ipsum laboris. Ipsum eiusmod ipsum laboris. Ipsum, laboris incididunt
        velit ullamco do quis.
      </p>
    </div>
  );
}
