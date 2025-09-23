export interface QuizAnswer {
  id: string;
  text: string;
  weight: number; // Used for scoring different personality types
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
}

export interface PersonalityType {
  id: string;
  name: string;
  title: string;
  description: string;
  macroSplit: {
    protein: number;
    carbs: number;
    fat: number;
  };
  message: string;
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<string, string>;
  isComplete: boolean;
  result?: PersonalityType;
}

export type QuizStep = 'welcome' | 'quiz' | 'email' | 'result';