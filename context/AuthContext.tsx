'use client';

import { createContext, useState, useContext, Dispatch } from 'react';
import { User } from '@/types/user';

export type AuthContextProps = {
  user?: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
  // isLoading: boolean;
  // setIsLoading: Dispatch<SetStateAction<boolean>>;
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
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<Error | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
