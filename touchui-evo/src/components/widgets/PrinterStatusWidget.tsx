import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { NeumorphicCard } from '../neumorphicComponents';
import { useOctoPrintSocket } from '../../contexts/WebSocketContext';

export const PrinterStatusWidget: React.FC = () => {
  const { isConnected, lastMessage } = useOctoPrintSocket();
  
  const statusData = React.useMemo(() => {
    if (lastMessage?.type === 'current' && lastMessage.payload?.state) {
      return {
        text: lastMessage.payload.state.text || 'Unknown',
        flags: lastMessage.payload.state.flags || {}
      };
    }
    return { text: 'Disconnected', flags: {} };
  }, [lastMessage]);

  const getStatusColor = (status: string, flags: any) => {
    if (!isConnected) return 'error';
    if (flags.printing) return 'success';
    if (flags.operational) return 'primary';
    if (flags.error) return 'error';
    return 'default';
  };

  const getStatusIcon = (status: string, flags: any) => {
    if (!isConnected) return '🔴';
    if (flags.printing) return '🖨️';
    if (flags.operational) return '🟢';
    if (flags.error) return '⚠️';
    return '⚪';
  };

  return (
    <NeumorphicCard sx={{ p: 2, minHeight: 120 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Stato Stampante
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h2" component="span">
          {getStatusIcon(statusData.text, statusData.flags)}
        </Typography>
        
        <Box>
          <Chip 
            label={statusData.text}
            color={getStatusColor(statusData.text, statusData.flags)}
            variant="outlined"
            sx={{ mb: 1 }}
          />
          
          <Typography variant="body2" color="text.secondary">
            WebSocket: {isConnected ? 'Connesso' : 'Disconnesso'}
          </Typography>
        </Box>
      </Box>
    </NeumorphicCard>
  );
};