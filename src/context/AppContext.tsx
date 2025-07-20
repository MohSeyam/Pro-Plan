import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Language, Theme, Plan, UserProgress, ToastMessage, Week, Day, Task, Note, JournalEntry, Skill } from '../types';

interface AppState {
  language: Language;
  theme: Theme;
  plan: Plan | null;
  userProgress: UserProgress;
  toasts: ToastMessage[];
  loading: boolean;
  currentWeek: number;
  currentDay: string;
}

type AppAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_PLAN'; payload: Plan }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'COMPLETE_TASK'; payload: { taskId: string; timeSpent: number } }
  | { type: 'UNCOMPLETE_TASK'; payload: string }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'ADD_JOURNAL_ENTRY'; payload: JournalEntry }
  | { type: 'UPDATE_SKILL'; payload: Skill }
  | { type: 'SET_CURRENT_WEEK'; payload: number }
  | { type: 'SET_CURRENT_DAY'; payload: string }
  | { type: 'ADD_TOAST'; payload: ToastMessage }
  | { type: 'REMOVE_TOAST'; payload: string };

const initialState: AppState = {
  language: 'en',
  theme: 'light',
  plan: null,
  userProgress: {
    completedTasks: [],
    timeSpent: {},
    notes: [],
    journalEntries: [],
    skills: [],
    currentWeek: 1,
    currentDay: 'sat'
  },
  toasts: [],
  loading: true,
  currentWeek: 1,
  currentDay: 'sat'
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_PLAN':
      return { ...state, plan: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'COMPLETE_TASK':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          completedTasks: [...state.userProgress.completedTasks, action.payload.taskId],
          timeSpent: {
            ...state.userProgress.timeSpent,
            [action.payload.taskId]: action.payload.timeSpent
          }
        }
      };
    case 'UNCOMPLETE_TASK':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          completedTasks: state.userProgress.completedTasks.filter(id => id !== action.payload),
          timeSpent: {
            ...state.userProgress.timeSpent,
            [action.payload]: 0
          }
        }
      };
    case 'ADD_NOTE':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          notes: [...state.userProgress.notes, action.payload]
        }
      };
    case 'UPDATE_NOTE':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          notes: state.userProgress.notes.map(note => 
            note.id === action.payload.id ? action.payload : note
          )
        }
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          notes: state.userProgress.notes.filter(note => note.id !== action.payload)
        }
      };
    case 'ADD_JOURNAL_ENTRY':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          journalEntries: [...state.userProgress.journalEntries, action.payload]
        }
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          skills: state.userProgress.skills.map(skill => 
            skill.id === action.payload.id ? action.payload : skill
          )
        }
      };
    case 'SET_CURRENT_WEEK':
      return { ...state, currentWeek: action.payload };
    case 'SET_CURRENT_DAY':
      return { ...state, currentDay: action.payload };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(toast => toast.id !== action.payload) };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  getText: (text: { en: string; ar: string }) => string;
  addToast: (message: string, type: ToastMessage['type'], duration?: number) => void;
  getCurrentWeek: () => Week | undefined;
  getCurrentDay: () => Day | undefined;
  isTaskCompleted: (taskId: string) => boolean;
  getTaskTimeSpent: (taskId: string) => number;
  getWeekProgress: (week: Week) => number;
  getDayProgress: (day: Day) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load plan data
  useEffect(() => {
    const loadPlan = async () => {
      try {
        const response = await fetch('/plan.json');
        const planData = await response.json();
        dispatch({ type: 'SET_PLAN', payload: { weeks: planData } });
      } catch (error) {
        console.error('Failed to load plan data:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadPlan();
  }, []);

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        // Update state with saved progress
        Object.keys(progress).forEach(key => {
          if (key === 'completedTasks') {
            progress.completedTasks.forEach((taskId: string) => {
              dispatch({ type: 'COMPLETE_TASK', payload: { taskId, timeSpent: 0 } });
            });
          }
        });
      } catch (error) {
        console.error('Failed to load user progress:', error);
      }
    }
  }, []);

  // Save user progress to localStorage
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(state.userProgress));
  }, [state.userProgress]);

  const getText = (text: { en: string; ar: string }) => {
    return state.language === 'ar' ? text.ar : text.en;
  };

  const addToast = (message: string, type: ToastMessage['type'], duration = 3000) => {
    const id = Date.now().toString();
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type, duration } });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, duration);
  };

  const getCurrentWeek = () => {
    return state.plan?.weeks.find(week => week.week === state.currentWeek);
  };

  const getCurrentDay = () => {
    const currentWeek = getCurrentWeek();
    return currentWeek?.days.find(day => day.key === state.currentDay);
  };

  const isTaskCompleted = (taskId: string) => {
    return state.userProgress.completedTasks.includes(taskId);
  };

  const getTaskTimeSpent = (taskId: string) => {
    return state.userProgress.timeSpent[taskId] || 0;
  };

  const getWeekProgress = (week: Week) => {
    const totalTasks = week.days.reduce((sum, day) => sum + day.tasks.length, 0);
    const completedTasks = week.days.reduce((sum, day) => 
      sum + day.tasks.filter(task => isTaskCompleted(task.id)).length, 0
    );
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  const getDayProgress = (day: Day) => {
    const totalTasks = day.tasks.length;
    const completedTasks = day.tasks.filter(task => isTaskCompleted(task.id)).length;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  const value: AppContextType = {
    state,
    dispatch,
    getText,
    addToast,
    getCurrentWeek,
    getCurrentDay,
    isTaskCompleted,
    getTaskTimeSpent,
    getWeekProgress,
    getDayProgress
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}