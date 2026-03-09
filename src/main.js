const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  // Global shortcut works even when app is out of focus
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    if (mainWindow) {
      mainWindow.webContents.send('play-sound');
    }
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  app.quit();
});
