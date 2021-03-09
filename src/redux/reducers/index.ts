import { combineReducers } from 'redux';

import { usersReducer } from './user';
import { discardReducer, stackReducer } from './game';

export const rootReducer = combineReducers({ users: usersReducer, discard: discardReducer, stack: stackReducer });
