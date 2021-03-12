import { Epic, ofType } from 'redux-observable';
import { map, withLatestFrom } from 'rxjs/operators';

import { TRootAction } from '../actions';
import { deal, GameActions } from '../actions/game';
import { TRootState } from '../reducers';

export const startGameEpic: Epic<TRootAction, TRootAction, TRootState> = (action$, state$) => action$.pipe(
  ofType(GameActions.START),
  withLatestFrom(state$),
  map(([, state]) => deal(state.players))
);
