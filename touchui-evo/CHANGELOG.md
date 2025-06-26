---

### Update of 2025-06-26 20:00

---

Refactor: Separate Card and Button components and rename

- Renamed `NeumorphicCard` to `TouchUiCard` and moved it to its own file `TouchUiCard.tsx` (previously `baseComponents.tsx`).
- Moved `NeumorphicButton` to a new file `TouchUiButton.tsx` and renamed it to `TouchUiButton`.
- Updated `components/index.ts` to export these components from their new locations.
- Updated all identified import paths and component usages in widget files (`PrintProgressWidget`, `PrinterStatusWidget`, `QuickControlsWidget`, `TemperatureWidget`) to reflect these changes.

This improves modularity by having core components in their own dedicated files.



---

### Update of 2025-06-26 19:30

---

**Feat: Apply Glass UI to Base Components and Refactor File Structure**

* Unified the visual style of `NeumorphicCard` and `NeumorphicButton` with a glassmorphism aesthetic, including semi-transparent backgrounds, blur effects, and enhanced borders and shadows.
* Improved accessibility by updating text color strategies for WCAG AA compliance.
* Introduced `LIME_GREEN` accents and smoother transitions for interactive states.
* Centralized color configuration by moving all glass UI tokens to `theme.ts` under `palette.custom`, including a `hexToRgb` helper.
* Renamed `neumorphicComponents.tsx` to `baseComponents.tsx` and updated `components/index.ts` for centralized exports.
* Restored and translated comments in `theme.ts` for clarity and maintainability.

---

**Refactor: Separate Card and Button Components and Rename**

* Extracted `NeumorphicCard` and `NeumorphicButton` into standalone files, renaming them to `TouchUiCard.tsx` and `TouchUiButton.tsx`, respectively.
* Updated imports and usage across all widget files to reflect new file paths and component names.
* These changes improve modularity and make the component structure more maintainable and scalable.


---

### Update of 2024-07-29 (Fictitious Date)

---

* Updated `README.md` with an English description of the project.
* Improved drag-and-drop support on touch devices by integrating `react-dnd-touch-backend`.
* Implemented dashboard state persistence (widget layout and active widgets) using `localStorage`. This allows users to keep their custom configurations between sessions.
* The "Drag-and-Drop Integration" item in the previous "Next Steps" was completed and removed.
* The items "Implement react-dnd-touch-backend" and "Persist layout in localStorage" from the previous "Suggested Next Steps" were completed.

###### Update of 2025-06-26 14:47

**Implemented Phase One of the Modular Dashboard with Base Widgets**

## **Implemented Widgets:**

1. **TemperatureWidget** – Displays current and target temperature with progress bar.
2. **PrintProgressWidget** – Shows print progress and timing.
3. **PrinterStatusWidget** – Displays printer status with visual indicators.
4. **QuickControlsWidget** – Quick access controls for printing and axis movement.

## **Responsive Dashboard:**

* Uses **React Grid Layout** for grid management.
* Responsive layout for desktop, tablet, and mobile.
* Edit mode for reorganizing widgets.
* Drag & drop support to reposition elements.

## **Key Features:**

* **WebSocket Integration**: All widgets update in real time.
* **Neumorphic Design**: Consistent with the defined theme.
* **Responsive**: Automatically adapts to different devices.
* **Modular**: Easy to add new widgets.

##

