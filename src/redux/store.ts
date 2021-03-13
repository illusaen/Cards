import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic } from './epics';
import { rootReducer, TRootState } from './reducers';
import { isDevelopment } from '../../electron/utils';

export const STORE_SCOPES = {
  MAIN: 'MAIN',
  RENDERER: 'RENDERER',
};

export type TServices = {
  isDeepStrictEqual: typeof window.cards.storage.isDeepStrictEqual;
  persist: typeof window.cards.storage.save;
}

export const rendererStore = (() => {
  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, TRootState, TServices>({
    dependencies: {
      isDeepStrictEqual: window.cards.storage.isDeepStrictEqual,
      persist: window.cards.storage.save,
    },
  });
  const middlewares = [epicMiddleware];
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(middlewares),
    preloadedState: window.cards.storage.load(),
    devTools: isDevelopment,
  });

  epicMiddleware.run(rootEpic);

  return store;
})();

export type TAppDispatch = typeof rendererStore.dispatch;