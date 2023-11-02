import { z } from 'zod';

const MultipleChoiceAnswer = z.object({
  answerText: z.string(),
  isCorrect: z.boolean().default(false),
});

//Custom validator to ensure that only one correct answer
const onlyOneCorrectAnswer = (answers: any[]) => {
  const correctAnswers = answers.filter((answer) => answer.isCorrect);
  return correctAnswers.length === 1;
};

const TrueFalseQuestion = z.object({
  questionType: z.literal('trueFalse'),
  questionText: z.string(),
  correctAnswer: z.union([z.literal('true'), z.literal('false')]),
});

const MultipleChoiceQuestion = z.object({
  questionType: z.literal('multipleChoice'),
  questionText: z.string(),
  questionAnswers: z
    .array(MultipleChoiceAnswer)
    .min(2)
    .max(5)
    .refine(onlyOneCorrectAnswer, {
      message: '(only) one answer must be correct',
    }),
});

export const QuestionSchema = z.union([
  TrueFalseQuestion,
  MultipleChoiceQuestion,
]);

export const QuizSchema = z.object({
  title: z.string(),
  description: z.string(),
  isPublished: z.boolean(),
  quizQuestions: z.array(QuestionSchema),
});

export type TrueFalseQuestionType = z.infer<typeof TrueFalseQuestion>;
export type MultipleChoiceAnswerType = z.infer<typeof MultipleChoiceAnswer>;
export type MultipleChoiceQuestionType = z.infer<typeof MultipleChoiceQuestion>;
export type QuestionSchemaType = z.infer<typeof QuestionSchema>;
export type QuizSchemaType = z.infer<typeof QuizSchema>;
