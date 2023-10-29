'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doLogin } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alert, setAlert] = useState<string | null>(null);
  const authContext = useAuth();
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
    setAlert(null);

    try {
      await doLogin(authContext, username, password);
      console.log('successful login, redirecting to dashboard...');
    //   router.push('/dashboard');
    } catch (error: any) {
      console.log('failed login', error);
      setAlert(error.message);
    }
  };

  useEffect(() => {
    if (authContext.user) {
      router.push('/dashboard');
    }
  }, [authContext.user]);

  return (
    <div className='card bordered w-1/4 mx-auto mt-10 bg-primary'>
      <div className='card-body'>
        <h2 className='card-title font-light'>login</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>username</span>
            </label>
            <input
              type='text'
              name='username'
              className='input input-bordered'
              value={username}
              placeholder='artemis123'
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>password</span>
            </label>
            <input
              type='password'
              name='password'
              className='input input-bordered'
              value={password}
              onChange={handleChange}
              placeholder='********'
              required
            />
          </div>
          {alert && <div>{alert}</div>}
          <button type='submit' className='btn btn-sm btn-secondary mt-4'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
