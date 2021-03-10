import Store from 'electron-store';
import type * as Redux from 'redux';

import { isDevelopment } from './shared';
import { TPartialRootState } from './redux/reducers';

declare global {
  interface Window {
    getLogger: () => (Redux.Middleware | undefined);
    storage: Store;
    isDevelopment: boolean;
  }
}

window.isDevelopment = isDevelopment;

window.getLogger = (): (Redux.Middleware | undefined) => {
  if (window.isDevelopment) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require('redux-logger');
    return logger;
  }
};


// window.storage = new Store<TPartialRootState>();
