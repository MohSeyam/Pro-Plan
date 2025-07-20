# 🚀 Progress Mate

**Your comprehensive cybersecurity learning journey tracker**

A bilingual (English/Arabic) web application designed to help you track your progress through a comprehensive 50-week cybersecurity curriculum. Built with React 19, TypeScript, and Material-UI.

![Progress Mate](https://img.shields.io/badge/Progress-Mate-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-0081CB?style=for-the-badge&logo=mui)

## ✨ Features

### 🎯 **Learning Management**
- **50-Week Curriculum**: Comprehensive cybersecurity learning plan
- **Daily Task Tracking**: Mark tasks as complete with progress persistence
- **Weekly Overviews**: See your progress at a glance
- **Resource Management**: Access learning materials and references

### 📊 **Progress Analytics**
- **Achievement Dashboard**: Visual progress tracking and statistics
- **Skill Matrix**: Track proficiency levels across cybersecurity domains
- **Time Tracking**: Monitor learning hours and session duration
- **Progress Visualization**: Charts and graphs for insights

### 🛠️ **Productivity Tools**
- **Pomodoro Timer**: Focus sessions with work/break cycles
- **Journal System**: Daily reflection prompts and entries
- **Note Taking**: Organize your learning notes and insights
- **Task Management**: Prioritize and organize your learning tasks

### 🌐 **Bilingual Support**
- **English & Arabic**: Full interface translation
- **RTL Layout**: Proper Arabic text direction support
- **Cultural Adaptation**: Localized content and formatting

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for all device sizes
- **Progressive Web App**: Install as native app
- **Offline Support**: Works without internet connection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/progress-mate.git
   cd progress-mate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm start          # Start development server
npm test           # Run tests
npm run build      # Build for production

# Code Quality
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
npm run type-check # TypeScript type checking
```

## 🏗️ Project Structure

```
progress-mate/
├── 📁 public/                 # Static assets
│   ├── 📄 plan.json          # 50-week curriculum data
│   └── 📄 index.html         # Main HTML template
├── 📁 src/
│   ├── 📁 components/        # React components
│   ├── 📁 context/           # State management
│   ├── 📁 types/             # TypeScript definitions
│   ├── 📁 utils/             # Utility functions
│   ├── 📁 hooks/             # Custom React hooks
│   └── 📁 constants/         # Application constants
└── 📄 PROJECT_STRUCTURE.md   # Detailed structure guide
```

For a complete project structure overview, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## 🎨 Key Components

### **Core Interface**
- **DayView**: Daily task management and completion tracking
- **WeekCard**: Weekly progress overview and navigation
- **AchievementsView**: Progress statistics and visualizations
- **SkillMatrix**: Skills tracking and proficiency management

### **Productivity Features**
- **PomodoroTimer**: Focus timer with work/break cycles
- **JournalEditor**: Daily reflection and note-taking
- **NotebookView**: Centralized note and journal management

### **Navigation & UI**
- **App Bar**: Language/theme toggles and navigation
- **Drawer**: Mobile-responsive navigation menu
- **Toast System**: User feedback and notifications

## 📊 Data Structure

The application uses a comprehensive 50-week cybersecurity curriculum stored in `public/plan.json`. Each week contains:

- **Week Information**: Title, objective, phase
- **Daily Tasks**: 7 days of structured learning
- **Resources**: Links to learning materials
- **Journal Prompts**: Reflection questions

User progress is automatically saved to local storage, including:
- Completed tasks
- Time spent on activities
- Notes and journal entries
- Skill proficiency levels

## 🌐 Internationalization

Progress Mate supports both English and Arabic languages:

- **Language Toggle**: Switch between languages instantly
- **RTL Support**: Proper Arabic text direction
- **Bilingual Content**: All curriculum content in both languages
- **Cultural Adaptation**: Localized formatting and conventions

## 🎨 Theming

The application supports light and dark themes:

- **Theme Toggle**: Switch between light and dark modes
- **Persistent Settings**: Theme preference saved locally
- **Material Design**: Consistent UI components and styling
- **Accessibility**: High contrast and readable typography

## 🔧 Configuration

### Environment Variables
```bash
REACT_APP_VERSION=1.0.0
REACT_APP_NAME=Progress Mate
```

### Local Storage Keys
- `userProgress`: User's learning progress
- `appSettings`: Application preferences
- `theme`: Current theme (light/dark)
- `language`: Current language (en/ar)

## 📱 Progressive Web App

Progress Mate is a PWA with the following features:

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Works without internet connection
- **Fast Loading**: Optimized performance and caching
- **Native Feel**: App-like experience across platforms

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Serve production build locally
npx serve -s build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Material-UI**: For the beautiful component library
- **TypeScript Team**: For type safety and developer experience
- **Cybersecurity Community**: For the comprehensive learning curriculum

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/progress-mate/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/progress-mate/discussions)
- **Email**: support@progress-mate.com

---

**Made with ❤️ for the cybersecurity learning community**

*Progress Mate - Your journey to cybersecurity excellence starts here!*
