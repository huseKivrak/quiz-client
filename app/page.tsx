'use client';

import { useAuth } from '@/context/AuthContext';
import LoginCard from '@/components/LoginCard';
import Dashboard from '@/components/Dashboard';

export default function LandingPage() {
  const {user, isLoading} = useAuth();

  if (isLoading){
    return <div>Loading..</div>
  }

  return <div>{user ? <Dashboard /> : <LoginCard />}</div>;
}
