'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authFetch } from '@/utils/authUtils';
import { API_QUIZZES_URL } from '@/lib/apiConstants';
import { Quiz } from '@/types/api/quiz';
import Link from 'next/link';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data: Quiz[] = await authFetch(API_QUIZZES_URL);
        setQuizzes(data);
      } catch (error) {
        console.error('error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, [user, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    router.push('/');
    return <div>Redirecting...</div>;
  }
  return (
    <div className='bg-primary p-8 mt-4 rounded-2xl'>
      <h1 className='text-4xl mb-4 tracking-widest'>quiz dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md h-min tracking-widest'>
          <h2 className='text-2xl mb-4'>{`${user.firstName} ${user.lastName}`}</h2>
          <p className='italic'>({user.username})</p>
          <p className='italic tracking-widest text-sm mt-2'>{user.email}</p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl mb-4'>quizzes</h2>
          {quizzes ? (
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz.slug} className='pb-2'>
                  <Link href={`/quizzes/${quiz.slug}`}>
                    {quiz.title}
                    <p className='text-xs'>{quiz.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            'Loading quizzes..'
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
