'use client';

import {
  createContext,
  useState,
  useContext,
  Dispatch,
  useEffect,
} from 'react';
import { User } from '@/types/user';
import { getAndSetUser } from '@/utils/authUtils';

export type AuthContextProps = {
  user?: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  // error?: Error | null;
  // setError: Dispatch<SetStateAction<Error | null>>;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<Error | null>(null);
  console.log('current user:', user);
  console.log('current loading state:', isLoading);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getAndSetUser({ user, setUser, isLoading, setIsLoading });
        console.log("After fetch, user is: ", user);
      } catch (error) {
        console.error('failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
