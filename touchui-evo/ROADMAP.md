### **Project Prompt: TouchUI-Evo Next Phase Development Plan**

**Objective:** To build upon the established "Glassmorphism" foundation and the functional, persistent dashboard by developing the remaining advanced UI components and application-specific widgets. The goal is to complete the feature set outlined in the original project vision.

### **1\. Current Project Status (as of 2025-06-26)**

The initial development phase is complete. The current state of the main branch includes:

* **A "Glassmorphism" UI:** Core components (TouchUiCard, TouchUiButton) have been successfully styled with a semi-transparent, blurred glass effect, using a centralized theme (theme.ts) with the LIME\_GREEN accent for interactive states.  
* **A Modular Component Structure:** Core components have been separated and are now located in a flat structure within touchui-evo/src/components/ for improved scalability.  
* **A Suite of Reusable Core Components:** The following components are implemented and available for use:  
  * TouchUiCard, TouchUiButton  
  * CircularGauge, StatusIndicatorLight, DataCard  
  * ControlSlider, ToggleCard, FileListItem  
* **A Functional and Persistent Dashboard:** The main dashboard is implemented using React Grid Layout with touch-supported drag-and-drop (react-dnd-touch-backend). The layout and widget configuration are successfully persisted in localStorage.  
* **Base Application Widgets:** The following foundational widgets are implemented and connected to the WebSocket for real-time data:  
  * TemperatureWidget, PrintProgressWidget, PrinterStatusWidget, QuickControlsWidget.

### **2\. Development Roadmap: Next Steps**

This phase focuses on creating the remaining advanced components and widgets to fulfill the application's feature requirements.

#### **2.1. Implement Remaining Core Component Blueprints**

**Target Directory:** touchui-evo/src/components/

**Action:** Develop the following high-level, reusable components based on the "Homify" reference designs.

* **LineChartCard.tsx:**  
  * **Function:** A specialized card for displaying historical data, primarily for the temperature graph.  
  * **Implementation:** Create a component that uses TouchUiCard as a container and integrates a charting library (e.g., Recharts). The chart must be styled with a clean line plot, a subtle gradient fill underneath, and minimalist axes, all adhering to the established dark theme.  
* **WebcamCard.tsx:**  
  * **Function:** A component designed to display a primary webcam stream.  
  * **Implementation:** Should support a main video feed with an optional layout for smaller thumbnails if multiple cameras are configured.

#### **2.2. Develop Advanced Application Widgets**

**Target Directory:** touchui-evo/src/components/widgets/

**Action:** Build the remaining feature-specific widgets using the complete suite of core components.

* **TemperatureControlWidget.tsx:**  
  * **Goal:** Create a comprehensive temperature control panel.  
  * **Implementation:** This will be a more advanced version of the existing TemperatureWidget. It must use the **CircularGauge** for setting target temperatures and incorporate **ToggleCard** or **TouchUiButton** components for activating heaters and selecting material presets (e.g., PLA, PETG, ABS).  
* **MovementControlWidget.tsx (JogControlPad):**  
  * **Goal:** Provide intuitive manual control over printer axes.  
  * **Implementation:** Create a widget containing a directional pad of TouchUiButtons for X/Y jogging, separate controls for Z-axis movement, and a home button. Include controls for selecting movement increments (0.1, 1, 10, 100mm).  
* **PrinterControlsWidget.tsx:**  
  * **Goal:** Centralize real-time printing adjustments.  
  * **Implementation:** A widget composed of a collection of **ControlSlider** components to manage Fan Speed, Flow Rate, and Feed Rate during a print.  
* **SystemControlsWidget.tsx:**  
  * **Goal:** Group high-level system commands.  
  * **Implementation:** A widget composed of several **ToggleCard** components for system actions like PSU power control and disabling stepper motors.  
* **TerminalPanelWidget.tsx:**  
  * **Goal:** Integrate a fully functional terminal.  
  * **Implementation:** Create a wrapper for xterm.js styled to match the dark/glass theme. It should provide a clean, readable console interface and an input field for sending manual G-code commands.  
* **GcodePreviewPanelWidget.tsx:**  
  * **Goal:** Provide a 3D visualization of the print model.  
  * **Implementation:** A widget that hosts a 3D G-code viewer (e.g., using three.js). It must include intuitive touch controls for camera rotation, zoom, and panning, as well as a slider or input to scrub through the print layers.

### **3\. Ongoing Global Considerations**

These principles remain in effect for all new development:

* **State Management:** Continue using the useOctoPrintSocket hook for real-time data. Utilize React Context or other state management solutions for complex UI state as needed.  
* **Responsiveness:** Ensure every new component and widget is fully responsive, providing an optimal layout on smartphones (portrait) and tablets (landscape) using MUI's breakpoint system.  
* **Notifications (NotificationToast):** A global, non-blocking notification system should be implemented to provide user feedback for key events (e.g., print complete, connection error).
