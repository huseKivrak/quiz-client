import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const AnswerSchema = z.object({
  isCorrect: z.boolean(),
  text: z.string(),
});

export const QuestionSchema = z.object({
  text: z.string(),
  questionType: z.union([
    z.literal('multiple_choice'),
    z.literal('true_false'),
  ]),
  answers: z.array(AnswerSchema),
});

export type QuestionFormData = z.infer<typeof QuestionSchema>;

export interface QuestionFormProps{
    value?: QuestionFormData;
    onChange?: (value: QuestionFormData) => void;
}


export default function QuestionForm({value, onChange}: QuestionFormProps = {}) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<QuestionFormData>({
      resolver: zodResolver(QuestionSchema),
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'answers',
    });

    const onSubmit = (data: QuestionFormData) => {
      console.log(data);
        if (onChange) {
            onChange(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Question Text */}
          <label>
            Question:
            <input {...register('text')} />
          </label>
          {errors.text && <span>{errors.text.message}</span>}

          {/* Question Type */}
          <label>
            Type:
            <select {...register('questionType')}>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True/False</option>
            </select>
          </label>
          {errors.questionType && <span>{errors.questionType.message}</span>}

          {/* Answers */}
          {fields.map((field, index) => (
            <div key={field.id}>
              <label>
                Answer:
                <input {...register(`answers.${index}.text` as const)} />
              </label>
              <label>
                Correct:
                <input type="checkbox" {...register(`answers.${index}.isCorrect` as const)} />
              </label>
              <button type="button" onClick={() => remove(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => append({ text: '', isCorrect: false })}>Add Answer</button>

          <button type="submit">Submit</button>
        </form>
      );
    }
