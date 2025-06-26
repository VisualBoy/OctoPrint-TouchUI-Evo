import React, { useState, useCallback } from 'react';
import { Box, Typography, Grid, Paper, Stack, useTheme } from '@mui/material';
import { TouchUiCard } from '../TouchUiCard';
import { TouchUiButton } from '../TouchUiButton';
import { CircularGauge } from '../CircularGauge';
import { ToggleCard } from '../ToggleCard';
// import { useOctoPrintSocket } from '../../contexts/WebSocketContext'; // Assuming this context exists

// Mock data and functions for now, to be replaced with WebSocket integration
const mockUseOctoPrintSocket = () => {
  const [temperatures, setTemperatures] = useState({
    tool0: { actual: 25, target: 0, display: '25.0°C / 0.0°C' },
    bed: { actual: 22, target: 0, display: '22.0°C / 0.0°C' },
  });
  const [presets] = useState([
    { name: 'PLA', tool: 210, bed: 60 },
    { name: 'PETG', tool: 235, bed: 75 },
    { name: 'ABS', tool: 250, bed: 100 },
    { name: 'Cooldown', tool: 0, bed: 0 },
  ]);

  const sendMessage = useCallback((message: any) => {
    console.log('Mock sendMessage:', message);
    if (message.command === 'target') {
      // @ts-ignore
      setTemperatures(prev => ({
        ...prev,
        [message.type]: {
          // @ts-ignore
          ...prev[message.type],
          target: message.targets[message.type],
          // @ts-ignore
          display: `${prev[message.type].actual.toFixed(1)}°C / ${message.targets[message.type].toFixed(1)}°C`,
        }
      }));
    } else if (message.command === 'offset') {
        // Implement offset logic if needed
    }
  }, []);

  // Simulate temperature updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTemperatures(prev => {
        const newTemps: any = {};
        Object.keys(prev).forEach(key => {
          // @ts-ignore
          const currentTemp = prev[key].actual;
          // @ts-ignore
          const targetTemp = prev[key].target;
          let newActual = currentTemp;
          if (currentTemp < targetTemp) {
            newActual = Math.min(currentTemp + Math.random() * 2, targetTemp);
          } else if (currentTemp > targetTemp) {
            newActual = Math.max(currentTemp - Math.random() * 2, targetTemp);
          }
          newTemps[key] = {
            actual: newActual,
            target: targetTemp,
            display: `${newActual.toFixed(1)}°C / ${targetTemp.toFixed(1)}°C`
          };
        });
        return newTemps;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  return {
    // @ts-ignore
    tool0Temperature: temperatures.tool0,
    // @ts-ignore
    bedTemperature: temperatures.bed,
    sendMessage,
    presets,
    // @ts-ignore
    printerStatus: { isPrinting: false, isOperational: true, flags: { printing: false, operational: true, cancelling: false, pausing: false, paused: false, error: false, ready: true } },
  };
};


interface TemperatureControlSectionProps {
  title: string;
  temperatureData: { actual: number; target: number; display: string } | undefined;
  onTargetChange: (target: number) => void;
  onHeaterToggle?: (active: boolean) => void; // For tool heaters if they can be turned off individually
  heaterActive?: boolean; // For tool heaters
  type: 'tool0' | 'bed'; // To identify the heater type for commands
}

const TemperatureControlSection: React.FC<TemperatureControlSectionProps> = ({
  title,
  temperatureData,
  onTargetChange,
  onHeaterToggle,
  heaterActive,
  type,
}) => {
  const theme = useTheme();
  const actualTemp = temperatureData?.actual || 0;
  const targetTemp = temperatureData?.target || 0;

  const handleGaugeChange = (value: number) => {
    onTargetChange(value);
  };

  return (
    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent', border: `1px solid ${theme.palette.custom.componentBorder}`, borderRadius: '12px' }}>
      <Typography variant="h6" gutterBottom align="center">
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, minHeight: 180 }}>
        <CircularGauge
          value={actualTemp}
          targetValue={targetTemp}
          maxValue={type === 'bed' ? 120 : 300}
          label={temperatureData?.display || `${actualTemp.toFixed(1)}°C / ${targetTemp.toFixed(1)}°C`}
          size={150}
          onValueChange={handleGaugeChange} // This might need adjustment based on CircularGauge's API for setting target
        />
      </Box>
      {type.startsWith('tool') && onHeaterToggle && (
        <Box sx={{mt: 1}}>
          <ToggleCard
            title="Heater"
            toggled={heaterActive !== undefined ? heaterActive : (targetTemp > 0)}
            onToggle={onHeaterToggle}
            variant="compact"
          />
        </Box>
      )}
    </Paper>
  );
};

export const TemperatureControlWidget: React.FC = () => {
  const { tool0Temperature, bedTemperature, sendMessage, presets, printerStatus } = mockUseOctoPrintSocket();
  const theme = useTheme();

  // For simplicity, we assume tool0 can be toggled. Bed is usually just target temp.
  // This state would ideally come from OctoPrint (e.g. if a tool is active/selected)
  const [isTool0HeaterActive, setIsTool0HeaterActive] = useState(tool0Temperature?.target > 0);

  const handleTargetChange = (type: 'tool0' | 'bed', target: number) => {
    const command = { command: 'target', targets: { [type]: target }, type };
    sendMessage(command);
    if (type === 'tool0') {
      setIsTool0HeaterActive(target > 0);
    }
  };

  const handleTool0HeaterToggle = (active: boolean) => {
    setIsTool0HeaterActive(active);
    if (!active) {
      // If toggled off, set target to 0
      sendMessage({ command: 'target', targets: { tool0: 0 }, type: 'tool0' });
    }
    // If toggled on, the user will then set a temperature via gauge or preset
  };

  const applyPreset = (preset: { name: string; tool?: number; bed?: number }) => {
    const targets: any = {};
    if (preset.tool !== undefined) targets.tool0 = preset.tool;
    if (preset.bed !== undefined) targets.bed = preset.bed;

    if (Object.keys(targets).length > 0) {
      sendMessage({ command: 'target', targets });
      if (preset.tool !== undefined) setIsTool0HeaterActive(preset.tool > 0);
    }
  };

  return (
    <TouchUiCard sx={{ p: 2, height: '100%' }}>
      <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', color: theme.palette.primary.main }}>
        Temperature Control
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TemperatureControlSection
            title="Extruder (T0)"
            temperatureData={tool0Temperature}
            onTargetChange={(target) => handleTargetChange('tool0', target)}
            onHeaterToggle={handleTool0HeaterToggle}
            heaterActive={isTool0HeaterActive}
            type="tool0"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TemperatureControlSection
            title="Heated Bed"
            temperatureData={bedTemperature}
            onTargetChange={(target) => handleTargetChange('bed', target)}
            type="bed"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom align="center">
          Material Presets
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center">
          {presets.map((preset) => (
            <TouchUiButton
              key={preset.name}
              variant="contained"
              onClick={() => applyPreset(preset)}
              sx={{ mb: 1 }}
            >
              {preset.name}
            </TouchUiButton>
          ))}
        </Stack>
      </Box>
    </TouchUiCard>
  );
};

export default TemperatureControlWidget;
