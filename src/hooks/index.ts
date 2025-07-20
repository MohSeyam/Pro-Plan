import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';

// Custom hook for local storage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

// Custom hook for debouncing
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for window size
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Custom hook for keyboard shortcuts
export const useKeyboardShortcut = (key: string, callback: () => void, deps: any[] = []) => {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        callbackRef.current();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [key, ...deps]);
};

// Custom hook for online/offline status
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Custom hook for theme
export const useTheme = () => {
  const { state, dispatch } = useApp();
  
  const toggleTheme = useCallback(() => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  }, [state.theme, dispatch]);

  return {
    theme: state.theme,
    toggleTheme,
    isDark: state.theme === 'dark',
  };
};

// Custom hook for language
export const useLanguage = () => {
  const { state, dispatch } = useApp();
  
  const setLanguage = useCallback((language: 'en' | 'ar') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  }, [dispatch]);

  return {
    language: state.language,
    setLanguage,
    isRTL: state.language === 'ar',
  };
};

// Custom hook for progress tracking
export const useProgress = () => {
  const { state, getWeekProgress, getDayProgress } = useApp();
  
  const overallProgress = useCallback(() => {
    if (!state.plan) return 0;
    
    const totalTasks = state.plan.weeks.reduce((sum, week) => 
      sum + week.days.reduce((daySum, day) => daySum + day.tasks.length, 0), 0
    );
    
    return totalTasks > 0 ? (state.userProgress.completedTasks.length / totalTasks) * 100 : 0;
  }, [state.plan, state.userProgress.completedTasks.length]);

  const currentWeekProgress = useCallback(() => {
    const currentWeek = state.plan?.weeks.find(week => week.week === state.currentWeek);
    return currentWeek ? getWeekProgress(currentWeek) : 0;
  }, [state.plan, state.currentWeek, getWeekProgress]);

  const currentDayProgress = useCallback(() => {
    const currentWeek = state.plan?.weeks.find(week => week.week === state.currentWeek);
    const currentDay = currentWeek?.days.find(day => day.key === state.currentDay);
    return currentDay ? getDayProgress(currentDay) : 0;
  }, [state.plan, state.currentWeek, state.currentDay, getDayProgress]);

  return {
    overallProgress: overallProgress(),
    currentWeekProgress: currentWeekProgress(),
    currentDayProgress: currentDayProgress(),
    completedTasks: state.userProgress.completedTasks.length,
    totalLearningHours: Object.values(state.userProgress.timeSpent).reduce((sum, time) => sum + time, 0) / 60,
  };
};

// Custom hook for search
export const useSearch = <T>(items: T[], searchFields: (keyof T)[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = items.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(term);
      })
    );
    setFilteredItems(filtered);
  }, [items, searchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
};