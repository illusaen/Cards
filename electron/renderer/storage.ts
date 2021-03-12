import ElectronStore from 'electron-store';

import { TRootState } from '../../src/redux/reducers';

export type TPartialRootState = Partial<TRootState>;
const electronStore = new ElectronStore<TPartialRootState>({ cwd: 'cards' });

const PERSIST_KEY = 'root';
const PERSIST_WHITELIST = ['cards'];

const subset = (state: TRootState, whitelist: string[]) => 
  Object.fromEntries(
    Object.entries(state)
      .filter(([k,]) => whitelist.includes(k))
  );

export const load = (): TPartialRootState => {
  try {
    const loaded = <string>electronStore.get(PERSIST_KEY, '{}');
    return JSON.parse(loaded);
  } catch (error) {
    console.log(`Error reading from localstorage: ${error}`)
    return {};
  }
};

export const save = (state: TRootState): void => {
  try {
    const serializedState = JSON.stringify(subset(state, PERSIST_WHITELIST));
    electronStore.set(PERSIST_KEY, serializedState);
  } catch (error) {
    console.log(`Error writing to localstorage: ${error}`);
  }
};
