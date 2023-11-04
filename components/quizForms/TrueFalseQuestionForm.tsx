import { QuizSchemaType, TrueFalseQuestionType } from '@/schemas/quizSchemas';
import { Controller, Control } from 'react-hook-form';

interface TrueFalseQuestionFormProps {
  control: Control<QuizSchemaType>;
  index: number;
}

export default function TrueFalseQuestionForm({
  control,
  index,
}: TrueFalseQuestionFormProps) {

  return (
    <div>
      <Controller
        control={control}
        name={`quizQuestions.${index}.questionText`}
        render={({ field, fieldState: { error } }) => (
          <>
            <input {...field} className='input input-bordered input-info' type='text' placeholder='Question Text' />
            {error && <p>{error.message}</p>}
          </>
        )}
      />
      <Controller
        control={control}
        name={`quizQuestions.${index}.correctAnswer`}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <label>
              True
              <input
                {...field}
                type='radio'
                value='true'
                checked={field.value === 'true'}
                onChange={() => field.onChange('true')}
              />
            </label>
            <label>
              False
              <input
                {...field}
                type='radio'
                value='false'
                checked={field.value === 'false'}
                onChange={() => field.onChange('false')}
              />
            </label>
          </>
        )}
      />
    </div>
  );
}
