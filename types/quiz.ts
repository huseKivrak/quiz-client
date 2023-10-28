export interface Quiz {
  author: number;
  description: string;
  is_published: boolean;
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
  question_type: string;
  quiz: number;
  slug: string;
  text: string;
  uuid: string;
  created: string;
  modified: string;
}

export interface Answer {
  is_correct: boolean;
  order: number;
  question: number;
  text: string;
  uuid: string;
  created: string;
  modified: string;
}
