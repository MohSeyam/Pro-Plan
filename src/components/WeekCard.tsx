import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  Button,
  Collapse
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Week, Day } from '../types';
import { useApp } from '../context/AppContext';
import DayView from './DayView';

interface WeekCardProps {
  week: Week;
}

export default function WeekCard({ week }: WeekCardProps) {
  const { getText, getWeekProgress, state, dispatch } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>(week.days[0]?.key || '');
  const [expanded, setExpanded] = useState(false);

  const progress = getWeekProgress(week);
  const completedDays = week.days.filter(day => 
    day.tasks.every(task => state.userProgress.completedTasks.includes(task.id))
  ).length;

  const handleDayChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedDay(newValue);
  };

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  const selectedDayData = week.days.find(day => day.key === selectedDay);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        {/* Week Header */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box flexGrow={1}>
            <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
              Week {week.week}: {getText(week.title)}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {getText(week.objective)}
            </Typography>
            
            {/* Progress Info */}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="body2" color="text.secondary">
                Progress: {completedDays}/{week.days.length} days
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="text.secondary">
                {Math.round(progress)}%
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="outlined"
            onClick={handleExpandToggle}
            endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </Box>

        {/* Day Navigation Tabs */}
        <Tabs
          value={selectedDay}
          onChange={handleDayChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          {week.days.map((day) => {
            const dayProgress = day.tasks.length > 0 
              ? (day.tasks.filter(task => state.userProgress.completedTasks.includes(task.id)).length / day.tasks.length) * 100 
              : 0;
            
            return (
              <Tab
                key={day.key}
                label={
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="body2">
                      {getText(day.day)}
                    </Typography>
                    <Chip
                      label={`${Math.round(dayProgress)}%`}
                      size="small"
                      color={dayProgress === 100 ? 'success' : 'default'}
                      sx={{ mt: 0.5, fontSize: '0.7rem' }}
                    />
                  </Box>
                }
                value={day.key}
              />
            );
          })}
        </Tabs>

        {/* Day Content */}
        <Collapse in={expanded}>
          {selectedDayData && (
            <DayView day={selectedDayData} weekNumber={week.week} />
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
}