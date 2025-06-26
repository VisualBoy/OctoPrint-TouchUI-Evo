import React from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import { NeumorphicCard } from '../neumorphicComponents';
import { useOctoPrintSocket } from '../../contexts/WebSocketContext';

export const PrintProgressWidget: React.FC = () => {
  const { lastMessage } = useOctoPrintSocket();
  
  const progressData = React.useMemo(() => {
    if (lastMessage?.type === 'current' && lastMessage.payload?.progress) {
      return {
        completion: lastMessage.payload.progress.completion || 0,
        printTime: lastMessage.payload.progress.printTime || 0,
        printTimeLeft: lastMessage.payload.progress.printTimeLeft || 0,
        filepos: lastMessage.payload.progress.filepos || 0
      };
    }
    return { completion: 0, printTime: 0, printTimeLeft: 0, filepos: 0 };
  }, [lastMessage]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <NeumorphicCard sx={{ p: 2, minHeight: 140 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="primary">
          Progresso Stampa
        </Typography>
        <Chip 
          label={`${progressData.completion.toFixed(1)}%`}
          color="primary"
          size="small"
        />
      </Box>
      
      <LinearProgress 
        variant="determinate" 
        value={progressData.completion}
        sx={{ 
          height: 12, 
          borderRadius: 6,
          mb: 2,
          backgroundColor: 'rgba(255,255,255,0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'primary.main'
          }
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          Trascorso: {formatTime(progressData.printTime)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rimanente: {formatTime(progressData.printTimeLeft)}
        </Typography>
      </Box>
    </NeumorphicCard>
  );
};