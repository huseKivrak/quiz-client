import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { authFetch } from '@/utils/authUtils';
import { API_QUIZZES_URL } from '@/lib/apiConstants';
import { Quiz } from '@/types/api/quiz';
import Link from 'next/link';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data: Quiz[] = await authFetch(API_QUIZZES_URL);
        setQuizzes(data);
      } catch (error) {
        console.error('error fetching quizzes:', error);
      }
    };
    if (user && !isLoading) {
      fetchQuizzes();
    }
  }, [user, isLoading]);

if (!user){
  return (
    <div>Loading..!</div>
  )
}

  return (
    <div className='bg-primary min-h-screen p-6'>
      <h1 className='text-4xl mb-4'>Quiz Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl mb-4'>{`${user.firstName} ${user.lastName}`}</h2>
          <p className='italic'>({user.username})</p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl mb-4'>My Quizzes</h2>
          {quizzes ? (
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz.slug}>
                  <Link href={`/quizzes/${quiz.slug}`}>{quiz.title}</Link>
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
