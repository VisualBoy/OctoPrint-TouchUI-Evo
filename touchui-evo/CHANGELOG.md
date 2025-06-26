### Update of 2025-06-26 19:30

Add StatusIndicatorLight and DataCard components (Phase 2)

- Added `StatusIndicatorLight` component:
    
    - Displays a small circle or pill shaped indicator.
    - Color changes based on `status` prop (success, warning, error, neutral, connecting).
    - Supports an optional pulsing animation.
    - Colors are sourced from `theme.palette.custom`.
    - Added new status colors to `theme.ts` and updated type augmentations.
- Added `DataCard` component:
    
    - A specialized card based on `NeumorphicCard` for displaying a key-value pair with an optional icon.
    - Uses `NeumorphicCard` for the glass effect background.
    - Arranges icon, label (caption), and value (h5) in a centered column.
    - Supports a `variant='highlight'` to emphasize data with primary theme color.
    - Leverages MUI `Box` and `Typography` for internal layout and styling.
    
    ---
    
    Feat: Apply Glass UI to Base Components and Refactor File Structure
    
- Renamed `neumorphicComponents.tsx` to `baseComponents.tsx`.
    
- Created `components/index.ts` for centralized component exports.
    
- Updated `NeumorphicCard` in `baseComponents.tsx` to a glassmorphism style:
    
    - Semi-transparent background with blur.
    - Updated border and shadow for a 'lifted glass' effect.
- Updated `NeumorphicButton` in `baseComponents.tsx` to a glassmorphism style:
    
    - Similar glass background, border, and shadow.
    - Text color strategy for WCAG AA contrast (default: text.primary).
    - LIME\_GREEN accent used for hover/active states (border & glow).
    - Enhanced transitions for a smoother feel.
- Centralized glass UI colors in `theme.ts` under `palette.custom`:
    
    - Added type augmentations for the custom palette.
    - Moved `hexToRgb` helper to `theme.ts` for `limeGlowColor` generation.
    - `NeumorphicCard` and `NeumorphicButton` now use these theme variables.
- Restored and translated original comments in `theme.ts`.
    
- Updated `components/index.ts` to export from `baseComponents.tsx`.
    

---

Refactor: Separate Card and Button components and rename

- Renamed `NeumorphicCard` to `TouchUiCard` and moved it to its own file `TouchUiCard.tsx` (previously `baseComponents.tsx`).
- Moved `NeumorphicButton` to a new file `TouchUiButton.tsx` and renamed it to `TouchUiButton`.
- Updated `components/index.ts` to export these components from their new locations.
- Updated all identified import paths and component usages in widget files (`PrintProgressWidget`, `PrinterStatusWidget`, `QuickControlsWidget`, `TemperatureWidget`) to reflect these changes.

This improves modularity by having core components in their own dedicated files.

---

### Aggiornamento del 2024-07-29 (Data Fittizia)

- Aggiornato `README.md` con una descrizione in inglese del progetto.
- Migliorato il supporto drag-and-drop per dispositivi touch integrando `react-dnd-touch-backend`.
- Implementata la persistenza dello stato della dashboard (layout dei widget e widget attivi) utilizzando `localStorage`. Questo permette agli utenti di mantenere le proprie personalizzazioni tra le sessioni.
- Il punto "Integrazione Drag-and-Drop" dai "Prossimi Passi" precedenti è stato completato e rimosso.
- I punti "Implementare react-dnd-touch-backend" e "Persistenza layout nel localStorage" dai "Prossimi Passi Suggeriti" precedenti sono stati completati.

---

### Aggiornamento del 2025-06-26 14:47

Implementata la prima fase del dashboard modulare con i widget base. 

## **Widget Implementati:**

1. **TemperatureWidget** - Mostra temperatura attuale e target con barra di progresso
2. **PrintProgressWidget** - Visualizza il progresso della stampa con tempi
3. **PrinterStatusWidget** - Stato della stampante con indicatori visivi
4. **QuickControlsWidget** - Controlli rapidi per stampa e movimento assi

## **Dashboard Responsive:**

- Utilizza **React Grid Layout** per la gestione della griglia
- Layout responsive per desktop, tablet e mobile
- Modalità edit per riorganizzare i widget
- Drag & drop per riposizionare gli elementi

## **Caratteristiche Principali:**

- **Integrazione WebSocket**: Tutti i widget si aggiornano in tempo reale
- **Design Neumorfico**: Coerente con il tema definito
- **Responsive**: Si adatta automaticamente a diversi dispositivi
- **Modulare**: Facile aggiungere nuovi widget

## **Prossimi Passi Suggeriti:**

1. **Implementare react-dnd-touch-backend** per il supporto touch ottimale
2. **Aggiungere più widget** (File Manager, Webcam, ecc.)
3. **Persistenza layout** nel localStorage
4. **Integrazione con OctoPrint API** reale
5. **Visualizzatore G-Code** con react-gcode-viewer
