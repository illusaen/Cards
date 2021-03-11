import ElectronStore from 'electron-store';

import { TRootState } from '../redux/reducers';

type TPartialRootState = Partial<TRootState>;
const electronStore = new ElectronStore<TPartialRootState>({ cwd: 'cards' });

const subset = (state: TRootState, whitelist: string[]) => 
  Object.fromEntries(
    Object.entries(state)
      .filter(([k,]) => whitelist.includes(k))
  );

export const load = (key: string): string => {
  const EMPTY_JSON = '{}';
  try {
    return <string>electronStore.get(key, EMPTY_JSON);
  } catch (error) {
    console.log(`Error reading from localstorage: ${error}`)
    return EMPTY_JSON;
  }
};

export const save = (key: string, whitelist: string[], state: TRootState): void => {
  try {
    const serializedState = JSON.stringify(subset(state, whitelist));
    electronStore.set(key, serializedState);
  } catch (error) {
    console.log(`Error writing to localstorage: ${error}`);
  }
};
