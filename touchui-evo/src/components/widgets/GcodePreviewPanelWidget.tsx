import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Slider, CircularProgress, useTheme, IconButton } from '@mui/material';
import { TouchUiCard } from '../TouchUiCard';
import GCodeViewer from 'react-gcode-viewer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // For camera controls
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

// import { useOctoPrintSocket } from '../../contexts/WebSocketContext';

// Mock for now
const mockUseOctoPrintSocket = () => {
  const [gcodeFileUrl, setGcodeFileUrl] = useState<string | null>(null);
  // Simulate fetching a G-code file URL
  useEffect(() => {
    setTimeout(() => {
      // In a real scenario, this would come from OctoPrint's API (e.g., selected file)
      // For demo, using a publicly available G-code file if possible, or just a placeholder
      // setGcodeFileUrl('https://raw.githubusercontent.com/slic3r/Slic3r/master/utils/testgcode/20mm_Calibration_Cube.gcode');
      // Using a local path for testing if you have a file in public folder:
      setGcodeFileUrl('/test.gcode'); // Make sure to place a test.gcode in your public folder
    }, 1000);
  }, []);

  const [printProgress, setPrintProgress] = useState(0); // 0 to 100

  // Simulate print progress
  useEffect(() => {
    if (!gcodeFileUrl) return; // Don't start progress if no file
    const interval = setInterval(() => {
      setPrintProgress(prev => {
        if (prev >= 100) {
          // clearInterval(interval); // Stop when done, or loop for demo
          return 0; // Loop for demo
        }
        return prev + 1;
      });
    }, 500); // Adjust speed of progress for demo
    return () => clearInterval(interval);
  }, [gcodeFileUrl]);


  return { gcodeFileUrl, printProgress };
};


export const GcodePreviewPanelWidget: React.FC = () => {
  const theme = useTheme();
  const { gcodeFileUrl, printProgress } = mockUseOctoPrintSocket();
  const [layerCount, setLayerCount] = useState(0);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [internalProgress, setInternalProgress] = useState(0); // 0 to 1
  const viewerRef = useRef<any>(null); // Ref to access viewer instance for camera controls

  useEffect(() => {
    // Convert printProgress (0-100) to internalProgress (0-1)
    setInternalProgress(printProgress / 100);
  }, [printProgress]);

  useEffect(() => {
    // Update current layer based on internal progress when layerCount is known
    if (layerCount > 0) {
      setCurrentLayer(Math.floor(internalProgress * layerCount));
    }
  }, [internalProgress, layerCount]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const progress = newValue as number / 100;
    setInternalProgress(progress);
  };

  const centerCamera = () => {
    if (viewerRef.current && viewerRef.current.camera && viewerRef.current.controls) {
      viewerRef.current.controls.reset(); // Resets to initial position/zoom
    }
  };

  const zoomCamera = (factor: number) => {
     if (viewerRef.current && viewerRef.current.camera && viewerRef.current.controls) {
      // OrbitControls uses dollyIn/dollyOut for zoom
      if (factor > 1) { // Zoom in
        viewerRef.current.controls.dollyIn(factor);
      } else { // Zoom out
        viewerRef.current.controls.dollyOut(1/factor);
      }
      viewerRef.current.controls.update();
    }
  };

  return (
    <TouchUiCard sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" component="div" sx={{ mb: 1, textAlign: 'center', color: theme.palette.primary.main }}>
        G-code Preview
      </Typography>

      {!gcodeFileUrl && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, flexDirection: 'column' }}>
          <CircularProgress color="primary" />
          <Typography sx={{ mt: 1 }}>Loading G-code...</Typography>
        </Box>
      )}

      {gcodeFileUrl && (
        <>
          <Box
            sx={{
              flexGrow: 1,
              minHeight: 250, // Ensure viewer has space
              position: 'relative', // For positioning controls
              border: `1px solid ${theme.palette.custom.componentBorder}`,
              borderRadius: '8px',
              overflow: 'hidden', // Clip the viewer
              backgroundColor: theme.palette.mode === 'dark' ? '#202328' : '#f0f0f0', // Neutral bg for viewer
            }}
          >
            <GCodeViewer
              ref={viewerRef}
              url={gcodeFileUrl}
              orbitControls // Enable orbit controls
              showAxes // Show X, Y, Z axes
              progress={internalProgress} // 0 to 1
              layerColor={theme.palette.primary.main} // Color for current layer
              topLayerColor={theme.palette.secondary.main || theme.palette.primary.light} // Color for layers above current
              lastSegmentColor={theme.palette.error.main} // Color for the very last segment (nozzle)
              onLoad={(data: any) => {
                if (data && data.layers && data.layers.length) {
                  setLayerCount(data.layers.length);
                }
                // Attempt to make controls available
                if (viewerRef.current && viewerRef.current.camera && viewerRef.current.renderer) {
                    if (!viewerRef.current.controls) {
                         viewerRef.current.controls = new OrbitControls(viewerRef.current.camera, viewerRef.current.renderer.domElement);
                         viewerRef.current.controls.enablePan = true;
                         viewerRef.current.controls.enableZoom = true;
                         viewerRef.current.controls.enableRotate = true;
                    }
                }
              }}
              style={{ width: '100%', height: '100%' }}
              backgroundColor={theme.palette.mode === 'dark' ? '#202328' : '#f0f0f0'} // Match parent Box
              rendererOptions={{ antialias: true }} // Improve visual quality
            />
             <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <IconButton onClick={centerCamera} size="small" sx={{backgroundColor: 'rgba(0,0,0,0.3)', '&:hover': {backgroundColor: 'rgba(0,0,0,0.5)'}}}>
                    <CenterFocusStrongIcon sx={{color: 'white'}} />
                </IconButton>
                 <IconButton onClick={() => zoomCamera(1.2)} size="small" sx={{backgroundColor: 'rgba(0,0,0,0.3)', '&:hover': {backgroundColor: 'rgba(0,0,0,0.5)'}}}>
                    <ZoomInIcon sx={{color: 'white'}} />
                </IconButton>
                 <IconButton onClick={() => zoomCamera(0.8)} size="small" sx={{backgroundColor: 'rgba(0,0,0,0.3)', '&:hover': {backgroundColor: 'rgba(0,0,0,0.5)'}}}>
                    <ZoomOutIcon sx={{color: 'white'}} />
                </IconButton>
            </Box>
          </Box>
          <Box sx={{ mt: 1, p: 1 }}>
            <Typography gutterBottom sx={{fontSize: '0.8rem'}}>
              Layer: {currentLayer} / {layerCount > 0 ? layerCount -1 : 0} (Progress: {Math.round(internalProgress * 100)}%)
            </Typography>
            <Slider
              value={internalProgress * 100}
              onChange={handleSliderChange}
              aria-labelledby="gcode-progress-slider"
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
              min={0}
              max={100}
              step={0.1}
              sx={{
                '& .MuiSlider-thumb': {
                  backgroundColor: theme.palette.primary.main,
                },
                '& .MuiSlider-track': {
                  backgroundColor: theme.palette.primary.main,
                },
                '& .MuiSlider-rail': {
                  backgroundColor: theme.palette.custom.componentBorder,
                }
              }}
            />
          </Box>
        </>
      )}
    </TouchUiCard>
  );
};

export default GcodePreviewPanelWidget;
