import { Quiz } from '@/types/api/quiz';
import MultipleChoiceQuestionCard from './attempts/MultipleChoiceQuestionCard';
import TrueFalseQuestionCard from './attempts/TrueFalseQuestionCard';

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div>
      <h1 className='tracking-widest font-light text-3xl mt-12'>
        {quiz.title}
      </h1>
      <p>{quiz.description}</p>

      <ul className=''>
        {quiz.questions.map((question) => (
          <li key={question.id} className='my-2'>
            {question.questionType === 'true_false' ? (
              <TrueFalseQuestionCard question={question} />
            ) : (
              <MultipleChoiceQuestionCard question={question} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
