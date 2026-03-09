#!/bin/bash
# WSL dev mode: Vite dev server + Electron with hot reload
cd "$(dirname "$0")/.."

npx vite --host &
VITE_PID=$!

echo "Waiting for Vite..."
for i in $(seq 1 30); do
  if curl -s http://localhost:5173 > /dev/null 2>&1; then
    break
  fi
  sleep 0.5
done

echo "Starting Electron..."
VITE_DEV_SERVER_URL=http://localhost:5173 npx electron .

kill $VITE_PID 2>/dev/null
