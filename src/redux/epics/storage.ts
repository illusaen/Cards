import { Action } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { distinctUntilChanged, ignoreElements, tap, withLatestFrom } from 'rxjs/operators';

import { TRootState } from '../reducers';
import type { TServices } from '../store';

export const storageEpic: Epic<Action, Action, TRootState, TServices> = (action$, state$, { isDeepStrictEqual, persist }) =>
  action$.pipe(
    withLatestFrom(state$),
    distinctUntilChanged(([, previous], [, current]) => isDeepStrictEqual(previous, current)),
    tap(([, state]) => { console.log(state); persist(state) }),
    ignoreElements()
  );
