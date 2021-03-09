import { UserHash } from '../../types';
import { createAction, createCustomAction } from 'typesafe-actions';

export const GameActions = {
  START: 'GAME_START',
  END: 'GAME_END',
  TURN_START: 'GAME_TURN_START',
  TURN_END: 'GAME_TURN_END',
  DEAL: 'GAME_DEAL',
}

export const startGame = createAction(GameActions.START)();
export const endGame = createAction(GameActions.END)();
export const startTurn = createCustomAction(GameActions.TURN_START, (userHash: UserHash) => ({ meta: userHash }));
export const endTurn = createCustomAction(GameActions.TURN_END, (userHash: UserHash) => ({ meta: userHash }));
export const deal = createAction(GameActions.DEAL)();
