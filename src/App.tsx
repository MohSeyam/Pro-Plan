import React from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Book,
  Assessment,
  Psychology,
  Schedule,
  Language,
  Brightness4,
  Brightness7,
  Home
} from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Logo from './components/Logo';
import LogoArabic from './components/LogoArabic';
import Spinner from './components/Spinner';
import Toast from './components/Toast';
import WeekCard from './components/WeekCard';
import AchievementsView from './components/AchievementsView';
import NotebookView from './components/NotebookView';
import SkillMatrix from './components/SkillMatrix';

function AppContent() {
  const { state, dispatch, getText } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:768px)');
  
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] = React.useState<null | HTMLElement>(null);

  const theme = createTheme({
    palette: {
      mode: state.theme,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: state.language === 'ar' ? 'Arial, sans-serif' : 'Roboto, sans-serif',
    },
    direction: state.language === 'ar' ? 'rtl' : 'ltr',
  });

  const handleLanguageChange = (language: 'en' | 'ar') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
    setLanguageMenuAnchor(null);
  };

  const handleThemeToggle = () => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' });
  };

  const menuItems = [
    { text: { en: 'Dashboard', ar: 'لوحة التحكم' }, icon: <Dashboard />, path: '/' },
    { text: { en: 'Plan', ar: 'الخطة' }, icon: <Schedule />, path: '/plan' },
    { text: { en: 'Achievements', ar: 'الإنجازات' }, icon: <Assessment />, path: '/achievements' },
    { text: { en: 'Notebook', ar: 'المذكرة' }, icon: <Book />, path: '/notebook' },
    { text: { en: 'Skills', ar: 'المهارات' }, icon: <Psychology />, path: '/skills' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  if (state.loading) {
    return <Spinner fullScreen message="Loading your progress..." />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static">
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {state.language === 'ar' ? <LogoArabic size="small" /> : <Logo size="small" />}
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    startIcon={item.icon}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent'
                    }}
                  >
                    {getText(item.text)}
                  </Button>
                ))}
              </Box>
            )}

            {/* Language and Theme Controls */}
            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <Button
                color="inherit"
                onClick={(e) => setLanguageMenuAnchor(e.currentTarget)}
                startIcon={<Language />}
              >
                {state.language.toUpperCase()}
              </Button>
              
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {state.theme === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 250, pt: 2 }}>
            <Box sx={{ px: 2, mb: 2 }}>
              {state.language === 'ar' ? <LogoArabic size="medium" variant="vertical" /> : <Logo size="medium" variant="vertical" />}
            </Box>
            <Divider />
            <List>
              {menuItems.map((item) => (
                <ListItem
                  key={item.path}
                  button
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={getText(item.text)} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Language Menu */}
        <Menu
          anchorEl={languageMenuAnchor}
          open={Boolean(languageMenuAnchor)}
          onClose={() => setLanguageMenuAnchor(null)}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>
            English
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange('ar')}>
            العربية
          </MenuItem>
        </Menu>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plan" element={<PlanView />} />
            <Route path="/achievements" element={<AchievementsView />} />
            <Route path="/notebook" element={<NotebookView />} />
            <Route path="/skills" element={<SkillMatrix />} />
          </Routes>
        </Container>

        {/* Toast Notifications */}
        <Toast />
      </Box>
    </ThemeProvider>
  );
}

// Dashboard Component
function Dashboard() {
  const { state, getCurrentWeek, getCurrentDay } = useApp();
  const currentWeek = getCurrentWeek();
  const currentDay = getCurrentDay();

  if (!currentWeek) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h4" gutterBottom>
          Welcome to Progress Mate!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your cybersecurity learning journey starts here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Current Week: {currentWeek.week}
      </Typography>
      <WeekCard week={currentWeek} />
    </Box>
  );
}

// Plan View Component
function PlanView() {
  const { state } = useApp();

  if (!state.plan) {
    return <Spinner message="Loading plan..." />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Learning Plan
      </Typography>
      {state.plan.weeks.map((week) => (
        <WeekCard key={week.week} week={week} />
      ))}
    </Box>
  );
}

// Main App Component with Router
function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;