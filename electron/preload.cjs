const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // safe apis here
});
