import { app, BrowserWindow, session } from 'electron';
import path from 'path';
import windowStateKeeper from 'electron-window-state';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

import { isDevelopment } from '../utils';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const setCSP = () => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'none\'; img-src \'self\' static:; script-src \'self\'; style-src \'self\'; connect-src \'self\''],
      }
    });
  });
}

const registerStaticDataProtocol = () => {
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
}

export const createWindow = (): void => {
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

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
  }

  // TODO: Fix this so it works with devtools.
  // setCSP();
  registerStaticDataProtocol();
};