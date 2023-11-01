import { Question } from '@/types/api/quiz';

export default function QuestionCard({ question }: { question: Question }) {
  return (
    <div>
      <h3 className='text-slate-600'>{question.text}</h3>
      <ul>
        {question.answers.map((answer) => (
          <li key={answer.uuid}>
            <p className='text-green-900'>{answer.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
