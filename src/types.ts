export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  dailyGoal: number; // minutes
  streakDays: number;
  xp: number;
  joinedDate: string;
  wordsMastered: number;
  completedLessons: string[];
  bookmarkedCards: string[];
}

export interface Lesson {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  title: string;
  subTitle: string;
  description: string;
  category: 'Từ vựng' | 'Ngữ pháp' | 'Giao tiếp' | 'Văn hóa' | 'Ẩm thực' | 'Du lịch';
  icon: string;
  duration: string;
  xpReward: number;
  progress: number;
  topics: string[];
}

export interface Flashcard {
  id: string;
  french: string;
  phonetic: string;
  gender?: 'm' | 'f' | 'pl';
  vietnamese: string;
  exampleFrench: string;
  exampleVietnamese: string;
  category: string;
  level: 'A1' | 'A2' | 'B1';
}

export interface QuizQuestion {
  id: string;
  question: string;
  frenchPrompt?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  xp: number;
}

export interface DialogueLine {
  speaker: string;
  avatar: string;
  french: string;
  vietnamese: string;
  isUser?: boolean;
}

export interface DialogueScenario {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  level: 'A1' | 'A2' | 'B1';
  lines: DialogueLine[];
}
