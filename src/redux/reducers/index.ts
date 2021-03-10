import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { usersReducer } from './user';
// import { discardReducer, stackReducer } from './game';

export const rootReducer = combineReducers({ users: usersReducer });
export type TRootState = StateType<typeof rootReducer>;
export type TPartialRootState = Partial<TRootState>;
