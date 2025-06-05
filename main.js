const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('chips', (request, callback) => {
    const url = request.url.substr(8); // remove 'chips://'
    callback({ path: path.normalize(__dirname + '/' + url) });
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.setAsDefaultProtocolClient('chips');

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
