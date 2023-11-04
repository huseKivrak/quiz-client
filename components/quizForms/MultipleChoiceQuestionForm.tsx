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
            <input {...field} type='text' placeholder='Question Text' />
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
              <input {...field} type='text' placeholder='Answer Text' />
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
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                checked={field.value}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
          <button type='button' onClick={() => remove(answerIndex)}>
            Remove Answer
          </button>
        </div>
      ))}
      <button
        type='button'
        onClick={() => append({ answerText: '', isCorrect: false })}
      >
        Add Answer
      </button>
    </div>
  );
}
