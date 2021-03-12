import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { cardsReducer } from './cards';
import { gameReducer } from './game';
import { playersReducer } from './players';

export const rootReducer = combineReducers({ cards: cardsReducer, game: gameReducer, players: playersReducer });
export type TRootState = StateType<typeof rootReducer>;
