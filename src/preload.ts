import Store from 'electron-store';
import type * as Redux from 'redux';
import { TPartialRootState } from './redux/reducers';

declare global {
  interface Window {
    getLogger: () => (Redux.Middleware | undefined);
    storage: Store;
  }
}

window.getLogger = (): (Redux.Middleware | undefined) => {
  console.log('|' + process.env.NODE_ENV + '|')
  if (process.env.NODE_ENV) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require('redux-logger');
    return logger;
  }
};

window.storage = new Store<TPartialRootState>();
