; Simple G-code file for testing the GcodePreviewPanelWidget
; A small cube
G21 ; Set units to millimeters
G90 ; Use absolute positioning
M82 ; Use absolute distances for extrusion
G28 ; Home all axes
G1 Z5 F5000 ; Lift Z axis
G1 X10 Y10 F3000 ; Move to starting position
G1 Z0.2 F3000 ; Move to layer height
M109 S210 ; Set extruder temperature and wait
G92 E0 ; Reset extruder position
; Layer 1
G1 X10 Y30 E1 F1200
G1 X30 Y30 E2
G1 X30 Y10 E3
G1 X10 Y10 E4
; Layer 2
G1 Z0.4 F3000
G1 X10 Y30 E5 F1200
G1 X30 Y30 E6
G1 X30 Y10 E7
G1 X10 Y10 E8
; ... more layers ...
G1 Z5 F5000 ; Lift Z axis
M104 S0 ; Turn off extruder temperature
M140 S0 ; Turn off bed temperature (if applicable)
G28 X0 Y0 ; Home X and Y axes
M84 ; Disable motors
