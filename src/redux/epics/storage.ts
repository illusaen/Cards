import { Action } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { ignoreElements, tap, withLatestFrom } from 'rxjs/operators';

import { TRootState } from '../reducers';
import type { TServices } from '../store';

export const storageEpic: Epic<Action, Action, TRootState, TServices> = (action$, state$, { persist }) =>
  action$.pipe(
    withLatestFrom(state$),
    tap(([, state]) => { console.log("PERSISTING", state); persist(state) }),
    ignoreElements()
  );
