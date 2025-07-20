// Application Constants
export const APP_NAME = 'Progress Mate';
export const APP_VERSION = '1.0.0';

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PROGRESS: 'userProgress',
  SETTINGS: 'appSettings',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Timer Configuration
export const TIMER_CONFIG = {
  WORK: 25 * 60, // 25 minutes
  SHORT_BREAK: 5 * 60, // 5 minutes
  LONG_BREAK: 15 * 60, // 15 minutes
} as const;

// Task Types
export const TASK_TYPES = {
  BLUE_TEAM: 'Blue Team',
  RED_TEAM: 'Red Team',
  PURPLE_TEAM: 'Purple Team',
  SOFT_SKILLS: 'Soft Skills',
  PRACTICAL: 'Practical',
  CAREER: 'Career',
} as const;

// Skill Categories
export const SKILL_CATEGORIES = [
  'Infrastructure',
  'Application',
  'Offensive',
  'Defensive',
  'Analysis',
  'Design',
  'Governance',
  'Intelligence',
  'Technical',
  'Human',
] as const;

// Proficiency Levels
export const PROFICIENCY_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
] as const;

// Resource Types
export const RESOURCE_TYPES = {
  VIDEO: 'video',
  ARTICLE: 'article',
  GUIDE: 'guide',
  NEWS: 'news',
} as const;

// Toast Duration
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200,
} as const;

// Colors for Task Types
export const TASK_TYPE_COLORS = {
  [TASK_TYPES.BLUE_TEAM]: 'primary',
  [TASK_TYPES.RED_TEAM]: 'error',
  [TASK_TYPES.PURPLE_TEAM]: 'secondary',
  [TASK_TYPES.SOFT_SKILLS]: 'success',
  [TASK_TYPES.PRACTICAL]: 'warning',
  [TASK_TYPES.CAREER]: 'info',
} as const;

// Colors for Proficiency Levels
export const PROFICIENCY_COLORS = {
  Beginner: 'default',
  Intermediate: 'primary',
  Advanced: 'secondary',
  Expert: 'success',
} as const;