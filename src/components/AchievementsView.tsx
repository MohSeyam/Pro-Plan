import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip
} from '@mui/material';
import { useApp } from '../context/AppContext';

export default function AchievementsView() {
  const { state, getText } = useApp();

  if (!state.plan) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h4">Loading achievements...</Typography>
      </Box>
    );
  }

  // Calculate statistics
  const totalTasks = state.plan.weeks.reduce((sum, week) => 
    sum + week.days.reduce((daySum, day) => daySum + day.tasks.length, 0), 0
  );
  
  const completedTasks = state.userProgress.completedTasks.length;
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const totalLearningHours = Object.values(state.userProgress.timeSpent).reduce((sum, time) => sum + time, 0) / 60;
  
  const notesCount = state.userProgress.notes.length;
  const journalEntriesCount = state.userProgress.journalEntries.length;

  // Calculate progress by task type
  const taskTypeStats = {
    'Blue Team': { completed: 0, total: 0 },
    'Red Team': { completed: 0, total: 0 },
    'Purple Team': { completed: 0, total: 0 },
    'Soft Skills': { completed: 0, total: 0 },
    'Practical': { completed: 0, total: 0 },
    'Career': { completed: 0, total: 0 }
  };

  state.plan.weeks.forEach(week => {
    week.days.forEach(day => {
      day.tasks.forEach(task => {
        taskTypeStats[task.type].total++;
        if (state.userProgress.completedTasks.includes(task.id)) {
          taskTypeStats[task.type].completed++;
        }
      });
    });
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {getText({ en: 'Achievements & Progress', ar: 'الإنجازات والتقدم' })}
      </Typography>

      {/* Overall Progress */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {getText({ en: 'Overall Progress', ar: 'التقدم العام' })}
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              {Math.round(overallProgress)}%
            </Typography>
            <Box flexGrow={1}>
              <LinearProgress 
                variant="determinate" 
                value={overallProgress} 
                sx={{ height: 12, borderRadius: 6 }}
              />
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {completedTasks} / {totalTasks} {getText({ en: 'tasks completed', ar: 'مهمة مكتملة' })}
          </Typography>
        </CardContent>
      </Card>

      {/* Key Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent textAlign="center">
              <Typography variant="h4" color="primary" gutterBottom>
                {completedTasks}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getText({ en: 'Tasks Completed', ar: 'المهام المكتملة' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent textAlign="center">
              <Typography variant="h4" color="secondary" gutterBottom>
                {Math.round(totalLearningHours)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getText({ en: 'Learning Hours', ar: 'ساعات التعلم' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent textAlign="center">
              <Typography variant="h4" color="success.main" gutterBottom>
                {notesCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getText({ en: 'Notes Created', ar: 'الملاحظات المنشأة' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent textAlign="center">
              <Typography variant="h4" color="info.main" gutterBottom>
                {journalEntriesCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getText({ en: 'Journal Entries', ar: 'إدخالات اليومية' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress by Task Type */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {getText({ en: 'Progress by Task Type', ar: 'التقدم حسب نوع المهمة' })}
          </Typography>
          
          {Object.entries(taskTypeStats).map(([type, stats]) => {
            const progress = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
            return (
              <Box key={type} mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body1">
                    {type}
                  </Typography>
                  <Chip 
                    label={`${stats.completed}/${stats.total}`}
                    size="small"
                    color={progress === 100 ? 'success' : 'default'}
                  />
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
}