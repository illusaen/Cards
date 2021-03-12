import { Action } from '@reduxjs/toolkit';
import { combineEpics, Epic } from 'redux-observable';
import { catchError } from 'rxjs/operators';

import { startGameEpic } from './game';
import { TRootState } from '../reducers';
import { storageEpic } from './storage';

export const rootEpic: Epic<Action, Action, TRootState> = (action$, store$, dependencies) =>
  combineEpics(startGameEpic, storageEpic)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(`Error: ${ error }`);
      return source;
    })
  );