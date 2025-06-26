import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Stack, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import { ArrowUpward, ArrowDownward, ArrowBack, ArrowForward, Home, Widgets as ZIcon } from '@mui/icons-material'; // Using Widgets as a placeholder for Z
import { TouchUiCard } from '../TouchUiCard';
import { TouchUiButton } from '../TouchUiButton';
// import { useOctoPrintSocket } from '../../contexts/WebSocketContext'; // Assuming this context exists

// Mock for now
const mockUseOctoPrintSocket = () => {
  const sendMessage = (message: any) => {
    console.log('Mock sendMessage (Movement):', message);
  };
  return { sendMessage };
};

const movementIncrements = [0.1, 1, 10, 100];

export const MovementControlWidget: React.FC = () => {
  const { sendMessage } = mockUseOctoPrintSocket();
  const theme = useTheme();
  const [selectedIncrement, setSelectedIncrement] = useState<number>(10);

  const handleIncrementChange = (
    event: React.MouseEvent<HTMLElement>,
    newIncrement: number | null,
  ) => {
    if (newIncrement !== null) {
      setSelectedIncrement(newIncrement);
    }
  };

  const handleJog = (axis: 'x' | 'y' | 'z', direction: number) => {
    const distance = selectedIncrement * direction;
    const command: any = { command: 'jog', [axis]: distance };
    if (axis === 'z') command.z = distance; // OctoPrint API uses x, y, z directly

    sendMessage(command);
  };

  const handleHome = (axes: string[]) => {
    sendMessage({ command: 'home', axes });
  };

  const JogButton = ({ axis, direction, children }: { axis: 'x' | 'y' | 'z', direction: number, children: React.ReactNode }) => (
    <TouchUiButton
      variant="contained"
      onClick={() => handleJog(axis, direction)}
      sx={{
        minWidth: '60px',
        height: '60px',
        m: 0.5,
        backgroundColor: theme.palette.custom.buttonBackground, // Ensure glass style
        '&:hover': {
          backgroundColor: theme.palette.custom.buttonHoverBackground,
        },
        '&:active': {
          backgroundColor: theme.palette.custom.buttonActiveBackground,
        }
      }}
    >
      {children}
    </TouchUiButton>
  );

  return (
    <TouchUiCard sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', color: theme.palette.primary.main }}>
        Movement Controls
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ToggleButtonGroup
          value={selectedIncrement}
          exclusive
          onChange={handleIncrementChange}
          aria-label="movement increment"
          size="small"
        >
          {movementIncrements.map((inc) => (
            <ToggleButton
              key={inc}
              value={inc}
              aria-label={`${inc}mm`}
              sx={{
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.getContrastText(theme.palette.primary.main),
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                },
                borderColor: theme.palette.custom.componentBorder,
              }}
            >
              {inc}mm
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={1} alignItems="center" justifyContent="center">
        {/* X/Y Jog Pad */}
        <Grid item xs={12} sm={8} md={7}>
          <Paper elevation={0} sx={{ p: 1, backgroundColor: 'transparent', border: `1px solid ${theme.palette.custom.componentBorder}`, borderRadius: '12px' }}>
            <Grid container item justifyContent="center">
              <JogButton axis="y" direction={1}><ArrowUpward /></JogButton>
            </Grid>
            <Grid container item justifyContent="center">
              <JogButton axis="x" direction={-1}><ArrowBack /></JogButton>
              <TouchUiButton
                variant="outlined"
                onClick={() => handleHome(['x', 'y'])}
                sx={{ minWidth: '60px', height: '60px', m: 0.5, borderColor: theme.palette.custom.componentBorder }}
              >
                <Home sx={{ fontSize: '1.2rem'}} />
                <Typography variant="caption" display="block" sx={{lineHeight: 1, mt: 0.2}}>X/Y</Typography>
              </TouchUiButton>
              <JogButton axis="x" direction={1}><ArrowForward /></JogButton>
            </Grid>
            <Grid container item justifyContent="center">
              <JogButton axis="y" direction={-1}><ArrowDownward /></JogButton>
            </Grid>
          </Paper>
        </Grid>

        {/* Z Jog & Home All */}
        <Grid item xs={12} sm={4} md={5}>
          <Paper elevation={0} sx={{ p: 1, backgroundColor: 'transparent', border: `1px solid ${theme.palette.custom.componentBorder}`, borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <Stack direction="column" spacing={1} alignItems="center">
              <Typography variant="subtitle1" align="center">Z-Axis</Typography>
              <JogButton axis="z" direction={1}><ArrowUpward /></JogButton>
              <TouchUiButton
                variant="outlined"
                onClick={() => handleHome(['z'])}
                sx={{ minWidth: '60px', height: '50px', m: 0.5, borderColor: theme.palette.custom.componentBorder }}

              >
                <Home sx={{ fontSize: '1rem'}}/>
                 <Typography variant="caption" display="block" sx={{lineHeight: 1, mt: 0.2}}>Z</Typography>
              </TouchUiButton>
              <JogButton axis="z" direction={-1}><ArrowDownward /></JogButton>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{mt: 1}}>
            <TouchUiButton
                variant="contained"
                fullWidth
                onClick={() => handleHome(['x', 'y', 'z'])}
                startIcon={<Home />}
                sx={{
                    height: '50px',
                    backgroundColor: theme.palette.secondary.main, // Or another distinct color
                     '&:hover': {
                        backgroundColor: theme.palette.secondary.dark,
                    },
                }}
            >
                Home All Axes
            </TouchUiButton>
        </Grid>
      </Grid>
    </TouchUiCard>
  );
};

export default MovementControlWidget;
