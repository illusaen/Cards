import { createReducer } from 'typesafe-actions';

import { IGameState, TUserId } from '../../types';
import { TRootAction } from '../actions';
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

export const gameReducer = createReducer<IGameState, TRootAction>(initialGame)
    .handleAction(
      [gameActions.startGame, gameActions.endGame, gameActions.nextPlayer, gameActions.startRound, gameActions.endRound],
      (state, { type }) => {
        const { GameActions } = gameActions;
        switch (type) {
          case GameActions.START:
            return { ...state, running: true };
          case GameActions.END:
            return { ...state, running: false };
          case GameActions.NEXT_PLAYER:
            return state.order.length ? { ...state, turn: next(state.order, state.turn) } : state;
          case GameActions.ROUND_START:
            return { ...state, rounds: state.rounds + 1 };
        }
      });