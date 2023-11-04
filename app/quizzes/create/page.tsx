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
    <form onSubmit={handleSubmit(onSubmit)} className='form-control p-4'>
      <input
        {...register('title')}
        placeholder='quiz title'
        className='input input-bordered input-primary input-lg'
      />
      <textarea
        {...register('description')}
        placeholder='quiz description'
        className='textarea textarea-bordered textarea-secondary textarea-lg my-4'
      />

      {fields.map((field, index) => (
        <>
          {field.questionType === 'trueFalse' ? (
            <TrueFalseQuestionForm control={control} index={index} />
          ) : (
            <MultipleChoiceQuestionForm control={control} index={index} />
          )}
          <button
            type='button'
            className='btn btn-xs btn-error mt-2 mb-12 w-fit lowercase text-xs font-extralight'
            onClick={() => remove(index)}
          >
            remove question
          </button>
        </>
      ))}

      <button
        className='btn btn-primary btn-sm lowercase w-fit my-2 font-light'
        type='button'
        onClick={() =>
          append({
            questionType: 'trueFalse',
            questionText: '',
            correctAnswer: 'true',
          })
        }
      >
        + True/False question
      </button>

      <button
        className='btn btn-primary btn-sm w-fit lowercase my-2 font-light'
        type='button'
        onClick={() =>
          append({
            questionType: 'multipleChoice',
            questionText: '',
            questionAnswers: [{ answerText: '', isCorrect: false }],
          })
        }
      >
        + Multiple Choice question
      </button>
      <label className='label cursor-pointer justify-center font-light tracking-wide'>
        publish
        <input
          type='checkbox'
          className='toggle toggle-success toggle-sm ml-2'
          {...register('isPublished')}
        />
      </label>

      <input type='submit' className='btn btn-success lowercase btn-sm' />
      {errors && <p>{errors.title?.message || errors.description?.message}</p>}
    </form>
  );
}
