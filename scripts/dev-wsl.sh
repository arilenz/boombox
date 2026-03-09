#!/bin/bash
# WSL dev mode: Vite dev server + Electron with hot reload
cd "$(dirname "$0")/.."

# Kill any stale Vite processes
pkill -f "vite" 2>/dev/null
sleep 0.5

npx vite --host 2>&1 &
VITE_PID=$!

echo "Waiting for Vite..."
VITE_URL=""
for i in $(seq 1 30); do
  for port in 5173 5174 5175 5176 5177 5178; do
    if curl -s "http://localhost:$port" > /dev/null 2>&1; then
      VITE_URL="http://localhost:$port"
      break 2
    fi
  done
  sleep 0.5
done

if [ -z "$VITE_URL" ]; then
  echo "Failed to detect Vite server"
  kill $VITE_PID 2>/dev/null
  exit 1
fi

echo "Vite running at $VITE_URL"
echo "Starting Electron..."
VITE_DEV_SERVER_URL="$VITE_URL" npx electron .

kill $VITE_PID 2>/dev/null
