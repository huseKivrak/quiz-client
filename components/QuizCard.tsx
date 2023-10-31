import { Quiz } from '@/types/api/quiz';
import QuestionCard from './QuestionCard';
export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      <h2>Questions</h2>
      <ul>
        {quiz.questions.map((question) => (
            <ul>
                <QuestionCard question={question} />
            </ul>
        ))}
      </ul>
    </div>
  );
}
