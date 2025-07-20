import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add,
  Edit,
  Save,
  Cancel,
  Psychology,
  Search
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import { Skill } from '../types';

// Predefined cybersecurity skills
const PREDEFINED_SKILLS: Omit<Skill, 'id'>[] = [
  { name: 'Network Security', category: 'Infrastructure', proficiency: 'Beginner', notes: '' },
  { name: 'Web Application Security', category: 'Application', proficiency: 'Beginner', notes: '' },
  { name: 'Penetration Testing', category: 'Offensive', proficiency: 'Beginner', notes: '' },
  { name: 'Incident Response', category: 'Defensive', proficiency: 'Beginner', notes: '' },
  { name: 'Malware Analysis', category: 'Analysis', proficiency: 'Beginner', notes: '' },
  { name: 'Digital Forensics', category: 'Analysis', proficiency: 'Beginner', notes: '' },
  { name: 'Security Architecture', category: 'Design', proficiency: 'Beginner', notes: '' },
  { name: 'Risk Assessment', category: 'Governance', proficiency: 'Beginner', notes: '' },
  { name: 'Security Operations', category: 'Defensive', proficiency: 'Beginner', notes: '' },
  { name: 'Threat Intelligence', category: 'Intelligence', proficiency: 'Beginner', notes: '' },
  { name: 'Cryptography', category: 'Technical', proficiency: 'Beginner', notes: '' },
  { name: 'Cloud Security', category: 'Infrastructure', proficiency: 'Beginner', notes: '' },
  { name: 'Mobile Security', category: 'Application', proficiency: 'Beginner', notes: '' },
  { name: 'IoT Security', category: 'Infrastructure', proficiency: 'Beginner', notes: '' },
  { name: 'Social Engineering', category: 'Human', proficiency: 'Beginner', notes: '' },
  { name: 'Security Awareness', category: 'Human', proficiency: 'Beginner', notes: '' },
  { name: 'Compliance & Regulations', category: 'Governance', proficiency: 'Beginner', notes: '' },
  { name: 'Security Tools', category: 'Technical', proficiency: 'Beginner', notes: '' },
  { name: 'Programming for Security', category: 'Technical', proficiency: 'Beginner', notes: '' },
  { name: 'Security Metrics', category: 'Governance', proficiency: 'Beginner', notes: '' }
];

const CATEGORIES = ['Infrastructure', 'Application', 'Offensive', 'Defensive', 'Analysis', 'Design', 'Governance', 'Intelligence', 'Technical', 'Human'];
const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function SkillMatrix() {
  const { state, getText, dispatch, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    proficiency: 'Beginner' as Skill['proficiency'],
    notes: ''
  });

  // Initialize skills if empty
  React.useEffect(() => {
    if (state.userProgress.skills.length === 0) {
      PREDEFINED_SKILLS.forEach((skill, index) => {
        const newSkill: Skill = {
          id: `skill-${index}`,
          ...skill
        };
        dispatch({ type: 'UPDATE_SKILL', payload: newSkill });
      });
    }
  }, [state.userProgress.skills.length, dispatch]);

  const handleProficiencyChange = (skillId: string, proficiency: Skill['proficiency']) => {
    const skill = state.userProgress.skills.find(s => s.id === skillId);
    if (skill) {
      dispatch({ type: 'UPDATE_SKILL', payload: { ...skill, proficiency } });
    }
  };

  const handleNotesChange = (skillId: string, notes: string) => {
    const skill = state.userProgress.skills.find(s => s.id === skillId);
    if (skill) {
      dispatch({ type: 'UPDATE_SKILL', payload: { ...skill, notes } });
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.name.trim() || !newSkill.category) {
      addToast('Please fill in all required fields', 'warning');
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name.trim(),
      category: newSkill.category,
      proficiency: newSkill.proficiency,
      notes: newSkill.notes.trim()
    };

    dispatch({ type: 'UPDATE_SKILL', payload: skill });
    addToast('Skill added successfully', 'success');
    setShowAddDialog(false);
    setNewSkill({ name: '', category: '', proficiency: 'Beginner', notes: '' });
  };

  const getProficiencyColor = (proficiency: Skill['proficiency']) => {
    switch (proficiency) {
      case 'Beginner':
        return 'default';
      case 'Intermediate':
        return 'primary';
      case 'Advanced':
        return 'secondary';
      case 'Expert':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredSkills = state.userProgress.skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryStats = CATEGORIES.map(category => {
    const skillsInCategory = state.userProgress.skills.filter(skill => skill.category === category);
    const totalSkills = skillsInCategory.length;
    const expertSkills = skillsInCategory.filter(skill => skill.proficiency === 'Expert').length;
    const advancedSkills = skillsInCategory.filter(skill => skill.proficiency === 'Advanced').length;
    const intermediateSkills = skillsInCategory.filter(skill => skill.proficiency === 'Intermediate').length;
    
    return {
      category,
      totalSkills,
      expertSkills,
      advancedSkills,
      intermediateSkills,
      progress: totalSkills > 0 ? ((expertSkills + advancedSkills + intermediateSkills) / totalSkills) * 100 : 0
    };
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {getText({ en: 'Skill Matrix', ar: 'مصفوفة المهارات' })}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowAddDialog(true)}
        >
          {getText({ en: 'Add Skill', ar: 'إضافة مهارة' })}
        </Button>
      </Box>

      {/* Category Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {categoryStats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={stat.category}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {stat.category}
                </Typography>
                <Typography variant="h4" color="primary">
                  {stat.totalSkills}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {getText({ en: 'Skills', ar: 'مهارات' })}
                </Typography>
                <Box display="flex" gap={1} mt={1}>
                  <Chip label={`${stat.expertSkills} Expert`} size="small" color="success" />
                  <Chip label={`${stat.advancedSkills} Advanced`} size="small" color="secondary" />
                  <Chip label={`${stat.intermediateSkills} Intermediate`} size="small" color="primary" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={getText({ en: 'Search Skills', ar: 'البحث في المهارات' })}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Skills Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Skill</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Proficiency</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSkills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {skill.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={skill.category} size="small" />
                    </TableCell>
                    <TableCell>
                      <FormControl size="small">
                        <Select
                          value={skill.proficiency}
                          onChange={(e) => handleProficiencyChange(skill.id, e.target.value as Skill['proficiency'])}
                        >
                          {PROFICIENCY_LEVELS.map((level) => (
                            <MenuItem key={level} value={level}>
                              <Chip 
                                label={level} 
                                size="small" 
                                color={getProficiencyColor(level as Skill['proficiency'])}
                              />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={skill.notes}
                        onChange={(e) => handleNotesChange(skill.id, e.target.value)}
                        placeholder="Add notes..."
                        multiline
                        rows={2}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit Skill">
                        <IconButton size="small" onClick={() => setEditingSkill(skill)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Skill Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              label="Category"
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Proficiency Level</InputLabel>
            <Select
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value as Skill['proficiency'] })}
              label="Proficiency Level"
            >
              {PROFICIENCY_LEVELS.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Notes"
            value={newSkill.notes}
            onChange={(e) => setNewSkill({ ...newSkill, notes: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}