'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { doSignup } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const schema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    firstName: z.string().min(1, 'First name is required.'),
    lastName: z.string().optional(),
    email: z.string().email('Invalid email address'),
    password1: z
      .string()
      .min(6, 'Password must be at least 6 characters long.')
      .refine(
        (pw) => /\W|_/.test(pw),
        'Password must contain at least one special character'
      ),
    password2: z
      .string()
      .min(6, 'Password must be at least 6 characters long.')
      .refine(
        (pw) => /\W|_/.test(pw),
        'Password must contain at least one special character'
      ),
  })
  .refine((data) => data.password1 === data.password2, {
    message: 'Passwords must match',
    path: ['password2'],
  });

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
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
      await doSignup(
        authContext,
        data.username,
        data.password1,
        data.password2,
        data.firstName,
        data.email,
        data.lastName || ''
      );
      console.log('successful signup, redirecting to dashboard...');
      router.push('/dashboard');
    } catch (error: unknown) {
      console.log('failed signup', error);
      if (error instanceof Error) {
        setAlert(error.message);
      }
    }
  }

  return (
    <div className='card bordered w-1/4 mx-auto mt-10 bg-primary'>
      <div className='card-body'>
        <h2 className='card-title font-light tracking-widest'>signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Username</span>
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
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              {...register('password1')}
              className='input input-bordered'
              placeholder='********'
            />
            {errors.password1 && <div>{errors.password1.message}</div>}
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              {...register('password2')}
              className='input input-bordered'
              placeholder='********'
            />
            {errors.password2 && <div>{errors.password2.message}</div>}
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>First Name</span>
            </label>
            <input
              type='text'
              {...register('firstName')}
              className='input input-bordered'
              placeholder='John'
            />
            {errors.firstName && <div>{errors.firstName.message}</div>}
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Last Name</span>
            </label>
            <input
              type='text'
              {...register('lastName')}
              className='input input-bordered'
              placeholder='Doe'
            />
            {errors.lastName && <div>{errors.lastName.message}</div>}
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              {...register('email')}
              className='input input-bordered'
              placeholder='john.doe@example.com'
            />
            {errors.email && <div>{errors.email.message}</div>}
          </div>
          {alert && <div>{alert}</div>}
          <button type='submit' className='btn btn-sm btn-secondary text-sm lowercase  tracking-widest mt-4'>
            submit
          </button>
        </form>
        <Link href='/login' className='btn btn-xs lowercase'>
          have an account? login
        </Link>
      </div>
    </div>
  );
}
