import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Button,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Book,
  Article,
  Search
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import { Note, JournalEntry } from '../types';
import { format } from 'date-fns';

export default function NotebookView() {
  const { state, getText, dispatch, addToast } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteForm, setNoteForm] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    taskId: '',
    template: ''
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setNoteForm({
      title: '',
      content: '',
      tags: [],
      taskId: '',
      template: ''
    });
    setShowNoteDialog(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNoteForm({
      title: note.title,
      content: note.content,
      tags: note.tags,
      taskId: note.taskId || '',
      template: note.template || ''
    });
    setShowNoteDialog(true);
  };

  const handleSaveNote = () => {
    if (!noteForm.title.trim() || !noteForm.content.trim()) {
      addToast('Please fill in all required fields', 'warning');
      return;
    }

    const note: Note = {
      id: editingNote?.id || Date.now().toString(),
      title: noteForm.title.trim(),
      content: noteForm.content.trim(),
      tags: noteForm.tags,
      taskId: noteForm.taskId || undefined,
      template: noteForm.template || undefined,
      createdAt: editingNote?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (editingNote) {
      dispatch({ type: 'UPDATE_NOTE', payload: note });
      addToast('Note updated successfully', 'success');
    } else {
      dispatch({ type: 'ADD_NOTE', payload: note });
      addToast('Note created successfully', 'success');
    }

    setShowNoteDialog(false);
  };

  const handleDeleteNote = (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch({ type: 'DELETE_NOTE', payload: noteId });
      addToast('Note deleted successfully', 'success');
    }
  };

  const getTaskTitle = (taskId: string) => {
    if (!state.plan) return taskId;
    
    for (const week of state.plan.weeks) {
      for (const day of week.days) {
        const task = day.tasks.find(t => t.id === taskId);
        if (task) {
          return getText(task.description);
        }
      }
    }
    return taskId;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {getText({ en: 'Notebook', ar: 'المذكرة' })}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateNote}
        >
          {getText({ en: 'New Note', ar: 'ملاحظة جديدة' })}
        </Button>
      </Box>

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {state.userProgress.notes.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getText({ en: 'Total Notes', ar: 'إجمالي الملاحظات' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="secondary">
                {state.userProgress.journalEntries.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getText({ en: 'Journal Entries', ar: 'إدخالات اليومية' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <CardContent>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab 
              label={getText({ en: 'Task Notes', ar: 'ملاحظات المهام' })}
              icon={<Article />}
            />
            <Tab 
              label={getText({ en: 'Journal Entries', ar: 'إدخالات اليومية' })}
              icon={<Book />}
            />
          </Tabs>

          {/* Task Notes Tab */}
          {activeTab === 0 && (
            <Box>
              {state.userProgress.notes.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {getText({ en: 'No notes yet', ar: 'لا توجد ملاحظات بعد' })}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleCreateNote}
                  >
                    {getText({ en: 'Create your first note', ar: 'أنشئ ملاحظتك الأولى' })}
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {state.userProgress.notes.map((note) => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                      <Card>
                        <CardContent>
                          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                            <Typography variant="h6" noWrap sx={{ maxWidth: '70%' }}>
                              {note.title}
                            </Typography>
                            <Box>
                              <IconButton size="small" onClick={() => handleEditNote(note)}>
                                <Edit />
                              </IconButton>
                              <IconButton size="small" onClick={() => handleDeleteNote(note.id)}>
                                <Delete />
                              </IconButton>
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {note.content.substring(0, 100)}...
                          </Typography>
                          
                          {note.taskId && (
                            <Typography variant="caption" color="primary" display="block" mb={1}>
                              Task: {getTaskTitle(note.taskId)}
                            </Typography>
                          )}
                          
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {note.tags.map((tag) => (
                              <Chip key={tag} label={tag} size="small" />
                            ))}
                          </Box>
                          
                          <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                            {format(note.updatedAt, 'MMM dd, yyyy')}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {/* Journal Entries Tab */}
          {activeTab === 1 && (
            <Box>
              {state.userProgress.journalEntries.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <Typography variant="h6" color="text.secondary">
                    {getText({ en: 'No journal entries yet', ar: 'لا توجد إدخالات يومية بعد' })}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {state.userProgress.journalEntries.map((entry) => (
                    <Card key={entry.id} sx={{ mb: 2 }}>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                          <Typography variant="h6">
                            {getText({ en: 'Week', ar: 'الأسبوع' })} {entry.week} - {entry.day}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {format(entry.createdAt, 'MMM dd, yyyy')}
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {entry.content.substring(0, 200)}...
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Note Dialog */}
      <Dialog open={showNoteDialog} onClose={() => setShowNoteDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingNote ? 'Edit Note' : 'Create New Note'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={noteForm.title}
            onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={8}
            value={noteForm.content}
            onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Tags (comma-separated)"
            value={noteForm.tags.join(', ')}
            onChange={(e) => setNoteForm({ 
              ...noteForm, 
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
            })}
            margin="normal"
            helperText="Enter tags separated by commas"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNoteDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveNote}>
            {editingNote ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}