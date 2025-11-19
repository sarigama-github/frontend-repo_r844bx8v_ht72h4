const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // expose safe APIs here in the future
});
