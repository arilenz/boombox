const { app, BrowserWindow } = require('electron');
const path = require('path');
const { uIOhook } = require('uiohook-napi');

let mainWindow;

const isDev = process.env.VITE_DEV_SERVER_URL !== undefined;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, '..', 'dist-renderer', 'index.html'),
    );
  }

  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  uIOhook.on('keydown', (e) => {
    if (mainWindow) {
      mainWindow.webContents.send('key-pressed', e.keycode);
    }
  });

  uIOhook.start();
});

app.on('will-quit', () => {
  uIOhook.stop();
});

app.on('window-all-closed', () => {
  app.quit();
});
