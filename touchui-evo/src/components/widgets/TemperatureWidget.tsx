import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { TouchUiCard } from '..'; // Updated import
import { useOctoPrintSocket } from '../../contexts/WebSocketContext';

interface TemperatureData {
  actual: number;
  target: number;
}

interface TemperatureWidgetProps {
  title: string;
  tempKey: string; // 'tool0', 'bed', etc.
}

export const TemperatureWidget: React.FC<TemperatureWidgetProps> = ({ title, tempKey }) => {
  const { lastMessage } = useOctoPrintSocket();
  
  // Estrai i dati di temperatura dal messaggio WebSocket
  const tempData: TemperatureData = React.useMemo(() => {
    if (lastMessage?.type === 'current' && lastMessage.payload?.temps?.[0]?.[tempKey]) {
      return lastMessage.payload.temps[0][tempKey];
    }
    return { actual: 0, target: 0 };
  }, [lastMessage, tempKey]);

  const progressValue = tempData.target > 0 ? (tempData.actual / tempData.target) * 100 : 0;

  return (
    <TouchUiCard sx={{ p: 2, minHeight: 120 }}> {/* Updated component name */}
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h4" component="span">
          {tempData.actual.toFixed(1)}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Target: {tempData.target}°C
        </Typography>
      </Box>
      
      {tempData.target > 0 && (
        <LinearProgress 
          variant="determinate" 
          value={Math.min(progressValue, 100)}
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'primary.main'
            }
          }}
        />
      )}
    </NeumorphicCard>
  );
};