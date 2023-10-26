'use client';

import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user){
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user.firstName}</p>
    </div>
  );
};

export default DashboardPage;
