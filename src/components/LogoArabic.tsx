import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Security } from '@mui/icons-material';

interface LogoArabicProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'horizontal' | 'vertical';
}

export default function LogoArabic({ size = 'medium', variant = 'horizontal' }: LogoArabicProps) {
  const theme = useTheme();
  
  const sizeMap = {
    small: { icon: 24, text: 'h6' },
    medium: { icon: 32, text: 'h5' },
    large: { icon: 48, text: 'h3' }
  };

  const { icon, text } = sizeMap[size];

  if (variant === 'vertical') {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
      >
        <Security 
          sx={{ 
            fontSize: icon, 
            color: theme.palette.primary.main 
          }} 
        />
        <Typography
          variant={text as any}
          fontWeight="bold"
          color="primary"
          textAlign="center"
          sx={{ direction: 'rtl', fontFamily: 'Arial, sans-serif' }}
        >
          رفيق التقدم
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
    >
      <Security 
        sx={{ 
          fontSize: icon, 
          color: theme.palette.primary.main 
        }} 
      />
      <Typography
        variant={text as any}
        fontWeight="bold"
        color="primary"
        sx={{ direction: 'rtl', fontFamily: 'Arial, sans-serif' }}
      >
        رفيق التقدم
      </Typography>
    </Box>
  );
}