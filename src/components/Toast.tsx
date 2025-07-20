import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { state, dispatch } = useApp();
  const { toasts } = state;

  const handleClose = (id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };

  if (toasts.length === 0) return null;

  const latestToast = toasts[toasts.length - 1];

  return (
    <Snackbar
      open={true}
      autoHideDuration={latestToast.duration}
      onClose={() => handleClose(latestToast.id)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={() => handleClose(latestToast.id)}
        severity={latestToast.type as AlertColor}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {latestToast.message}
      </Alert>
    </Snackbar>
  );
}