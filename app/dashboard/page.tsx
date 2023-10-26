'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getAndSetUser } from '@/utils/authUtils';

const DashboardPage = () => {
  const authContext = useAuth();

  useEffect(() => {
    if (!authContext.user) {
      getAndSetUser(authContext);
    }
  }, []);

  if (!authContext.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {authContext.user.username}</p>
    </div>
  );
};

export default DashboardPage;
