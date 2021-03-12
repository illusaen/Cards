import { contextBridge } from 'electron';

import { isDevelopment } from '../utils';
import { load, save, TPartialRootState } from './storage';
import { TRootState } from '../../src/redux/reducers';

declare global {
  interface Window {
    cards: {
      isDevelopment: boolean;
      storage: {
        load: () => TPartialRootState;
        save: (state: TRootState) => void;
      };
    }
  }
}

contextBridge.exposeInMainWorld('cards', {
  isDevelopment,
  storage: { load, save },
});
