import { combineReducers } from 'redux';

import { cardsReducer } from './cards';
import { gameReducer } from './game';
import { playersReducer } from './players';
import { scoresReducer } from './scores';

export const rootReducer = combineReducers({
  cards: cardsReducer,
  game: gameReducer,
  players: playersReducer,
  scores: scoresReducer,
});
export type TRootState = ReturnType<typeof rootReducer>;