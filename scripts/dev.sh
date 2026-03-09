#!/bin/bash
# Build with Vite, sync to Windows, and launch
cd "$(dirname "$0")/.."

# Build the renderer
npx vite build

# Sync to Windows
WIN_DIR="/mnt/c/Users/artye/boombox"
mkdir -p "$WIN_DIR"

# Copy Electron runtime (first time only)
if [ ! -f "$WIN_DIR/boombox.exe" ]; then
  if [ ! -d "dist/win-unpacked" ]; then
    npx electron-builder --win --dir
  fi
  cp -r dist/win-unpacked/* "$WIN_DIR/"
fi

# Remove asar and copy fresh app files
rm -f "$WIN_DIR/resources/app.asar"
mkdir -p "$WIN_DIR/resources/app/electron"
mkdir -p "$WIN_DIR/resources/app/dist-renderer"
cp electron/main.js "$WIN_DIR/resources/app/electron/"
cp electron/preload.js "$WIN_DIR/resources/app/electron/"
cp -r dist-renderer/* "$WIN_DIR/resources/app/dist-renderer/"
cp package.json "$WIN_DIR/resources/app/"

# Copy native dependencies
mkdir -p "$WIN_DIR/resources/app/node_modules"
cp -r node_modules/uiohook-napi "$WIN_DIR/resources/app/node_modules/"
cp -r node_modules/node-gyp-build "$WIN_DIR/resources/app/node_modules/"

# Launch
cmd.exe /c C:\\Users\\artye\\boombox\\boombox.exe 2>/dev/null &
echo "Launched."
