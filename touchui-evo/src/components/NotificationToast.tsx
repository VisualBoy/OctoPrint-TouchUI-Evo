import React from 'react';
import { Alert, Snackbar, IconButton, Typography, Box, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

export type NotificationSeverity = 'success' | 'error' | 'info' | 'warning';

export interface NotificationToastProps {
  id: string; // Unique ID for the notification
  open: boolean;
  message: string;
  severity: NotificationSeverity;
  title?: string;
  duration?: number | null; // null for persistent until manually closed
  onClose: (id: string, reason?: string) => void;
}

const icons = {
  success: <CheckCircleOutlineIcon fontSize="inherit" />,
  error: <ErrorOutlineIcon fontSize="inherit" />,
  info: <InfoOutlinedIcon fontSize="inherit" />,
  warning: <WarningAmberOutlinedIcon fontSize="inherit" />,
};

export const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  open,
  message,
  severity,
  title,
  duration = 6000, // Default 6 seconds
  onClose,
}) => {
  const theme = useTheme();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose(id, reason);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{
        // Custom styling for the Snackbar itself if needed
      }}
    >
      <Alert
        onClose={() => onClose(id)} // Provide a close button on the Alert itself
        severity={severity}
        iconMapping={icons}
        variant="filled" // Use filled variant for better visibility with glass theme
        sx={{
          width: '100%',
          maxWidth: 400,
          color: theme.palette.getContrastText(theme.palette[severity].main), // Ensure text contrast
          backgroundColor: theme.palette[severity].main, // Base color
          // Apply glassmorphism effect to the Alert
          backdropFilter: 'blur(8px)',
          border: `1px solid ${theme.palette.custom.componentBorder}`, // Subtle border
          boxShadow: theme.palette.custom.glowShadow, // Consistent shadow
          // Adjust background to be semi-transparent version of severity color for glass effect
          // This requires severity colors to be available in a format that allows alpha modification
          // For simplicity, we might use a slightly more opaque version of standard colors,
          // or define specific glass-compatible severity backgrounds in theme.custom
          // Example: backgroundColor: `rgba(${hexToRgb(theme.palette[severity].main)}, 0.75)`,
          // This would require hexToRgb to be available and palette colors to be hex.
          // For now, using the standard filled Alert look, which is already quite good.
          '.MuiAlert-icon': {
            alignItems: 'center', // Vertically center icon with text
            paddingTop: '2px', // Minor adjustment
          },
          '.MuiAlert-action': {
            // Style for the close button if needed
            color: theme.palette.getContrastText(theme.palette[severity].main),
          }
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => onClose(id)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {title && <Typography fontWeight="bold">{title}</Typography>}
        <Typography variant="body2">{message}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default NotificationToast;
