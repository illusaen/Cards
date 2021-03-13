import { contextBridge } from 'electron';
import { isDeepStrictEqual } from 'util';

import { isDevelopment } from '../utils';
import { load, save } from './storage';

declare global {
  interface Window {
    cards: {
      isDevelopment: boolean;
      storage: {
        isDeepStrictEqual: typeof isDeepStrictEqual;
        load: typeof load;
        save: typeof save;
      };
    }
  }
}

contextBridge.exposeInMainWorld('cards', {
  isDevelopment,
  storage: { isDeepStrictEqual, load, save },
});
