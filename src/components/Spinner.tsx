import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface SpinnerProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

export default function Spinner({ message = 'Loading...', size = 40, fullScreen = false }: SpinnerProps) {
  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(255, 255, 255, 0.8)"
        zIndex={9999}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      {content}
    </Box>
  );
}