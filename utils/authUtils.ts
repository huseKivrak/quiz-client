import {
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_TOKEN_REFRESH_URL,
  AUTH_USER_URL,
} from '@/lib/apiConstants';
import { AuthContextProps } from '@/context/AuthContext';
import { User } from '@/types/user';

/**
 * Utility function to make authenticated API calls
 * If the token is expired, this function will attempt to refresh it.
 *
 * @param url - API endpoint
 * @param options - Fetch options
 * @param authContext - User's current authentication context
 * @returns A promise that resolves with the fetch Response
 */
export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  let res = await fetch(url, {
    ...options,
    credentials: 'include',
  });
  if (res.status === 401) {
    const refreshResponse = await fetch(AUTH_TOKEN_REFRESH_URL, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      res = await fetch(url, {
        ...options,
        credentials: 'include',
      });
    } else {
      console.error('refresh failed');
      throw new Error('Unauthorized');
    }
  }

  if (res.ok) {
    return res.json();
  } else {
    const data = await res.json();
    console.error(data);
    throw new Error(data);
  }
};

/**
 * Helper function to update the user object from API response data
 *
 * @param data - The data from the API response
 * @param setUser - The function to update the user in context
 */
const setUserFromData = (data: any, setUser: (user: User | null) => void) => {
  const { pk, username, first_name, last_name, email, access } = data.user;
  setUser({
    id: pk,
    username,
    firstName: first_name,
    lastName: last_name,
    email,
    token: access,
  });
};

/**
 * Fetches the currently authenticated user and sets it in the context
 *
 * @param authContext - User's current authentication context
 */
export async function getAndSetUser(authContext: AuthContextProps) {
  try {
    const data = await authFetch(AUTH_USER_URL, { method: 'GET' });
    setUserFromData(data, authContext.setUser);
  } catch (error) {
    authContext.setUser(null);
    return null;
  }
}

export async function doLogin(
  authContext: AuthContextProps,
  username: string,
  password: string
) {
  try {
    const data = await authFetch(AUTH_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    console.log('Login successful, Setting User:', data);
    setUserFromData(data, authContext.setUser);
  } catch (error: any) {
    console.error('Login failed:', error);
    throw new Error(error);
  }
}

/**
 * Logs the user out and clears the context
 *
 * @param authContext - User's current authentication context
 */
export async function doLogout(authContext: AuthContextProps) {
  try {
    await authFetch(AUTH_LOGOUT_URL, { method: 'POST' });
    authContext.setUser(null);
  } catch (error: any) {
    throw new Error(error);
  }
}
