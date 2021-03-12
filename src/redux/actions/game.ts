import { createAction } from 'typesafe-actions';
import { TUserId } from '../../types';

export const GameActions = {
  START: 'GAME_START',
  END: 'GAME_END',
  NEXT_PLAYER: 'NEXT_PLAYER_TURN',
  ROUND_START: 'ROUND_START',
  ROUND_END: 'ROUND_END',
  DEAL: 'DEAL',
}

export const startGame = createAction(GameActions.START)();
export const endGame = createAction(GameActions.END)();
export const nextPlayer = createAction(GameActions.NEXT_PLAYER)();
export const startRound = createAction(GameActions.ROUND_START)();
export const endRound = createAction(GameActions.ROUND_END)();
export const deal = createAction(GameActions.DEAL)<TUserId[]>();
