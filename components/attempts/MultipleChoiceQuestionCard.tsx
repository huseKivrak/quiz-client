import { Question } from '@/types/api/quiz';

export default function MultipleChoiceQuestionCard({
  question,
}: {
  question: Question;
}) {
  console.log('question', question);

  return (
    <div className='card w-96 bg-primary text-primary-content'>
      <div className='card-body'>
        <h2 className='card-title font-light'>{`#${question.order}!`}</h2>
        <p className='font-light text-xl tracking-widest'>{question.text}</p>

        <div className='card-actions justify-center'>
          {question.answers.map((answer) => (
            <button className='btn'>{answer.text}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
