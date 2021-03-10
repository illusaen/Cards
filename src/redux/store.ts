import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { rootReducer } from './reducers';

const PERSIST_KEY = 'root';
const PERSIST_WHITELIST = ['settings'];

export const STORE_SCOPES = {
  MAIN: 'MAIN',
  RENDERER: 'RENDERER',
};

export const configureStore = (scope = STORE_SCOPES.MAIN) => {
  const middlewares = [];
  const logger = window.cards.logger && window.cards.logger();
  if (logger) {
    middlewares.push(logger);
  }

  const loadedState = window.cards.storage.load(PERSIST_KEY);
  let persistedState = {};
  try {
    persistedState = JSON.parse(loadedState);
  } catch (error) {
    console.log(`Parsing localstorage key "${PERSIST_KEY}" failed with ${error}.`);
  }

  const composeEnhancers = (scope === STORE_SCOPES.RENDERER && window.cards.isDevelopment) ?
    composeWithDevTools({ trace: true }) : compose;
  const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(...middlewares)));

  store.subscribe(() => window.cards.storage.save(PERSIST_KEY, PERSIST_WHITELIST, store.getState()));

  return store;
};
