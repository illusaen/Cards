import { contextBridge, ipcRenderer, nativeTheme } from 'electron';
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
      darkMode: {
        toggle: (mode: ValidDarkModeMessages) => void;
        setting: string;
      },
    }
  }
}

type ValidDarkModeMessages = 'toggle' | 'system';

contextBridge.exposeInMainWorld('cards', {
  isDevelopment,
  storage: { isDeepStrictEqual, load, save },
  darkMode: {
    toggle: (mode: ValidDarkModeMessages) => ipcRenderer.invoke(`dark-mode:${mode}`),
    setting: nativeTheme && nativeTheme.themeSource || 'light',
  },
});
