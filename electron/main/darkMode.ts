import { ipcMain, nativeTheme } from 'electron';

export const handleDarkModeMessages = () => {
  ipcMain.handle('dark-mode:toggle', () => {
    nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('darkMode:system', () => {
    nativeTheme.themeSource = 'system';
  });
};
