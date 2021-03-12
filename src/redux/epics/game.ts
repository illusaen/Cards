import { Action } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import actions from '../actions';
import { TRootState } from '../reducers';

const { dealCards, startGame } = actions;

export const startGameEpic: Epic<Action, Action, TRootState> = (action$, state$) => action$.pipe(
  filter(startGame.match),
  withLatestFrom(state$),
  map(([, state]) => dealCards(state.players.map(player => player.id)))
);
