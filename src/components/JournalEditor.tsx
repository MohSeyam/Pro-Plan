import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import { Day, JournalEntry } from '../types';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

interface JournalEditorProps {
  day: Day;
  weekNumber: number;
  open: boolean;
  onClose: () => void;
}

export default function JournalEditor({ day, weekNumber, open, onClose }: JournalEditorProps) {
  const { getText, state, dispatch, addToast } = useApp();
  const [content, setContent] = useState('');
  const [existingEntry, setExistingEntry] = useState<JournalEntry | null>(null);

  // Load existing journal entry
  useEffect(() => {
    if (open) {
      const entry = state.userProgress.journalEntries.find(
        entry => entry.week === weekNumber && entry.day === day.key
      );
      if (entry) {
        setExistingEntry(entry);
        setContent(entry.content);
      } else {
        setExistingEntry(null);
        setContent('');
      }
    }
  }, [open, day.key, weekNumber, state.userProgress.journalEntries]);

  const handleSave = () => {
    if (!content.trim()) {
      addToast('Please write something in your journal', 'warning');
      return;
    }

    const journalEntry: JournalEntry = {
      id: existingEntry?.id || Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      content: content.trim(),
      week: weekNumber,
      day: day.key,
      createdAt: existingEntry?.createdAt || new Date()
    };

    if (existingEntry) {
      // Update existing entry
      const updatedEntries = state.userProgress.journalEntries.map(entry =>
        entry.id === existingEntry.id ? journalEntry : entry
      );
      dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: journalEntry });
      addToast('Journal entry updated successfully', 'success');
    } else {
      // Add new entry
      dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: journalEntry });
      addToast('Journal entry saved successfully', 'success');
    }

    onClose();
  };

  const handleClose = () => {
    if (content.trim() && content !== existingEntry?.content) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Journal Entry - {getText(day.day)} (Week {weekNumber})
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            {getText(day.notes_prompt.title)}
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <List dense>
              {day.notes_prompt.points.map((point, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText
                    primary={`${index + 1}. ${getText(point)}`}
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.9rem' } }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={12}
          variant="outlined"
          placeholder="Write your thoughts, reflections, and insights here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontFamily: 'inherit',
              fontSize: '1rem',
              lineHeight: 1.6
            }
          }}
        />

        {existingEntry && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Last updated: {format(existingEntry.createdAt, 'MMM dd, yyyy HH:mm')}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={!content.trim()}
        >
          {existingEntry ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}