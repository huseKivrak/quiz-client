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
  questionType: string;
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
