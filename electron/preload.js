const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onKeyPressed: (callback) =>
    ipcRenderer.on("key-pressed", (_event, keycode) => callback(keycode)),
});
