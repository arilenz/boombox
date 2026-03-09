#!/bin/bash
# Build with Vite, sync to Windows, and launch
cd "$(dirname "$0")/.."

# Build the renderer
npx vite build

# Sync to Windows
WIN_DIR="/mnt/c/Users/artye/sound-app"
mkdir -p "$WIN_DIR"

# Copy Electron runtime (first time only)
if [ ! -f "$WIN_DIR/electron-sound-app.exe" ]; then
  cp -r dist/win-unpacked/* "$WIN_DIR/"
fi

# Remove asar and copy fresh app files
rm -f "$WIN_DIR/resources/app.asar"
mkdir -p "$WIN_DIR/resources/app/src"
mkdir -p "$WIN_DIR/resources/app/dist-renderer"
cp src/main.js "$WIN_DIR/resources/app/src/"
cp src/preload.js "$WIN_DIR/resources/app/src/"
cp -r dist-renderer/* "$WIN_DIR/resources/app/dist-renderer/"
cp package.json "$WIN_DIR/resources/app/"

# Launch
cmd.exe /c C:\\Users\\artye\\sound-app\\electron-sound-app.exe 2>/dev/null &
echo "Launched."
