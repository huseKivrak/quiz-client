import {
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_TOKEN_REFRESH_URL,
  AUTH_USER_URL,
} from '@/lib/apiConstants';
import { AuthContextProps } from '@/contexts/AuthContext';
import { User } from '@/types/api/user';
import camelCaseMapper, { DataType } from './variableMappers';

/**
 * Utility function to make authenticated API calls
 * If the token is expired, this function will attempt to refresh it.
 *
 * @param url - API endpoint
 * @param options - Fetch options
 * @param authContext - User's current authentication context
 */
export const authFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
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

//todo: update after translating mapper utility func
/**
 * Helper function to update the user object from API response data
 *
 * @param data - The data from the API response
 * @param setUser - The function to update the user in context
 */
const setUserFromData = (
  userData: DataType,
  setUser: (user: User | null) => void
) => {
  const transformedData = camelCaseMapper(userData) as DataType;
  const { id, username, firstName, lastName, email } =
    transformedData as unknown as User;
  setUser({
    id,
    username,
    firstName,
    lastName,
    email,
  });
};

/**
 * Fetches the currently authenticated user and sets it in the context
 *
 * @param authContext - User's current authentication context
 */
export async function getAndSetUser(authContext: AuthContextProps) {
  try {
    const authUser = await authFetch<DataType>(AUTH_USER_URL);
    console.log('Fetched data:', authUser);
    setUserFromData(authUser, authContext.setUser);
    authContext.setIsLoading(false);
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
  authContext.setIsLoading(true);
  try {
    const data = await authFetch<DataType>(AUTH_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const userData = data.user as unknown as DataType;
    console.log('Login successful, Setting User:', userData);

    setUserFromData(userData, authContext.setUser);
    authContext.setIsLoading(false);
  } catch (error: unknown) {
    console.error('Login failed:', error);
    throw new Error('Incorrect username/password');
  }
}

/**
 * Logs the user out and clears the context
 *
 * @param authContext - User's current authentication context
 */
export async function doLogout(authContext: AuthContextProps) {
  authContext.setIsLoading(true);
  try {
    await authFetch(AUTH_LOGOUT_URL, { method: 'POST' });
    authContext.setUser(null);
    authContext.setIsLoading(false);


  } catch (error: unknown) {
    if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw 'Something went wrong.';
    }
  }
}
