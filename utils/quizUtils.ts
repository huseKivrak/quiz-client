
import { Question } from '@/types/api/quiz';
export interface MappedQuestion extends Omit<Question, 'questionType'> {
  questionType: 'true_false' | 'multiple_choice';
}


export function mapQuestionTypes(questions: Question[]): MappedQuestion[]{
  return questions.map((question) => {
    const questionType = question.questionType === 'trueFalse' ? 'true_false' :
      question.questionType === 'multipleChoice' ? 'multiple_choice' :
      question.questionType

      return {...question, questionType}
  })
}