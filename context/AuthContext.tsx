import { createContext } from 'react';
import { User } from '@/types/user';

export type AuthContextProps = {
  user?: User;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  setUser: () => {},
});
