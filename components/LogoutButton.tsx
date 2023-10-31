'use client';

import { AuthContextProps } from '@/contexts/AuthContext';
import { doLogout } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';


export default function LogoutButton({ authContext }: { authContext: AuthContextProps }) {
  const router = useRouter();

  async function logoutUser() {
    await doLogout(authContext);
    router.push('/');
  }
  return <button onClick={logoutUser} className='btn btn-ghost'>logout</button>;
}
