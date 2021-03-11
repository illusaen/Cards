import { createReducer } from 'typesafe-actions';

import { IGameState, TUserId } from '../../types';
import * as gameActions from '../actions/game';

const initialGame: IGameState = {
  running: false,
  rounds: 0,
  turn: undefined,
  order: [],
};

const next = (order: TUserId[], current: TUserId | undefined) => {
  if (current === undefined) {
    return order[0];
  }

  const index = order.findIndex(el => el === current);
  return index < 0 ? current : order[(index + 1) % order.length];
};

export const gameReducer = createReducer(initialGame)
  .handleAction(gameActions.startGame, (state: IGameState) => ({ ...state, running: true }))
  .handleAction(gameActions.endGame, (state: IGameState) => ({ ...state, running: false }))
  .handleAction(gameActions.nextPlayer, (state: IGameState) => state.order.length ? { ...state, turn: next(state.order, state.turn) } : state)
  .handleAction(gameActions.startRound, (state: IGameState) => ({ ...state, rounds: state.rounds + 1 }));
