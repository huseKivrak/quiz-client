'use client';
import { Quiz } from '@/types/api/quiz';
import { useEffect, useState } from 'react';
import { getQuizDetailURL } from '@/lib/apiConstants';
import { authFetch } from '@/utils/authUtils';
import QuizCard from '@/components/QuizCard';
import { DataObject, deepTransformKeys } from '@/utils/variableMappers';

export default function QuizPage({ params }: { params: { slug: string } }) {
  const [quiz, setQuiz] = useState<Quiz>();

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizURL = getQuizDetailURL(params.slug);
      try {
        const fetchedQuiz: DataObject = await authFetch(quizURL);
        const convertedQuiz = deepTransformKeys(
          fetchedQuiz,
          'camel'
        ) as unknown as Quiz;
        setQuiz(convertedQuiz);
      } catch (error) {
        console.error('error fetching quiz', error);
      }
    };
    fetchQuiz();
  }, []);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <QuizCard quiz={quiz} />
    </div>
  );
}
