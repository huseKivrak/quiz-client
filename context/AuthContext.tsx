import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '@/types/user';

export type AuthContextProps = {
  user?: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  // isLoading: boolean;
  // setIsLoading: Dispatch<SetStateAction<boolean>>;
  // error?: Error | null;
  // setError: Dispatch<SetStateAction<Error | null>>;
};

export const AuthContext = createContext<AuthContextProps>({
  setUser: () => {},
  // setIsLoading: () => {},
  // setError: () => {},
  // isLoading: false,
  // error: null,
});
