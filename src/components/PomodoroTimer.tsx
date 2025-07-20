import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Chip
} from '@mui/material';
import { PlayArrow, Pause, Stop, Close } from '@mui/icons-material';
import { Task } from '../types';

interface PomodoroTimerProps {
  task: Task;
  open: boolean;
  onClose: () => void;
}

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerConfig {
  work: number;
  shortBreak: number;
  longBreak: number;
}

const TIMER_CONFIG: TimerConfig = {
  work: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60 // 15 minutes
};

export default function PomodoroTimer({ task, open, onClose }: PomodoroTimerProps) {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(TIMER_CONFIG.work);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    const totalTime = TIMER_CONFIG[mode];
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(TIMER_CONFIG[mode]);
  }, [mode]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(TIMER_CONFIG.work);
    setMode('work');
    setCompletedSessions(0);
  }, []);

  const switchMode = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_CONFIG[newMode]);
    setIsRunning(false);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer finished
            setIsRunning(false);
            
            if (mode === 'work') {
              setCompletedSessions(prev => prev + 1);
              // Auto-switch to break
              const nextMode = completedSessions % 4 === 3 ? 'longBreak' : 'shortBreak';
              setMode(nextMode);
              setTimeLeft(TIMER_CONFIG[nextMode]);
            } else {
              // Break finished, switch back to work
              setMode('work');
              setTimeLeft(TIMER_CONFIG.work);
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, mode, completedSessions]);

  // Reset timer when task changes
  useEffect(() => {
    resetTimer();
  }, [task.id, resetTimer]);

  const getModeColor = (): string => {
    switch (mode) {
      case 'work':
        return '#f44336';
      case 'shortBreak':
        return '#4caf50';
      case 'longBreak':
        return '#2196f3';
      default:
        return '#f44336';
    }
  };

  const getModeLabel = (): string => {
    switch (mode) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Focus Time';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Pomodoro Timer</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box textAlign="center" py={3}>
          {/* Task Info */}
          <Typography variant="h6" gutterBottom>
            {task.description.en}
          </Typography>
          
          {/* Mode Selection */}
          <Box display="flex" justifyContent="center" gap={1} mb={3}>
            <Chip
              label="Work"
              onClick={() => switchMode('work')}
              color={mode === 'work' ? 'primary' : 'default'}
              variant={mode === 'work' ? 'filled' : 'outlined'}
            />
            <Chip
              label="Short Break"
              onClick={() => switchMode('shortBreak')}
              color={mode === 'shortBreak' ? 'success' : 'default'}
              variant={mode === 'shortBreak' ? 'filled' : 'outlined'}
            />
            <Chip
              label="Long Break"
              onClick={() => switchMode('longBreak')}
              color={mode === 'longBreak' ? 'info' : 'default'}
              variant={mode === 'longBreak' ? 'filled' : 'outlined'}
            />
          </Box>

          {/* Timer Display */}
          <Box position="relative" display="inline-block">
            <CircularProgress
              variant="determinate"
              value={getProgress()}
              size={200}
              thickness={4}
              sx={{ color: getModeColor() }}
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
            >
              <Typography variant="h3" fontWeight="bold">
                {formatTime(timeLeft)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {getModeLabel()}
              </Typography>
            </Box>
          </Box>

          {/* Session Counter */}
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Completed Sessions: {completedSessions}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          variant="contained"
          startIcon={isRunning ? <Pause /> : <PlayArrow />}
          onClick={isRunning ? pauseTimer : startTimer}
          size="large"
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant="outlined"
          startIcon={<Stop />}
          onClick={stopTimer}
          size="large"
        >
          Stop
        </Button>
        <Button
          variant="outlined"
          onClick={resetTimer}
          size="large"
        >
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
}