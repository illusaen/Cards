import { app, BrowserWindow, session } from 'electron';
import windowStateKeeper from 'electron-window-state';
import path from 'path';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Load previous window state.
  const mainWindowState = windowStateKeeper({ defaultWidth: 1000, defaultHeight: 800 });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    height: mainWindowState.height,
    width: mainWindowState.width,
    webPreferences: { contextIsolation: true }
  });

  // Registers listeners on the window so state is automatically updated.
  mainWindowState.manage(mainWindow);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (process.env.NODE_ENV) {
    mainWindow.webContents.openDevTools();
    installExtension(REDUX_DEVTOOLS);
  }

  session.defaultSession.protocol.registerFileProtocol(
    'static',
    (request, callback) => {
      const fileURL = request.url.replace('static://', '');
      const filePath = path.join(
        app.getAppPath(),
        `./webpack/images`,
        fileURL
      );
      callback(filePath);
    }
  );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
