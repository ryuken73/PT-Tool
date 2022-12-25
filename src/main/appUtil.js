// const { ipcMain, app, BrowserWindow, desktopCapturer } = require('electron');
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
  ipcMain.handle('captureScreen', () => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow === null) return;
    const [width, height] = currentWindow.getSize();
    // eslint-disable-next-line consistent-return
    return currentWindow.webContents.capturePage({
      x: width * 0.8,
      y: 0,
      width,
      height,
    });
  });
  ipcMain.handle('quitApp', () => {
    return Promise.resolve(app.quit());
  });
};

module.exports = setupIPCHandlers;
