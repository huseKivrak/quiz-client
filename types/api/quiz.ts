export interface Quiz {
  author: number;
  description: string;
  isPublished: boolean;
  questions: Question[];
  slug: string;
  title: string;
  uuid: string;
  created: string;
  modified: string;
}

export interface Question {
  answers: Answer[];
  author: number;
  order: number;
  questionType: string;
  quiz: number;
  slug: string;
  text: string;
  uuid: string;
  created: string;
  modified: string;
}

export interface Answer {
  isCorrect: boolean;
  order: number;
  question: number;
  text: string;
  uuid: string;
  created: string;
  modified: string;
}
