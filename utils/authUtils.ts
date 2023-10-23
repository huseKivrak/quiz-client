import {
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_TOKEN_REFRESH_URL,
  AUTH_USER_URL,
} from '@/lib/apiConstants';
import { AuthContextProps } from '@/context/AuthContext';
import { User } from '@/types/user';

/**
 * Refreshes the access token
 */
export async function refreshToken() {
  const response = await fetch(AUTH_TOKEN_REFRESH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    return data.access;
  } else {
    throw new Error('Refresh token failed');
  }
}

/**
 * Utility function to make authenticated API calls
 * @param url - API Endpoint
 * @param options - fetch options
 * @param authContext - user's current auth context
 */

export async function authFetch(
  url: string,
  options: RequestInit,
  authContext: AuthContextProps
): Promise<Response> {
  const { user } = authContext;
  const token = user?.token;

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };

  const response = await fetch(url, { ...options, headers });
  return response;
}


/**
 * Utility function to set user from API response data
 * @param data - API response data
 * @param setUser - setUser function from AuthContext
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
 * Fetch currently authenticated user and set in context
 * @param authContext - user's current auth context
 */
export async function getUser(authContext: AuthContextProps) {
  const { setUser } = authContext;
  const response = await authFetch(
    AUTH_USER_URL,
    {
      method: 'GET',
    },
    authContext
  );

  const data = await response.json();
  if (response.ok) {
    setUserFromData(data, setUser);
  } else {
    setUser(null);
    return null;
  }
}

/**
 * Perform login and set user in context
 * @param authContext - user's current auth context
 * @param username
 * @param password
 */
export async function doLogin(
  authContext: AuthContextProps,
  username: string,
  password: string
) {
  const { setUser } = authContext;
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
    setUserFromData(data.user, setUser);
  } else {
    throw new Error(data.detail);
  }
}

/**
 * Perform logout and clear user from context
 * @param authContext - user's current auth context
 */
export async function doLogout(authContext: AuthContextProps) {
  const { setUser } = authContext;

  const response = await fetch(AUTH_LOGOUT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (response.ok) {
    setUser(null);
  } else {
    throw new Error(data.detail);
  }
}


