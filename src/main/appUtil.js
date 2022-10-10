const { ipcMain, app, BrowserWindow } = require('electron');
const os = require('os');

const setupIPCHandlers = () => {
  ipcMain.handle('getVersion', () => {
    return Promise.resolve(app.getVersion());
  });
  ipcMain.handle('getIpAddresses', () => {
    const nics = os.networkInterfaces();
    const addrObjArray = Object.values(nics).flat();
    return Promise.resolve(addrObjArray.map((addrObj) => addrObj.address));
  });
  ipcMain.handle('toggleWindowMaximize', () => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow.fullScreen) {
      currentWindow.setFullScreen(false);
    } else {
      currentWindow.setFullScreen(true);
    }
    return Promise.resolve();
  });
};

module.exports = setupIPCHandlers;
