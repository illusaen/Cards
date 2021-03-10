import { applyMiddleware, compose, createStore } from 'redux';

import { rootReducer } from './reducers';
import * as T from '../types';

const loadState = (key: string) => {
  try {
    if (!window.storage) {
      throw "Storage not available.";
    }
    
    const serializedState = window.storage.get(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.log(`Error reading from localstorage: ${error}`)
    return undefined;
  }
};

const saveState = (key: string, whitelist: string[], state: T.RootState) => {
  try {
    const saved = whitelist.length ? Object.keys(state).filter((key: string) => whitelist.includes(key)).map((key: string) => ({ [key]: state[key] })) : state;
    const serializedState = JSON.stringify(saved);
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
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) : compose;
  const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(...middlewares)));

  store.subscribe(() => saveState(PERSIST_KEY, PERSIST_WHITELIST, store.getState()));

  return store;
};
