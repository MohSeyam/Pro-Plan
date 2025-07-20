# Progress Mate - Cybersecurity Learning Journey Tracker

A comprehensive web application designed to help you track your progress through a 50-week cybersecurity learning plan. Built with React, TypeScript, and Material-UI, this application provides a modern, bilingual interface for managing your learning journey.

## 🌟 Features

### Core Functionality
- **50-Week Learning Plan**: Complete cybersecurity curriculum with daily tasks, resources, and objectives
- **Bilingual Support**: Full English and Arabic language support with RTL layout
- **Progress Tracking**: Real-time progress monitoring with visual indicators
- **Task Management**: Mark tasks as complete, track time spent, and manage daily activities

### Productivity Tools
- **Pomodoro Timer**: Built-in focus timer for productive learning sessions
- **Journal System**: Daily reflection prompts and note-taking capabilities
- **Resource Management**: Organized links to videos, articles, and guides

### Analytics & Insights
- **Achievement Dashboard**: Comprehensive statistics and progress visualization
- **Skill Matrix**: Track proficiency levels across 20+ cybersecurity domains
- **Note Management**: Create, edit, and organize notes with tagging system

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Local Storage**: All progress is saved locally in your browser
- **Export/Import**: Backup and restore your learning data

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd progress-mate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Logo.tsx        # Application logo (English)
│   ├── LogoArabic.tsx  # Application logo (Arabic)
│   ├── Spinner.tsx     # Loading indicator
│   ├── Toast.tsx       # Notification system
│   ├── DayView.tsx     # Daily task view
│   ├── WeekCard.tsx    # Weekly overview
│   ├── PomodoroTimer.tsx # Focus timer
│   ├── JournalEditor.tsx # Journal entry editor
│   ├── AchievementsView.tsx # Progress dashboard
│   ├── NotebookView.tsx # Notes management
│   └── SkillMatrix.tsx # Skills tracking
├── context/
│   └── AppContext.tsx  # Global state management
├── types/
│   └── index.ts        # TypeScript interfaces
├── data/
│   └── plan.json       # Learning plan data
└── App.tsx             # Main application component
```

## 🎯 Learning Plan Structure

The application is built around a comprehensive 50-week cybersecurity curriculum:

### Week Structure
- **Weekly Objectives**: Clear learning goals for each week
- **Daily Tasks**: 5-7 tasks per day with estimated duration
- **Resource Links**: Curated videos, articles, and guides
- **Journal Prompts**: Reflection questions for deeper learning

### Task Types
- **Blue Team**: Defensive security practices
- **Red Team**: Offensive security techniques
- **Purple Team**: Collaborative security approaches
- **Soft Skills**: Communication, leadership, and business skills
- **Practical**: Hands-on labs and exercises
- **Career**: Professional development and networking

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **UI Library**: Material-UI (MUI) v7
- **State Management**: React Context API with useReducer
- **Routing**: React Router v7
- **Styling**: Emotion (CSS-in-JS)
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns
- **Drag & Drop**: react-beautiful-dnd

## 🌐 Internationalization

The application supports both English and Arabic languages:

- **Language Switching**: Toggle between languages via the app bar
- **RTL Support**: Automatic right-to-left layout for Arabic
- **Bilingual Content**: All learning materials available in both languages
- **Font Optimization**: Appropriate fonts for each language

## 💾 Data Persistence

All user progress is stored locally in the browser:

- **Local Storage**: Automatic saving of progress, notes, and settings
- **No Server Required**: Works completely offline after initial load
- **Data Export**: Backup your progress as JSON files
- **Privacy Focused**: Your data never leaves your device

## 🎨 Customization

### Themes
- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Easy on the eyes for extended use
- **Automatic Switching**: Toggle themes via the app bar

### Personalization
- **Custom Notes**: Add personal insights and observations
- **Skill Tracking**: Monitor proficiency across cybersecurity domains
- **Journal Entries**: Reflect on your learning journey

## 📊 Analytics Features

### Progress Tracking
- **Overall Progress**: Percentage completion of the entire plan
- **Weekly Progress**: Individual week completion rates
- **Daily Progress**: Task completion for each day
- **Time Tracking**: Monitor learning hours spent

### Skill Development
- **20+ Skill Categories**: From network security to social engineering
- **Proficiency Levels**: Beginner to Expert progression
- **Category Statistics**: Progress breakdown by skill area
- **Personal Notes**: Add insights for each skill

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Component Structure**: Functional components with hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Cybersecurity Community**: For the comprehensive learning curriculum
- **Material-UI Team**: For the excellent React component library
- **React Team**: For the powerful frontend framework
- **Open Source Contributors**: For the various libraries and tools used

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include your browser version and operating system
4. Provide steps to reproduce the problem

---

**Happy Learning! 🚀**

Transform your cybersecurity journey with Progress Mate - your personal learning companion for mastering the art of digital security.
