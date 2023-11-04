import {
  QuizSchemaType,
  MultipleChoiceQuestionType,
} from '@/schemas/quizSchemas';
import { Controller, Control, useFieldArray } from 'react-hook-form';

interface MultipleChoiceQuestionFormProps {
  control: Control<QuizSchemaType>;
  index: number;
}

export default function MultipleChoiceQuestionForm({
  control,
  index,
}: MultipleChoiceQuestionFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `quizQuestions.${index}.questionAnswers` as const,
  });

  return (
    <div>
      <Controller
        control={control}
        name={`quizQuestions.${index}.questionText` as const}
        render={({ field, fieldState: { error } }) => (
          <>
            <input {...field} type='text' className='input input-bordered mt-4' placeholder='question' />
            {error && <p>{error.message}</p>}
          </>
        )}
      />
      {fields.map((field, answerIndex) => (
        <div key={field.id}>
          <Controller
            control={control}
            name={
              `quizQuestions.${index}.questionAnswers.${answerIndex}.answerText` as const
            }
            render={({ field }) => (
              <input {...field} className='input input-bordered mt-4' type='text' placeholder='answer option' />
            )}
          />
          <Controller
            control={control}
            name={
              `quizQuestions.${index}.questionAnswers.${answerIndex}.isCorrect` as const
            }
            render={({ field }) => (
              <input
                type='checkbox'
                className='checkbox checkbox-success ml-4 align-middle'
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                checked={field.value}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
          <button className='btn btn-xs btn-error ml-4 mt-2 w-fit' type='button' onClick={() => remove(answerIndex)}>
            X
          </button>
        </div>
      ))}
      <button
      className='btn btn-success btn-sm lowercase w-fit my-2 font-light flex'
        type='button'
        onClick={() => append({ answerText: '', isCorrect: false })}
      >
        + option
      </button>
    </div>
  );
}
