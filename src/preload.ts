import { contextBridge } from 'electron';
import ElectronStore from 'electron-store';
import type * as Redux from 'redux';

import { isDevelopment } from './shared';
import { TPartialRootState } from './redux/reducers';

declare global {
  interface Window {
    cards: {
      isDevelopment: boolean;
      storage: ElectronStore;
      logger: () => Redux.Middleware | undefined;
    }
  }
}

const logger = (): (Redux.Middleware | undefined) => {
  if (isDevelopment) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require('redux-logger');
    return logger;
  }
};

const storage = new ElectronStore<TPartialRootState>();
console.log(storage.get)
contextBridge.exposeInMainWorld('cards', {
  isDevelopment,
  logger,
  storage,
});
