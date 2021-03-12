import { app, BrowserWindow, session } from 'electron';
import path from 'path';
import windowStateKeeper from 'electron-window-state';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import ElectronStore from 'electron-store';

import { isDevelopment } from '../utils';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

ElectronStore.initRenderer();

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
    webPreferences: {
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  });

  // Registers listeners on the window so state is automatically updated.
  mainWindowState.manage(mainWindow);

  // Open the DevTools.
  if (isDevelopment) {
    // mainWindow.webContents.on('did-frame-finish-load', () => {
    //   mainWindow.webContents.once('devtools-opened', () => {
    //     mainWindow.focus();
    //   });
      mainWindow.webContents.openDevTools();
      installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
    // });
  }

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        // TODO: Fix this so it works with devtools.
        // 'Content-Security-Policy': ['default-src \'none\'; img-src \'self\'; script-src \'self\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\'; connect-src \'self\''],
      }
    });
  });

  session.defaultSession.protocol.registerFileProtocol(
    'static',
    (request, callback) => {
      const fileURL = request.url.replace('static://', '');
      const filePath = path.join(
        app.getAppPath(),
        `./.webpack/renderer`,
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
