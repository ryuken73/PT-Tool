// const { ipcMain, app, BrowserWindow, desktopCapturer } = require('electron');
const { ipcMain, app, dialog, screen, BrowserWindow } = require('electron');
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
  ipcMain.handle('dialog', (event, method, params) => {
    return dialog[method](params);
  });
  ipcMain.handle('captureScreen', (event, docWidth) => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow === null) return;
    const [width, height] = currentWindow.getSize();
    // eslint-disable-next-line consistent-return
    const captureX = width - (2 * docWidth);
    const captureWidth = docWidth;
    const primaryDisplay = screen.getPrimaryDisplay();
    const { scaleFactor } = primaryDisplay;
    // console.log('%%%', docWidth, captureX, captureWidth, height, scaleFactor);
    return currentWindow.webContents.capturePage({
      x: parseInt(captureX),
      y: 0,
      width: parseInt(captureWidth),
      height: height * scaleFactor,
      // x: width * 0.5,
      // y: 0,
      // width,
      // height,
    });
  });
  ipcMain.handle('openDevTools', () => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    currentWindow.webContents.openDevTools();
  });
  ipcMain.handle('getAppVersion', () => {
    return app.getVersion();
  });
  ipcMain.handle('quitApp', () => {
    return Promise.resolve(app.quit());
  });
};

module.exports = setupIPCHandlers;
