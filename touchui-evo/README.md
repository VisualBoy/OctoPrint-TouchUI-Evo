# TouchUI Evo

TouchUI Evo is a modern, responsive, and customizable web interface for controlling 3D printers, likely designed as a successor or evolution of a previous TouchUI project. It's built with React and TypeScript, featuring a dark theme with lime green accents.

## Key Features:

*   **Real-time Updates:** Utilizes WebSockets to display live data from the printer, such as temperatures, print progress, and printer status.
*   **Modular Dashboard:** The interface is based on a customizable dashboard composed of various widgets.
    *   **Widget-based System:** Includes widgets for temperature monitoring, print progress, printer status, and quick controls (e.g., print, axis movement).
    *   **Drag-and-Drop Customization:** Users can rearrange widgets on the dashboard to fit their preferences using drag-and-drop functionality (powered by React Grid Layout and React DnD).
    *   **Responsive Design:** The layout adapts to different screen sizes, ensuring usability on desktops, tablets, and mobile devices.
*   **Plugin Framework (Planned):** Aims to support a plugin system for dynamically loading custom React components to extend functionality.
*   **G-code Visualization (Planned):** Integration with `react-gcode-viewer` to display G-code.
*   **Terminal Integration (Planned):** Integration with `xterm-react` for terminal access.

## Project Goals:

*   To provide a user-friendly and visually appealing interface for 3D printer control.
*   To offer a high degree of customization through a modular dashboard and plugin architecture.
*   To leverage modern web technologies for a responsive and real-time experience.

This project appears to be under active development, with a focus on integrating with OctoPrint or a similar 3D printer control system.
