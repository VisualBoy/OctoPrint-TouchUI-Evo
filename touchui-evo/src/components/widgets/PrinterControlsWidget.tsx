import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, useTheme } from '@mui/material';
import { TouchUiCard } from '../TouchUiCard';
import { ControlSlider } from '../ControlSlider'; // Assuming this is the correct path
// import { useOctoPrintSocket } from '../../contexts/WebSocketContext';

// Mock for now
const mockUseOctoPrintSocket = () => {
  const [printerState, setPrinterState] = useState({
    fanSpeed: 0, // Percentage
    flowRate: 100, // Percentage
    feedRate: 100, // Percentage
  });

  const sendMessage = (message: any) => {
    console.log('Mock sendMessage (PrinterControls):', message);
    if (message.command === 'fan') {
      setPrinterState(prev => ({ ...prev, fanSpeed: message.speed }));
    } else if (message.command === 'flowrate') {
      setPrinterState(prev => ({ ...prev, flowRate: message.value }));
    } else if (message.command === 'feedrate') {
      setPrinterState(prev => ({ ...prev, feedRate: message.value }));
    }
  };

  // Simulate receiving updates if values were changed elsewhere
  useEffect(() => {
    // This would typically be handled by onmessage in the actual hook
  }, []);

  return { printerState, sendMessage };
};


export const PrinterControlsWidget: React.FC = () => {
  const { printerState, sendMessage } = mockUseOctoPrintSocket();
  const theme = useTheme();

  const handleFanSpeedChange = (value: number) => {
    sendMessage({ command: 'fan', speed: value });
  };

  const handleFlowRateChange = (value: number) => {
    sendMessage({ command: 'flowrate', value: value });
  };

  const handleFeedRateChange = (value: number) => {
    sendMessage({ command: 'feedrate', value: value });
  };

  return (
    <TouchUiCard sx={{ p: 2, height: '100%' }}>
      <Typography variant="h5" component="div" sx={{ mb: 3, textAlign: 'center', color: theme.palette.primary.main }}>
        Print Adjustments
      </Typography>
      <Stack spacing={3}>
        <ControlSlider
          label="Fan Speed"
          value={printerState.fanSpeed}
          onChange={handleFanSpeedChange}
          min={0}
          max={100}
          step={1}
          unit="%"
          color="info" // Example color, can be customized
        />
        <ControlSlider
          label="Flow Rate"
          value={printerState.flowRate}
          onChange={handleFlowRateChange}
          min={50} // Example range
          max={150} // Example range
          step={1}
          unit="%"
          color="success" // Example color
        />
        <ControlSlider
          label="Feed Rate"
          value={printerState.feedRate}
          onChange={handleFeedRateChange}
          min={50} // Example range
          max={200} // Example range
          step={1}
          unit="%"
          color="warning" // Example color
        />
      </Stack>
    </TouchUiCard>
  );
};

export default PrinterControlsWidget;
