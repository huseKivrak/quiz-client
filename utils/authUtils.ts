import {
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_TOKEN_REFRESH_URL,
  AUTH_USER_URL,
} from '@/lib/apiConstants';
import { AuthContextProps } from '@/context/AuthContext';
import { User } from '@/types/user';

/**
 * Refreshes the access token and updates the user context
 * @param authContext - User's current authentication context
 * @returns A promise that resolves with the new access token
 */
export async function refreshToken(
  authContext: AuthContextProps
): Promise<string> {
  const response = await fetch(AUTH_TOKEN_REFRESH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    setUserFromData(data, authContext.setUser);
    return data.access;
  } else {
    console.error('Failed to refresh token');
    authContext.setUser(null);
    throw new Error('Failed to refresh token');
  }
}

/**
 * Utility function to make authenticated API calls
 * If the token is expired, this function will attempt to refresh it.
 *
 * @param url - API endpoint
 * @param options - Fetch options
 * @param authContext - User's current authentication context
 * @returns A promise that resolves with the fetch Response
 */
export async function authFetch(
  url: string,
  options: RequestInit,
  authContext: AuthContextProps
): Promise<Response> {
  const { user } = authContext;
  const token = user?.token;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  } as Record<string, string>;

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    const newToken = await refreshToken(authContext);
    headers.Authorization = `Bearer ${newToken}`;
    response = await fetch(url, { ...options, headers });
  }

  return response;
}

/**
 * Helper function to update the user object from API response data
 *
 * @param data - The data from the API response
 * @param setUser - The function to update the user in context
 */
const setUserFromData = (data: any, setUser: (user: User | null) => void) => {
  const { pk, first_name, last_name, email, access } = data;
  setUser({
    id: pk,
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
  const response = await authFetch(
    AUTH_USER_URL,
    { method: 'GET' },
    authContext
  );

  if (response.ok) {
    const data = await response.json();
    setUserFromData(data, authContext.setUser);
    return data;
  } else {
    authContext.setUser(null);
    return null;
  }
}

/**
 * Performs login and sets the user in context
 *
 * @param authContext - User's current authentication context
 * @param username - Username for login
 * @param password - Password for login
 */
export async function doLogin(
  authContext: AuthContextProps,
  username: string,
  password: string
) {
  const response = await authFetch(
    AUTH_LOGIN_URL,
    {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
    authContext
  );

  const data = await response.json();
  if (response.ok) {
    console.log('Login successful, Setting User:', data.user);
    setUserFromData(data.user, authContext.setUser);
  } else {
    console.error('Login failed:', data.detail);
    throw new Error(data.detail);
  }
}

/**
 * Logs the user out and clears the context
 *
 * @param authContext - User's current authentication context
 */
export async function doLogout(authContext: AuthContextProps) {
  const response = await fetch(AUTH_LOGOUT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    authContext.setUser(null);
  } else {
    const data = await response.json();
    throw new Error(data.detail);
  }
}
