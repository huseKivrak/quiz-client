'use client';

import { useState, useContext } from 'react';
import { AuthContext, AuthContextProps } from '@/context/AuthContext';
import { doLogin } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useContext<AuthContextProps>(AuthContext);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await doLogin({ setUser }, username, password);
      console.log('successful login, redirecting to dashboard...');
      router.push('/dashboard');
    } catch (error) {
      console.log('failed login', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
