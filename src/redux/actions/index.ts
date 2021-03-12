import * as sharedActions from './shared';
import * as cards from '../reducers/cards';
import * as game from '../reducers/game';
import * as players from '../reducers/players';
import * as scores from '../reducers/scores';

/* eslint-disable @typescript-eslint/no-unused-vars */
const { cardsReducer, ...cardsActions } = cards;
const { gameReducer, ...gameActions } = game;
const { playersReducer, ...playersActions } = players;
const { scoresReducer, ...scoresActions } = scores;

export default { ...sharedActions, ...cardsActions, ...gameActions, ...playersActions, ...scoresActions };
