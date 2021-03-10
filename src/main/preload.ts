import { contextBridge } from 'electron';
import type * as Redux from 'redux';

import { isDevelopment } from './utils';
import { load, save } from './storage';
import { TRootState } from '../redux/reducers';

declare global {
  interface Window {
    cards: {
      isDevelopment: boolean;
      storage: {
        load: (key: string) => string;
        save: (key: string, whitelist: string[], state: TRootState) => void;
      };
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

contextBridge.exposeInMainWorld('cards', {
  isDevelopment,
  logger,
  storage: { load, save },
});
