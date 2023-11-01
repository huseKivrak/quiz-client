'use client';

import { useEffect } from 'react';
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import QuestionForm, {
  QuestionSchema,
  QuestionFormData,
} from '@/components/QuestionForm';
import { authFetch } from '@/utils/authUtils';
import { API_QUIZZES_URL } from '@/lib/apiConstants';

const QuizSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  is_published: z.boolean().default(false),
  questions: z
    .array(QuestionSchema)
    .min(1, 'Quiz must have at least one question'),
});

type QuizFormData = z.infer<typeof QuizSchema>;

export default function CreateQuiz() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(QuizSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit: SubmitHandler<QuizFormData> = async (data) => {
    try {
      const response = await authFetch(API_QUIZZES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('Quiz created:', response);
    } catch (error) {
      console.error('Failed to create quiz:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Quiz Title */}
      <div>
        <label>Title</label>
        <input {...register('title')} />
        {errors.title && <div>{errors.title.message}</div>}
      </div>

      {/* Quiz Description */}
      <div>
        <label>Description</label>
        <textarea {...register('description')} />
      </div>

      {/* Quiz Published */}
      <div>
        <label>
          Published
          <input type='checkbox' {...register('is_published')} />
        </label>
      </div>

      {/* Questions */}
      {fields.map((field, index) => (
        <Controller
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <div>
              <QuestionForm
                onChange={(e) => {
                  const updatedQuestions = [...fields] as QuestionFormData[];
                  updatedQuestions[index] = e;
                  setValue('questions', updatedQuestions);
                }}
                value={value}
              />
              <button type='button' onClick={() => remove(index)}>
                Delete Question
              </button>
            </div>
          )}
          name={`questions.${index}`}
          control={control}
        />
      ))}
      <button
        type='button'
        onClick={() =>
          append({ text: '', questionType: 'multiple_choice', answers: [] })
        }
      >
        Add Question
      </button>

      <button type='submit'>Create Quiz</button>
    </form>
  );
}
