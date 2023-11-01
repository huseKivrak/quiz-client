'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { doLogin } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const schema = z.object({
  username: z
    .string({
      required_error: 'username is required',
    })
    .min(3, 'username must be at least 3 characters'),
  password: z.string({
    required_error: 'password is required',
  }),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [alert, setAlert] = useState<string | null>(null);
  const authContext = useAuth();
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setAlert(null);
    try {
      await doLogin(authContext, data.username, data.password);
      console.log('successful login, redirecting to dashboard...');
    } catch (error: unknown) {
      console.log('failed login', error);
      if (error instanceof Error) {
        setAlert(error.message);
      }
    }
  }

  useEffect(() => {
    if (authContext.user) {
      router.push('/dashboard');
    }
  }, [authContext.user]);

  return (
    <div className='card bordered w-1/4 mx-auto mt-10 bg-primary'>
      <div className='card-body'>
        <h2 className='card-title font-light'>login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>username</span>
            </label>
            <input
              type='text'
              {...register('username')}
              className='input input-bordered'
              placeholder='artemis123'
            />
            {errors.username && <div>{errors.username.message}</div>}
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>password</span>
            </label>
            <input
              type='password'
              {...register('password')}
              className='input input-bordered'
              placeholder='********'
            />
            {errors.password && <div>{errors.password.message}</div>}
          </div>
          {alert && <div>{alert}</div>}
          <button type='submit' className='btn btn-sm btn-secondary mt-4'>
            Login
          </button>
        </form>
      </div>
      <div className='card-footer bg-secondary text-center'>
        <span className='text-white'>Don't have an account? </span>
        <Link href='/signup' className='text-blue-400 hover:underline'>
          Sign up
        </Link>
      </div>
    </div>
  );
}
