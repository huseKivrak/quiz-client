import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doLogin } from '@/utils/authUtils';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authContext = useAuth();

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
      await doLogin(authContext, username, password);
      console.log('successful login, redirecting to dashboard...');
    } catch (error) {
      console.log('failed login', error);
    }
  };

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
            />
          </div>
          <button type='submit' className='btn btn-sm btn-secondary mt-4'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
