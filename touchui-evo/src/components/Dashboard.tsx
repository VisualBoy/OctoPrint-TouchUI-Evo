import React, { useState } from 'react';
import { Box, Grid, Fab, useTheme, useMediaQuery } from '@mui/material';
import { Add, Edit, Save } from '@mui/icons-material';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Import dei widget
import { TemperatureWidget } from './widgets/TemperatureWidget';
import { PrintProgressWidget } from './widgets/PrintProgressWidget';
import { PrinterStatusWidget } from './widgets/PrinterStatusWidget';
import { QuickControlsWidget } from './widgets/QuickControlsWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardWidget {
  id: string;
  component: React.ComponentType<any>;
  props?: any;
  defaultLayout: {
    w: number;
    h: number;
    minW?: number;
    minH?: number;
  };
}

const availableWidgets: DashboardWidget[] = [
  {
    id: 'printer-status',
    component: PrinterStatusWidget,
    defaultLayout: { w: 6, h: 3, minW: 4, minH: 3 }
  },
  {
    id: 'print-progress',
    component: PrintProgressWidget,
    defaultLayout: { w: 6, h: 3, minW: 4, minH: 3 }
  },
  {
    id: 'temp-tool0',
    component: TemperatureWidget,
    props: { title: 'Estrusore', tempKey: 'tool0' },
    defaultLayout: { w: 4, h: 3, minW: 3, minH: 3 }
  },
  {
    id: 'temp-bed',
    component: TemperatureWidget,
    props: { title: 'Piano', tempKey: 'bed' },
    defaultLayout: { w: 4, h: 3, minW: 3, minH: 3 }
  },
  {
    id: 'quick-controls',
    component: QuickControlsWidget,
    defaultLayout: { w: 4, h: 4, minW: 4, minH: 4 }
  }
];

export const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    'printer-status',
    'print-progress', 
    'temp-tool0',
    'temp-bed',
    'quick-controls'
  ]);

  // Layout di default per i breakpoint
  const generateLayouts = () => {
    const layouts: { [key: string]: Layout[] } = {};
    
    // Layout per desktop (lg)
    layouts.lg = activeWidgets.map((widgetId, index) => {
      const widget = availableWidgets.find(w => w.id === widgetId);
      if (!widget) return { i: widgetId, x: 0, y: 0, w: 4, h: 3 };
      
      const cols = 12;
      const itemsPerRow = Math.floor(cols / widget.defaultLayout.w);
      const row = Math.floor(index / itemsPerRow);
      const col = (index % itemsPerRow) * widget.defaultLayout.w;
      
      return {
        i: widgetId,
        x: col,
        y: row * widget.defaultLayout.h,
        w: widget.defaultLayout.w,
        h: widget.defaultLayout.h,
        minW: widget.defaultLayout.minW,
        minH: widget.defaultLayout.minH
      };
    });

    // Layout per tablet (md)
    layouts.md = activeWidgets.map((widgetId, index) => {
      const widget = availableWidgets.find(w => w.id === widgetId);
      if (!widget) return { i: widgetId, x: 0, y: 0, w: 6, h: 3 };
      
      const w = Math.min(widget.defaultLayout.w, 6);
      const itemsPerRow = Math.floor(10 / w);
      const row = Math.floor(index / itemsPerRow);
      const col = (index % itemsPerRow) * w;
      
      return {
        i: widgetId,
        x: col,
        y: row * widget.defaultLayout.h,
        w: w,
        h: widget.defaultLayout.h,
        minW: Math.min(widget.defaultLayout.minW || w, 4),
        minH: widget.defaultLayout.minH
      };
    });

    // Layout per mobile (sm) - tutto a colonna singola
    layouts.sm = activeWidgets.map((widgetId, index) => {
      const widget = availableWidgets.find(w => w.id === widgetId);
      return {
        i: widgetId,
        x: 0,
        y: index * (widget?.defaultLayout.h || 3),
        w: 6,
        h: widget?.defaultLayout.h || 3,
        minW: 6,
        minH: widget?.defaultLayout.minH || 3
      };
    });

    return layouts;
  };

  const [layouts, setLayouts] = useState(generateLayouts());

  const handleLayoutChange = (layout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    setLayouts(allLayouts);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const renderWidget = (widgetId: string) => {
    const widget = availableWidgets.find(w => w.id === widgetId);
    if (!widget) return <div>Widget non trovato</div>;
    
    const Component = widget.component;
    return (
      <div key={widgetId} style={{ height: '100%' }}>
        <Component {...(widget.props || {})} />
      </div>
    );
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', p: 2 }}>
      {/* Pulsante di modifica */}
      <Fab
        color="primary"
        aria-label="edit"
        onClick={toggleEditMode}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000
        }}
      >
        {isEditMode ? <Save /> : <Edit />}
      </Fab>

      {/* Griglia responsive */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
        style={{
          opacity: isEditMode ? 0.8 : 1,
          transition: 'opacity 0.3s ease'
        }}
      >
        {activeWidgets.map(renderWidget)}
      </ResponsiveGridLayout>

      {/* Overlay per modalità edit */}
      {isEditMode && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 999,
            pointerEvents: 'none'
          }}
        />
      )}
    </Box>
  );
};