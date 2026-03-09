#!/bin/bash
# Sync source files to Windows and launch
WIN_DIR="/mnt/c/Users/artye/sound-app"

mkdir -p "$WIN_DIR"

# Copy the unpacked electron build (only first time or if missing)
if [ ! -f "$WIN_DIR/electron-sound-app.exe" ]; then
  cp -r "$HOME/electron-sound-app/dist/win-unpacked/"* "$WIN_DIR/"
fi

# Remove asar and use unpacked app folder
rm -f "$WIN_DIR/resources/app.asar"
mkdir -p "$WIN_DIR/resources/app"
mkdir -p "$WIN_DIR/resources/app/src"
cp "$HOME/electron-sound-app/src/main.js" "$WIN_DIR/resources/app/src/"
cp "$HOME/electron-sound-app/src/index.html" "$WIN_DIR/resources/app/src/"
cp "$HOME/electron-sound-app/beep.wav" "$WIN_DIR/resources/app/"
cp "$HOME/electron-sound-app/package.json" "$WIN_DIR/resources/app/"

# Launch
cmd.exe /c C:\\Users\\artye\\sound-app\\electron-sound-app.exe 2>/dev/null &
echo "Launched."
