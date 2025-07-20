export interface BilingualText {
  en: string;
  ar: string;
}

export interface Task {
  id: string;
  type: 'Blue Team' | 'Red Team' | 'Purple Team' | 'Soft Skills' | 'Practical' | 'Career';
  duration: number;
  description: BilingualText;
  completed?: boolean;
  timeSpent?: number;
  notes?: string;
}

export interface Resource {
  type: 'video' | 'article' | 'guide' | 'news';
  title: string;
  url: string;
}

export interface NotesPrompt {
  title: BilingualText;
  points: BilingualText[];
}

export interface Day {
  key: string;
  day: BilingualText;
  topic: BilingualText;
  tasks: Task[];
  resources: Resource[];
  notes_prompt: NotesPrompt;
  journalEntry?: string;
  completed?: boolean;
}

export interface Week {
  week: number;
  phase: number;
  title: BilingualText;
  objective: BilingualText;
  days: Day[];
  completed?: boolean;
}

export interface Plan {
  weeks: Week[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  taskId?: string;
  template?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  week: number;
  day: string;
  createdAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  notes?: string;
}

export interface UserProgress {
  completedTasks: string[];
  timeSpent: { [taskId: string]: number };
  notes: Note[];
  journalEntries: JournalEntry[];
  skills: Skill[];
  currentWeek: number;
  currentDay: string;
}

export interface StatsSummary {
  overallProgress: number;
  completedTasks: number;
  totalLearningHours: number;
  currentStreak: number;
  notesCount: number;
  journalEntriesCount: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';