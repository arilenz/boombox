const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onPlaySound: (callback) => ipcRenderer.on('play-sound', callback),
});
