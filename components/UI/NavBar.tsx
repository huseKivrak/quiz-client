'use client';

import { NavLink } from '@/types/nav';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/LogoutButton';

export const AUTHENTICATED_LINKS: readonly NavLink[] = [
  {
    name: 'dashboard',
    href: '/dashboard',
  },
  {
    name: 'quizzes',
    href: '/quizzes',
  },
];

export const GUEST_LINKS: readonly NavLink[] = [
  {
    name: 'login',
    href: '/login',
  },
  {
    name: 'signup',
    href: '/signup',
  },
];

export default function NavBar() {
  const authContext = useAuth();

  const shownLinks = authContext.user ? AUTHENTICATED_LINKS : GUEST_LINKS;

  return (
    <div className='navbar bg-secondary'>
      <div className='navbar-start flex items-center'>
        <Link href='/' className='btn btn-ghost'>
          quiz
        </Link>
        <div className='divider divider-horizontal mx-2' />
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal'>
          {shownLinks.map((link) => (
            <li key={link.href} className='px-10'>
              <Link href={link.href}>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='navbar-end'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-md dropdown-content p-0 mt-3 z-[1] shadow bg-base-100 w-52 right-0'
          >
            {shownLinks.map((link) => (
              <li className='text-center' key={link.href}>
                <Link href={link.href}>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {authContext.user && (
        <>
          <div className='divider divider-horizontal mx-2' />
          <LogoutButton authContext={authContext} />
        </>
      )}
    </div>
  );
}
