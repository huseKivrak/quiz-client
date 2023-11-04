'use client';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuizSchemaType, QuizSchema } from '@/schemas/quizSchemas';

import TrueFalseQuestionForm from '@/components/quizForms/TrueFalseQuestionForm';
import MultipleChoiceQuestionForm from '@/components/quizForms/MultipleChoiceQuestionForm';

export default function QuizForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizSchemaType>({
    resolver: zodResolver(QuizSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quizQuestions',
  });

  const onSubmit: SubmitHandler<QuizSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-control'>
      <input {...register('title')} placeholder='Quiz Title' className='input input-bordered input-primary max-w-xs'/>
      <textarea {...register('description')} placeholder='Quiz Description' className='mt-4 textarea textarea-bordered textarea-secondary'/>
      <label className='label'>
        publish:
        <input type='checkbox' {...register('isPublished')} />
      </label>

      {fields.map((field, index) => (
        <>
          {field.questionType === 'trueFalse' ? (
            <TrueFalseQuestionForm control={control} index={index} />
          ) : (
            <MultipleChoiceQuestionForm control={control} index={index} />
          )}
          <button type='button' className='btn btn-xs btn-error' onClick={() => remove(index)}>
            remove
          </button>
        </>
      ))}

      <button
        className='btn btn-primary btn-sm lowercase'
        type='button'
        onClick={() =>
          append({
            questionType: 'trueFalse',
            questionText: '',
            correctAnswer: 'true',
          })
        }
      >
        add True/False
      </button>

      <button
        className='btn btn-primary btn-sm lowercase'
        type='button'
        onClick={() =>
          append({
            questionType: 'multipleChoice',
            questionText: '',
            questionAnswers: [{ answerText: '', isCorrect: false }],
          })
        }
      >
        add Multiple Choice
      </button>

      <input type='submit' className='btn btn-success lowercase btn-sm'/>
      {errors && <p>{errors.title?.message || errors.description?.message}</p>}
    </form>
  );
}
