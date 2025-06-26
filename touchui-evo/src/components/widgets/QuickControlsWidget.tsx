import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  Stop, 
  Home,
  VerticalAlignTop,
  VerticalAlignBottom 
} from '@mui/icons-material';
import { NeumorphicCard, NeumorphicButton } from '../neumorphicComponents';
import { useOctoPrintSocket } from '../../contexts/WebSocketContext';

export const QuickControlsWidget: React.FC = () => {
  const { sendMessage, lastMessage } = useOctoPrintSocket();
  
  const isPrinting = React.useMemo(() => {
    return lastMessage?.payload?.state?.flags?.printing || false;
  }, [lastMessage]);

  const handlePrintControl = (action: 'start' | 'pause' | 'cancel') => {
    sendMessage('job_command', { command: action });
  };

  const handleHomeAxis = (axis?: string) => {
    const axes = axis ? [axis] : ['x', 'y', 'z'];
    sendMessage('printer_command', { 
      command: 'home',
      axes: axes
    });
  };

  const handleMove = (axis: string, distance: number) => {
    sendMessage('printer_command', {
      command: 'jog',
      [axis]: distance
    });
  };

  return (
    <NeumorphicCard sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Controlli Rapidi
      </Typography>
      
      {/* Controlli Stampa */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Controlli Stampa
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <NeumorphicButton
            size="small"
            onClick={() => handlePrintControl('start')}
            disabled={isPrinting}
            startIcon={<PlayArrow />}
          >
            Avvia
          </NeumorphicButton>
          
          <NeumorphicButton
            size="small"
            onClick={() => handlePrintControl('pause')}
            disabled={!isPrinting}
            startIcon={<Pause />}
          >
            Pausa
          </NeumorphicButton>
          
          <NeumorphicButton
            size="small"
            onClick={() => handlePrintControl('cancel')}
            disabled={!isPrinting}
            startIcon={<Stop />}
            color="error"
          >
            Stop
          </NeumorphicButton>
        </Box>
      </Box>

      {/* Controlli Movimento */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Movimento Assi
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <NeumorphicButton
              fullWidth
              size="small"
              onClick={() => handleHomeAxis()}
              startIcon={<Home />}
            >
              Home All
            </NeumorphicButton>
          </Grid>
          <Grid item xs={6}>
            <NeumorphicButton
              fullWidth
              size="small"
              onClick={() => handleHomeAxis('z')}
              startIcon={<VerticalAlignTop />}
            >
              Home Z
            </NeumorphicButton>
          </Grid>
          
          {/* Controlli Z semplificati */}
          <Grid item xs={6}>
            <NeumorphicButton
              fullWidth
              size="small"
              onClick={() => handleMove('z', 10)}
              startIcon={<VerticalAlignTop />}
            >
              Z +10
            </NeumorphicButton>
          </Grid>
          <Grid item xs={6}>
            <NeumorphicButton
              fullWidth
              size="small"
              onClick={() => handleMove('z', -10)}
              startIcon={<VerticalAlignBottom />}
            >
              Z -10
            </NeumorphicButton>
          </Grid>
        </Grid>
      </Box>
    </NeumorphicCard>
  );
};