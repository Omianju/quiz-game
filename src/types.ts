export interface Option {
  id: number;
  description: string;
  is_correct: boolean;
  photo_url: string | null;
}

export interface Question {
  id: number;
  description: string;
  detailed_solution: string;
  options: Option[];
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  duration: number;
  negative_marks: string;
  correct_answer_marks: string;
  questions: Question[];
  questions_count: number;
  max_mistake_count: number;
}