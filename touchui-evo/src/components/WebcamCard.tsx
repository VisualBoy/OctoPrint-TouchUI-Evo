import React from 'react';
import { Box, Typography, AspectRatio } from '@mui/joy'; // Using Joy UI AspectRatio for simplicity
import { TouchUiCard } from './TouchUiCard';
import { useTheme } from '@mui/material/styles'; // For accessing MUI theme

interface WebcamCardProps {
  title: string;
  streamUrl: string;
  aspectRatio?: number; // e.g., 16/9, 4/3
}

export const WebcamCard: React.FC<WebcamCardProps> = ({
  title,
  streamUrl,
  aspectRatio = 16 / 9,
}) => {
  const theme = useTheme(); // MUI theme

  return (
    <TouchUiCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" component="div" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
        <AspectRatio
          ratio={aspectRatio}
          sx={{
            width: '100%',
            backgroundColor: theme.palette.custom.cardBackground, // Use a background from theme
            '& .MuiAspectRatio-content': { // Ensure img fits correctly
              overflow: 'hidden',
            }
          }}
        >
          <img
            src={streamUrl}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Or 'contain' depending on desired behavior
              display: 'block',
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              // Fallback for broken image or stream
              // You could replace this with a placeholder icon or message
              e.currentTarget.style.display = 'none'; // Hide broken image
              // Optionally, show a message or icon
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const errorText = document.createElement('div');
                errorText.innerText = 'Webcam stream unavailable';
                errorText.style.color = theme.palette.text.secondary;
                errorText.style.display = 'flex';
                errorText.style.alignItems = 'center';
                errorText.style.justifyContent = 'center';
                errorText.style.height = '100%';
                parent.appendChild(errorText);
              }
            }}
          />
        </AspectRatio>
      </Box>
    </TouchUiCard>
  );
};

// Example Usage:
/*
export const SampleWebcamCard = () => (
  <Box sx={{ width: '100%', maxWidth: 500, p: 2 }}>
    <WebcamCard title="Primary Webcam" streamUrl="https://example.com/stream.mjpg" />
  </Box>
);
*/

export default WebcamCard;
