import { AuthContextProps } from '@/context/AuthContext';
import { refreshToken } from '@/utils/authUtils';
import jwtDecode from 'jwt-decode';

/**
 * Middleware function for authenticated API calls
 * @param authContext - user's current auth context
 */
export default function authMiddleware(authContext: AuthContextProps) {
  return (next: (options: RequestInit) => Promise<Response>) => {
    return async (options: RequestInit) => {
      const { user, setUser } = authContext;
      const token = user?.token;

      if (token) {
        const tokenData: any = jwtDecode(token);

        const tokenExpiration = new Date(tokenData.exp * 1000);
        const now = new Date();

        //Check if token will expire in less than 1 minute
        if (tokenExpiration.getTime() - now.getTime() < 60000) {
          try {
            //Refresh token
            const newToken = await refreshToken();
            setUser({ ...user, token: newToken });
          } catch (error) {
            console.log(error);
            //TODO: logout user, redirect to login
          }
        }
      }

      //Add authorization header and call next middleware
      return next({
        ...options,
        headers: {
          ...options.headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
    };
  };
}
