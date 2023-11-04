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
            <input
              {...field}
              className='input input-bordered'
              type='text'
              placeholder='statement'
            />
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
            <div className='inline-grid align-middle ml-2'>
              <label className='text-sm font-light'>
                true
                <input
                  {...field}
                  type='radio'
                  className='radio radio-xs radio-success ml-2'
                  value='true'
                  checked={field.value === 'true'}
                  onChange={() => field.onChange('true')}
                />
              </label>
              <label className='text-sm font-light mb-2'>
                false
                <input
                  {...field}
                  type='radio'
                  className='radio radio-xs radio-error ml-1'
                  value='false'
                  checked={field.value === 'false'}
                  onChange={() => field.onChange('false')}
                />
              </label>
            </div>
          </>
        )}
      />
    </div>
  );
}
