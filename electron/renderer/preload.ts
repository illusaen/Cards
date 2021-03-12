import { contextBridge } from 'electron';

import { isDevelopment } from '../utils';
import { load, save } from './storage';
import { TRootState } from '../../src/redux/reducers';

declare global {
  interface Window {
    cards: {
      isDevelopment: boolean;
      storage: {
        load: (key: string) => string;
        save: (key: string, whitelist: string[], state: TRootState) => void;
      };
    }
  }
}

contextBridge.exposeInMainWorld('cards', {
  isDevelopment,
  storage: { load, save },
});
