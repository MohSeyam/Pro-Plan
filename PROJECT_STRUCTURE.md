# Progress Mate - Project Structure

## 📁 Root Directory Structure

```
progress-mate/
├── 📁 public/                 # Static assets and build files
├── 📁 src/                    # Source code
├── 📁 node_modules/           # Dependencies (auto-generated)
├── 📄 package.json           # Project configuration and dependencies
├── 📄 package-lock.json      # Dependency lock file
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 jsconfig.json          # JavaScript/IDE configuration
├── 📄 .eslintrc.js           # ESLint configuration
├── 📄 .prettierrc            # Prettier configuration
├── 📄 .gitignore             # Git ignore rules
├── 📄 README.md              # Project documentation
└── 📄 PROJECT_STRUCTURE.md   # This file
```

## 📁 Public Directory

```
public/
├── 📄 index.html             # Main HTML template
├── 📄 manifest.json          # PWA manifest
├── 📄 robots.txt             # Search engine configuration
├── 📄 favicon.ico            # Site favicon
├── 📄 logo192.png            # App logo (192x192)
├── 📄 logo512.png            # App logo (512x512)
└── 📄 plan.json              # 50-week cybersecurity curriculum data
```

## 📁 Source Directory (src/)

```
src/
├── 📁 components/            # React components
│   ├── 📄 index.ts           # Component exports
│   ├── 📄 Logo.tsx           # English logo component
│   ├── 📄 LogoArabic.tsx     # Arabic logo component
│   ├── 📄 Spinner.tsx        # Loading indicator
│   ├── 📄 Toast.tsx          # Notification system
│   ├── 📄 DayView.tsx        # Daily task view
│   ├── 📄 WeekCard.tsx       # Weekly overview
│   ├── 📄 PomodoroTimer.tsx  # Focus timer
│   ├── 📄 JournalEditor.tsx  # Journal entry editor
│   ├── 📄 AchievementsView.tsx # Progress dashboard
│   ├── 📄 NotebookView.tsx   # Notes management
│   └── 📄 SkillMatrix.tsx    # Skills tracking
├── 📁 context/               # React context and state management
│   └── 📄 AppContext.tsx     # Main application context
├── 📁 types/                 # TypeScript type definitions
│   └── 📄 index.ts           # Application interfaces and types
├── 📁 utils/                 # Utility functions
│   └── 📄 index.ts           # Common utility functions
├── 📁 hooks/                 # Custom React hooks
│   └── 📄 index.ts           # Reusable hooks
├── 📁 constants/             # Application constants
│   └── 📄 index.ts           # Configuration constants
├── 📁 data/                  # Data files (legacy)
│   └── 📄 plan.json          # Curriculum data (moved to public/)
├── 📄 App.tsx                # Main application component
├── 📄 index.tsx              # Application entry point
├── 📄 index.css              # Global styles
├── 📄 App.css                # App-specific styles
├── 📄 App.test.tsx           # App tests
├── 📄 setupTests.ts          # Test configuration
├── 📄 reportWebVitals.ts     # Performance monitoring
└── 📄 react-app-env.d.ts     # React app type definitions
```

## 🏗️ Architecture Overview

### **Component Hierarchy**
```
App.tsx
├── AppContent
│   ├── AppBar (Navigation & Controls)
│   ├── Drawer (Mobile Navigation)
│   └── Routes
│       ├── Dashboard (Current Week)
│       ├── PlanView (Full Curriculum)
│       ├── AchievementsView (Progress Stats)
│       ├── NotebookView (Notes & Journal)
│       └── SkillMatrix (Skills Tracking)
```

### **State Management**
```
AppContext (Global State)
├── Language (en/ar)
├── Theme (light/dark)
├── Plan Data (50-week curriculum)
├── User Progress (completed tasks, notes, etc.)
├── UI State (loading, toasts, etc.)
└── Current Navigation (week, day)
```

### **Data Flow**
```
plan.json → AppContext → Components → Local Storage
     ↓           ↓           ↓           ↓
Curriculum → State → UI Updates → Persistence
```

## 🎯 Key Features by Directory

### **Components/**
- **Core UI**: Logo, Spinner, Toast
- **Learning Interface**: DayView, WeekCard
- **Productivity Tools**: PomodoroTimer, JournalEditor
- **Analytics**: AchievementsView, SkillMatrix
- **Content Management**: NotebookView

### **Context/**
- **AppContext**: Centralized state management
- **Reducer Pattern**: Predictable state updates
- **Local Storage**: Data persistence
- **Bilingual Support**: Language switching

### **Types/**
- **Interfaces**: TypeScript definitions
- **BilingualText**: Language support structure
- **Plan Structure**: Week, Day, Task definitions
- **User Data**: Progress, Notes, Skills types

### **Utils/**
- **Text Processing**: Language utilities
- **Date/Time**: Formatting and calculations
- **Storage**: Local storage helpers
- **Validation**: Input validation
- **Export/Import**: Data backup utilities

### **Hooks/**
- **useLocalStorage**: Persistent state
- **useDebounce**: Search optimization
- **useWindowSize**: Responsive design
- **useProgress**: Progress calculations
- **useSearch**: Filtering functionality

### **Constants/**
- **App Configuration**: App name, version
- **Timer Settings**: Pomodoro configuration
- **Task Types**: Blue Team, Red Team, etc.
- **Skill Categories**: Infrastructure, Application, etc.
- **UI Configuration**: Colors, breakpoints

## 🔧 Configuration Files

### **TypeScript (tsconfig.json)**
- Strict type checking
- React JSX support
- Module resolution
- Path mapping

### **ESLint (.eslintrc.js)**
- React hooks rules
- TypeScript integration
- Code quality standards
- Consistent formatting

### **Prettier (.prettierrc)**
- Code formatting rules
- Consistent indentation
- Quote preferences
- Line length limits

### **Package.json**
- Dependencies management
- Scripts for development
- Project metadata
- Build configuration

## 📊 Data Structure

### **Plan Data (plan.json)**
```json
[
  {
    "week": 1,
    "phase": 1,
    "title": { "en": "...", "ar": "..." },
    "objective": { "en": "...", "ar": "..." },
    "days": [
      {
        "key": "sat",
        "day": { "en": "Saturday", "ar": "السبت" },
        "topic": { "en": "...", "ar": "..." },
        "tasks": [...],
        "resources": [...],
        "notes_prompt": {...}
      }
    ]
  }
]
```

### **User Progress (Local Storage)**
```json
{
  "completedTasks": ["w1d1t1", "w1d1t2"],
  "timeSpent": { "w1d1t1": 75, "w1d1t2": 45 },
  "notes": [...],
  "journalEntries": [...],
  "skills": [...],
  "currentWeek": 1,
  "currentDay": "sat"
}
```

## 🚀 Development Workflow

1. **Setup**: `npm install`
2. **Development**: `npm start`
3. **Testing**: `npm test`
4. **Building**: `npm run build`
5. **Linting**: `npm run lint`
6. **Formatting**: `npm run format`

## 📱 Responsive Design

- **Mobile**: < 768px (drawer navigation)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Internationalization

- **English**: Default language
- **Arabic**: RTL support with custom fonts
- **Language Switching**: Real-time toggle
- **Content**: All text bilingual

## 🎨 Theming

- **Light Theme**: Default appearance
- **Dark Theme**: Dark mode support
- **Theme Persistence**: Saved in local storage
- **Material Design**: Consistent UI components

---

This structure provides a scalable, maintainable foundation for the Progress Mate application with clear separation of concerns and comprehensive feature coverage.