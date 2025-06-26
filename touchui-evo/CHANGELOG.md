---

### Update of 2025-06-27 (Jules AI Agent)

---

**Feat: Implement Advanced UI Components and Widgets**

This update significantly expands the TouchUI-Evo interface by adding new core components and a suite of advanced application-specific widgets, fulfilling the next phase of the development plan.

#### New Core Components (`touchui-evo/src/components/`)

*   **`LineChartCard.tsx`**: A specialized card using `Recharts` to display historical data, such as temperature graphs. Features a clean line plot, subtle gradient fill, and minimalist axes, adhering to the established dark theme.
*   **`WebcamCard.tsx`**: A component designed to display a primary webcam stream, built upon `TouchUiCard`. Initially supports a single feed with error handling for unavailable streams. Uses `@mui/joy` `AspectRatio` for responsive video display.

#### New Advanced Application Widgets (`touchui-evo/src/components/widgets/`)

*   **`TemperatureControlWidget.tsx`**: A comprehensive temperature control panel. Uses `CircularGauge` for setting target temperatures and `ToggleCard`/`TouchUiButton` for heater activation and material presets. (Mock data)
*   **`MovementControlWidget.tsx` (JogControlPad)**: Provides intuitive manual control over printer axes. Features a directional pad of `TouchUiButton`s for X/Y/Z jogging, a home button, and controls for selecting movement increments. (Mock data)
*   **`PrinterControlsWidget.tsx`**: Centralizes real-time printing adjustments. Composed of `ControlSlider` components to manage Fan Speed, Flow Rate, and Feed Rate. (Mock data)
*   **`SystemControlsWidget.tsx`**: Groups high-level system commands. Uses `ToggleCard` components for system actions like PSU power control and disabling stepper motors. (Mock data)
*   **`TerminalPanelWidget.tsx`**: Integrates a fully functional terminal using `@xterm/xterm`. Styled to match the dark/glass theme, providing a console interface and an input field for G-code commands. (Mock data, basic history/log display)
*   **`GcodePreviewPanelWidget.tsx`**: Provides a 3D visualization of the print model using `react-gcode-viewer`. Includes touch controls (via OrbitControls) for camera manipulation and a slider for layer scrubbing. A test G-code file (`public/test.gcode`) was added for demonstration. (Mock data for progress)

#### Global Notification System

*   **`NotificationToast.tsx`**: A reusable component for displaying global, non-blocking notifications with various severity levels (success, error, info, warning).
*   **`NotificationContext.tsx`**: A React context to manage and provide notifications throughout the application.
*   Integrated `NotificationProvider` into `App.tsx` to make notifications available globally.
*   Added an example notification on Dashboard mount for demonstration.

#### Integration & Setup

*   Installed necessary dependencies: `recharts`, `@types/recharts`, `@mui/joy`, `xterm`, `@xterm/addon-fit`, `@xterm/addon-attach`, `xterm-react` (though direct use of `@xterm/xterm` was prioritized), `react-gcode-viewer`, `three@0.149.0`, `uuid`, `@types/uuid`.
*   Updated `touchui-evo/src/components/index.ts` and created `touchui-evo/src/components/widgets/index.ts` to export all new components.
*   Integrated all new widgets into `Dashboard.tsx`'s `availableWidgets` list with default layout configurations and updated the default active widgets.

---

### Update of 2025-06-26 20:00

---

**Feat: Add New Reusable UI Components and Flatten Structure**

Added the following new reusable components to `touchui-evo/src/components/`:

#### Data Display Components

* **CircularGauge** – SVG-based semi-circle gauge for values like temperature.
* **StatusIndicatorLight** – Pill/circle-shaped indicator with color changes and optional pulsing animation for status.
* **DataCard** – Specialized `TouchUICard` for displaying a key-value pair with an icon.

#### Control Components

* **ControlSlider** – Compact MUI Slider wrapper with icon, label, and live value.
* **ToggleCard** – `TouchUICard` with icon, label, and MUI Switch for On/Off actions.
* **FileListItem** – Component for file browser rows with icon, name, metadata, and placeholder for touch gesture support.

Refactored the file structure to a flat layout within `touchui-evo/src/components/`, removing nested subfolders. Updated `CHANGELOG.md` accordingly.

---

### Update of 2025-06-26 19:30

---

**Feat: Apply Glass UI to Base Components and Refactor File Structure**

* Unified the visual style of `NeumorphicCard` and `NeumorphicButton` with a glassmorphism aesthetic: semi-transparent backgrounds, blur effects, and enhanced borders/shadows.
* Improved accessibility by applying WCAG AA-compliant text color strategies.
* Introduced `LIME_GREEN` accent for hover/active states, with smoother transitions for better UX.
* Centralized glass UI color tokens in `theme.ts` under `palette.custom`, including `hexToRgb` helper for generating `limeGlowColor`.
* Renamed `neumorphicComponents.tsx` to `baseComponents.tsx`.
* Updated `components/index.ts` to handle centralized exports.
* Restored and translated original comments in `theme.ts`.

---

**Refactor: Separate Card and Button Components and Rename**

* Renamed and relocated `NeumorphicCard` to `TouchUiCard.tsx` and `NeumorphicButton` to `TouchUiButton.tsx`.
* Updated all widget file imports (`PrintProgressWidget`, `PrinterStatusWidget`, `QuickControlsWidget`, `TemperatureWidget`) accordingly.
* These changes enhance modularity and future scalability by isolating core components.

---

### Update of 2024-07-29 (Fictitious Date)

---

* Updated `README.md` with an English project description.
* Enhanced drag-and-drop support on touch devices using `react-dnd-touch-backend`.
* Implemented persistent dashboard state (layout and widget status) via `localStorage`, preserving user configurations across sessions.
* Marked the "Drag-and-Drop Integration" item as completed and removed it from the "Next Steps".
* Completed the "Implement react-dnd-touch-backend" and "Persist layout in localStorage" items from previous "Suggested Next Steps".

---

### Update of 2025-06-26 14:47

---

**Implemented Phase One of the Modular Dashboard with Base Widgets**

#### Implemented Widgets

1. **TemperatureWidget** – Displays current and target temperature with progress bar.
2. **PrintProgressWidget** – Shows print progress and timing.
3. **PrinterStatusWidget** – Displays printer status with visual indicators.
4. **QuickControlsWidget** – Quick access controls for printing and axis movement.

#### Responsive Dashboard

* Uses **React Grid Layout** for grid management.
* Responsive layout for desktop, tablet, and mobile.
* Edit mode to reorganize widgets.
* Drag & drop support to reposition elements.

#### Key Features

* **WebSocket Integration** – Real-time updates for all widgets.
* **Neumorphic Design** – Consistent with defined theme.
* **Responsive** – Adapts automatically to various devices.
* **Modular** – Easily extendable with new widgets.

---
