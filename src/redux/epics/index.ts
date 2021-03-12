import { combineEpics, Epic } from 'redux-observable';
import { catchError } from 'rxjs/operators';

import { startGameEpic } from './game';
import { TRootAction } from '../actions';
import { TRootState } from '../reducers';

export const rootEpic: Epic<TRootAction, TRootAction, TRootState> = (action$, store$) =>
  combineEpics(startGameEpic)(action$, store$, {}).pipe(
    catchError((error, source) => {
      console.error(`Error: ${error}`);
      return source;
    })
  );
