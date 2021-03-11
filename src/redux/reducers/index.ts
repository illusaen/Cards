import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { cardsReducer } from './cards';
import { gameReducer } from './game';

export const rootReducer = combineReducers({ cards: cardsReducer, game: gameReducer });
export type TRootState = StateType<typeof rootReducer>;
