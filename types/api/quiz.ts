export interface Quiz {
  id: number;
  author: number;
  description?: string;
  isPublished: boolean;
  questions: Question[];
  slug: string;
  title: string;
  uuid: string;
  created: string;
  modified: string;
}

export interface Question {
  id: number;
  answers: Answer[];
  order: number;
  questionType: 'multipleChoice' | 'trueFalse';
  quiz: number;
  author: number;
  slug: string;
  text: string;
  uuid: string;
  created: string;
  modified: string;
}

export interface Answer {
  id: number;
  isCorrect: boolean;
  order: number;
  question: number;
  text: string;
  uuid: string;
  created: string;
  modified: string;
}

export interface SnakeCaseAnswer {
  id: number;
  is_correct: boolean;
  order: number;
  question: number;
  text: string;
  uuid: string;
  created: string;
  modified: string;
}

export interface SnakeCaseQuestion {
  id: number;
  answers: SnakeCaseAnswer[];
  order: number;
  question_type: 'true_false' | 'multiple_choice';
  quiz: number;
  author: number;
  slug: string;
  text: string;
  uuid: string;
  created: string;
  modified: string;
}

export interface SnakeCaseQuiz {
  id: number;
  author: number;
  description?: string;
  is_published: boolean;
  questions: SnakeCaseQuestion[];
  slug: string;
  title: string;
  uuid: string;
  created: string;
  modified: string;
}
