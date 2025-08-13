# Configurator: standard window, resizable, dev-tools allowed during dev.

# Host Controller: standard window, resizable, always-on-top toggle (optional), keyboard shortcuts.

# Main Display: fullscreen or kiosk-like (frameless), on selected external display.

# Numbers Grid Display: fullscreen or frameless, sponsor rails left/right, on selected external display.

# Positioning rules:

## On first run: open all on primary display; show a “Assign Displays” prompt.

## After assignment: persist window → display ID mapping.

## Provide a “Bring All Windows Here” emergency action.

Assign Displays modal in Configurator:

Each window has a “Send test card” button (window shows big colored card with title).

Dropdown of detected displays (by ID + resolution).

Save mapping to config.json.

Edge cases:

If mapped display is missing on boot → open on primary; show warning toast to re-assign.

