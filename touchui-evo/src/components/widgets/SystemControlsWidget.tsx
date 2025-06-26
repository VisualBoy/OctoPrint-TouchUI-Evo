import React, { useState } from 'react';
import { Box, Typography, Stack, useTheme, Grid } from '@mui/material';
import { TouchUiCard } from '../TouchUiCard';
import { ToggleCard } from '../ToggleCard';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'; // Placeholder for steppers
// import { useOctoPrintSocket } from '../../contexts/WebSocketContext';

// Mock for now
const mockUseOctoPrintSocket = () => {
  const [systemState, setSystemState] = useState({
    psuOn: true,
    steppersDisabled: false,
  });

  const sendMessage = (message: any) => {
    console.log('Mock sendMessage (SystemControls):', message);
    if (message.command === 'togglePSU') { // Example command for a PSU plugin
      setSystemState(prev => ({ ...prev, psuOn: !prev.psuOn }));
    } else if (message.command === 'M84' || message.command === 'M17') { // GCode for steppers
      // M84: Disable steppers, M17: Enable steppers (though typically they re-enable on next move)
      // For simplicity, we'll just toggle a state. Real implementation might need more nuance.
      setSystemState(prev => ({ ...prev, steppersDisabled: message.command === 'M84' }));
    }
  };

  return { systemState, sendMessage };
};


export const SystemControlsWidget: React.FC = () => {
  const { systemState, sendMessage } = mockUseOctoPrintSocket();
  const theme = useTheme();

  const handlePsuToggle = (toggled: boolean) => {
    // This depends heavily on the PSU Control plugin's API if used.
    // Sending a custom command that the PSU Control plugin listens for.
    sendMessage({ command: 'togglePSU' });
    // Or, if it's a direct GCODE or OctoPrint API call:
    // sendMessage({ gcode: toggled ? "M80" : "M81" }); // Common GCODEs for PSU on/off
  };

  const handleStepperToggle = (toggled: boolean) => {
    // True means steppers are disabled (motors off)
    // False means steppers are (or will be) enabled
    sendMessage({ command: toggled ? 'M84' : 'M17' }); // M84: Disable, M17: Enable (usually implicit)
  };

  return (
    <TouchUiCard sx={{ p: 2, height: '100%' }}>
      <Typography variant="h5" component="div" sx={{ mb: 3, textAlign: 'center', color: theme.palette.primary.main }}>
        System Controls
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ToggleCard
            title="PSU Power"
            toggled={systemState.psuOn}
            onToggle={handlePsuToggle}
            icon={<PowerSettingsNewIcon fontSize="large" />}
            variant="full" // Use full variant for more impact
             sx={{ height: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleCard
            title="Stepper Motors"
            toggled={!systemState.steppersDisabled} // UI shows "Enabled" when not disabled
            onToggle={(enabled) => handleStepperToggle(!enabled)} // Pass true to disable, false to enable
            activeLabel="Enabled"
            inactiveLabel="Disabled"
            icon={<DirectionsRunIcon fontSize="large" />} // Replace with a more appropriate icon
            variant="full"
            sx={{ height: '100%' }}
          />
        </Grid>
        {/* Add more system controls as needed */}
      </Grid>
    </TouchUiCard>
  );
};

export default SystemControlsWidget;
