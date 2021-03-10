import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { rootReducer, TPartialRootState, TRootState } from './reducers';

const subset = (state: TRootState, whitelist: string[]) => 
  Object.fromEntries(
    Object.entries(state)
      .filter(([k,]) => whitelist.includes(k))
  );

const loadState = (key: string): TPartialRootState | undefined => {
  try {
    if (!window.storage) {
      throw "Storage not available.";
    }
    
    const serializedState = <string>window.storage.get(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.log(`Error reading from localstorage: ${error}`)
    return undefined;
  }
};

const saveState = (key: string, whitelist: string[], state: TRootState) => {
  try {
    const serializedState = JSON.stringify(subset(state, whitelist));
    if (!window.storage) {
      throw "Storage not available.";
    }

    window.storage.set(key, serializedState);
  } catch (error) {
    console.log(`Error writing to localstorage: ${error}`)
  }
};

const PERSIST_KEY = 'root';
const PERSIST_WHITELIST = ['settings'];

export const STORE_SCOPES = {
  MAIN: 'MAIN',
  RENDERER: 'RENDERER',
};

export const configureStore = (scope = STORE_SCOPES.MAIN) => {
  const middlewares = [];
  const logger = window.getLogger && window.getLogger();
  if (logger) {
    middlewares.push(logger);
  }

  const persistedState = loadState(PERSIST_KEY);
  const composeEnhancers = (scope === STORE_SCOPES.RENDERER && process.env.NODE_ENV) ?
    composeWithDevTools({ trace: true }) : compose;
  const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(...middlewares)));

  store.subscribe(() => saveState(PERSIST_KEY, PERSIST_WHITELIST, store.getState()));

  return store;
};
