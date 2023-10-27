'use client';

import { useAuth } from '@/context/AuthContext';
import LoginCard from '@/components/LoginCard';
import Dashboard from '@/components/Dashboard';
import NavBar from '@/components/UI/NavBar';
import { NAV_LINKS } from '@/lib/constants';
export default function LandingPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <NavBar navLinks={NAV_LINKS} />
      {user ? <Dashboard /> : <LoginCard />}
    </div>
  );
}
