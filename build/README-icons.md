Icon assets for packaging

- Windows installer/exe icon: place `icon.ico` here (256x256 recommended).
- Optional (for cross-platform builds):
  - macOS app icon: `icon.icns`
  - Linux icon: `icon.png` (512x512)

Notes
- electron-builder reads the Windows icon from `build/icon.ico` configured in `package.json -> build.win.icon`.
- The `.ico` file is required for Windows packaging (NSIS). PNG will not be auto-converted.
- The icon does not need to be included under `files`; electron-builder consumes it during build.

