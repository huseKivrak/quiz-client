'use client';
import {  Quiz } from '@/types/api/quiz';
import { useEffect, useState } from 'react';
import { getQuizDetailURL } from '@/lib/apiConstants';
import { authFetch } from '@/utils/authUtils';
import QuizCard from '@/components/QuizCard';
export default function QuizPage({ params }: { params: { slug: string } }) {
  const [quiz, setQuiz] = useState<Quiz>();

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizURL = getQuizDetailURL(params.slug);
      try {
        const fetchedQuiz: Quiz = await authFetch(quizURL);
        setQuiz(fetchedQuiz);
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
