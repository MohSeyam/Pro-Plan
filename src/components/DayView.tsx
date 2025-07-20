import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  IconButton,
  Tooltip,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  Article,
  VideoLibrary,
  School,
  Newspaper,
  Timer,
  Edit,
  Book
} from '@mui/icons-material';
import { Day, Task, Resource } from '../types';
import { useApp } from '../context/AppContext';
import PomodoroTimer from './PomodoroTimer';
import JournalEditor from './JournalEditor';

interface DayViewProps {
  day: Day;
  weekNumber: number;
}

export default function DayView({ day, weekNumber }: DayViewProps) {
  const { getText, isTaskCompleted, getTaskTimeSpent, dispatch, addToast } = useApp();
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskToggle = (task: Task) => {
    if (isTaskCompleted(task.id)) {
      dispatch({ type: 'UNCOMPLETE_TASK', payload: task.id });
      addToast('Task marked as incomplete', 'info');
    } else {
      dispatch({ type: 'COMPLETE_TASK', payload: { taskId: task.id, timeSpent: task.duration } });
      addToast('Task completed!', 'success');
    }
  };

  const handleStartPomodoro = (task: Task) => {
    setSelectedTask(task);
    setShowPomodoro(true);
  };

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return <VideoLibrary />;
      case 'article':
        return <Article />;
      case 'guide':
        return <School />;
      case 'news':
        return <Newspaper />;
      default:
        return <Article />;
    }
  };

  const getTaskTypeColor = (type: Task['type']) => {
    switch (type) {
      case 'Blue Team':
        return 'primary';
      case 'Red Team':
        return 'error';
      case 'Purple Team':
        return 'secondary';
      case 'Soft Skills':
        return 'success';
      case 'Practical':
        return 'warning';
      case 'Career':
        return 'info';
      default:
        return 'default';
    }
  };

  const completedTasks = day.tasks.filter(task => isTaskCompleted(task.id)).length;
  const progress = day.tasks.length > 0 ? (completedTasks / day.tasks.length) * 100 : 0;

  return (
    <Box>
      {/* Day Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              {getText(day.day)} - {getText(day.topic)}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Book />}
              onClick={() => setShowJournal(true)}
            >
              Journal
            </Button>
          </Box>
          
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="body2" color="text.secondary">
              Progress: {completedTasks}/{day.tasks.length} tasks
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
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tasks
          </Typography>
          <List>
            {day.tasks.map((task, index) => (
              <Accordion
                key={task.id}
                expanded={expandedTask === task.id}
                onChange={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box display="flex" alignItems="center" gap={2} width="100%">
                    <Checkbox
                      checked={isTaskCompleted(task.id)}
                      onChange={() => handleTaskToggle(task)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Box flexGrow={1}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {getText(task.description)}
                      </Typography>
                      <Box display="flex" gap={1} mt={1}>
                        <Chip
                          label={task.type}
                          size="small"
                          color={getTaskTypeColor(task.type) as any}
                        />
                        <Chip
                          label={`${task.duration} min`}
                          size="small"
                          variant="outlined"
                        />
                        {isTaskCompleted(task.id) && (
                          <Chip
                            label={`${getTaskTimeSpent(task.id)} min spent`}
                            size="small"
                            color="success"
                          />
                        )}
                      </Box>
                    </Box>
                    <Tooltip title="Start Pomodoro Timer">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartPomodoro(task);
                        }}
                        size="small"
                      >
                        <Timer />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {getText(task.description)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Resources */}
      {day.resources.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <List>
              {day.resources.map((resource, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {getResourceIcon(resource.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.title}
                      </Link>
                    }
                    secondary={resource.type}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Journal Prompt */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {getText(day.notes_prompt.title)}
          </Typography>
          <List>
            {day.notes_prompt.points.map((point, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText
                  primary={getText(point)}
                  sx={{ '& .MuiListItemText-primary': { fontSize: '0.9rem' } }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Pomodoro Timer Modal */}
      {showPomodoro && selectedTask && (
        <PomodoroTimer
          task={selectedTask}
          open={showPomodoro}
          onClose={() => setShowPomodoro(false)}
        />
      )}

      {/* Journal Editor Modal */}
      {showJournal && (
        <JournalEditor
          day={day}
          weekNumber={weekNumber}
          open={showJournal}
          onClose={() => setShowJournal(false)}
        />
      )}
    </Box>
  );
}