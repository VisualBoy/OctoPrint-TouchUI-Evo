import React from 'react';
import { Box, Typography, IconButton, useTheme, SxProps, Theme, Paper } from '@mui/material';
// Icons for actions, replace with actual icons from the project's library
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DeleteIcon from '@mui/icons-material/Delete';
// import PrintIcon from '@mui/icons-material/Print';

interface FileMetadata {
  key: string;
  value: string | number;
}

interface FileListItemProps {
  icon: React.ReactNode; // e.g., an SVG icon component for file type
  name: string;
  metadata?: FileMetadata[]; // e.g., [{key: "Size", value: "12.3 MB"}, {key: "Date", value: "2023-10-26"}]
  onClick?: () => void;
  onSwipeLeft?: () => void; // Placeholder for swipe action
  onSwipeRight?: () => void; // Placeholder for swipe action
  sx?: SxProps<Theme>;
  actions?: React.ReactNode[]; // For explicit action buttons if swipe is not the only interaction
}

// Basic styling for the swipe action hints / areas (optional)
const swipeActionBaseStyles: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '70px', // Width of the revealed action area
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  opacity: 0, // Hidden by default
  zIndex: 0,
};

const FileListItem: React.FC<FileListItemProps> = ({
  icon,
  name,
  metadata = [],
  onClick,
  onSwipeLeft,
  onSwipeRight,
  sx,
  actions,
}) => {
  const theme = useTheme();
  // State for swipe interaction (if implementing without a library initially)
  // const [offsetX, setOffsetX] = React.useState(0);
  // const [revealedAction, setRevealedAction] = React.useState<'left' | 'right' | null>(null);

  // Placeholder for touch handling logic
  // This would involve onTouchStart, onTouchMove, onTouchEnd
  // and calculating distances/velocities to trigger swipe actions.
  // For a real implementation, a library like react-swipeable is recommended.

  const handleItemClick = () => {
    // Logic to prevent click if a swipe was intended might be needed here
    if (onClick) {
      onClick();
    }
  };

  return (
    <Paper
      elevation={0} // Use Paper for background and potential border, but keep it flat unless TouchUiCard is intended
      sx={{
        position: 'relative', // For swipe action overlays
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1.5, 2),
        backgroundColor: theme.palette.background.paper, // Or custom card background from theme
        borderBottom: `1px solid ${theme.palette.custom?.componentBorder || theme.palette.divider}`,
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden', // Important for swipe effect where actions are revealed from sides
        '&:last-child': {
          borderBottom: 'none',
        },
        // Add hover effect if desired, e.g.
        // '&:hover': {
        //   backgroundColor: onClick ? theme.palette.action.hover : 'transparent',
        // },
        ...sx,
      }}
      onClick={handleItemClick}
      // Add touch event handlers here if not using a library
    >
      {/* Background for Swipe Right Action (e.g., Print) */}
      {onSwipeRight && (
        <Box sx={{
          ...swipeActionBaseStyles,
          left: 0,
          // transform: revealedAction === 'right' ? 'translateX(0)' : 'translateX(-100%)',
          // opacity: revealedAction === 'right' ? 1 : 0,
          backgroundColor: theme.palette.success.main, // Example color
        }}>
          {/* <PrintIcon /> Placeholder */}
        </Box>
      )}

      {/* Background for Swipe Left Action (e.g., Delete) */}
      {onSwipeLeft && (
        <Box sx={{
          ...swipeActionBaseStyles,
          right: 0,
          // transform: revealedAction === 'left' ? 'translateX(0)' : 'translateX(100%)',
          // opacity: revealedAction === 'left' ? 1 : 0,
          backgroundColor: theme.palette.error.main, // Example color
        }}>
          {/* <DeleteIcon /> Placeholder */}
        </Box>
      )}

      {/* Main content, slides with swipe */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          // transform: `translateX(${offsetX}px)`, // Apply swipe offset
          transition: 'transform 0.3s ease', // Smooth transition back if swipe is not completed
          backgroundColor: theme.palette.background.paper, // Ensure content background is opaque
          zIndex: 1, // Above swipe action backgrounds
        }}
      >
        <Box
          component="div"
          sx={{
            marginRight: 2,
            color: theme.palette.primary.main, // Icon color
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.8rem', // Larger icon for touch
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <Typography
            variant="body1"
            noWrap
            sx={{ fontWeight: 500, color: theme.palette.text.primary }}
          >
            {name}
          </Typography>
          {metadata.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(0.5, 2) }}>
              {metadata.map((item) => (
                <Typography
                  key={item.key}
                  variant="caption"
                  noWrap
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {item.key}: {item.value}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
        {actions && (
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, zIndex: 2 /* Ensure actions are clickable */ }}>
            {actions.map((action, index) => (
              <React.Fragment key={index}>{action}</React.Fragment>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default FileListItem;
