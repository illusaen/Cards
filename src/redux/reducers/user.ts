import { ActionType, createReducer } from 'typesafe-actions';

import * as T from '../../types';
import * as userActions from '../actions/user';

export type UserAction = ActionType<typeof userActions>;

const updateUser = (state: T.UserState[], userId: T.UserHash, withHand: ((hand: T.CardType[]) => T.CardType[])) => {
  const index = state.findIndex(u => u.id === userId);
  if (index < 0 || index >= state.length) {
    return state;
  }

  const newUser = { ...state[index], hand: withHand(state[index].hand) };
  return [...state].splice(index, 1, newUser);
};

export const usersReducer = createReducer([])
  .handleAction(userActions.draw, (state: T.UserState[], action: UserAction) => updateUser(
    state,
    action.meta.user,
    (hand) => [...hand, action.meta.card].flatMap(c => c ? [c] : [])
  ))
  .handleAction(userActions.discard, (state: T.UserState[], action: UserAction) => updateUser(
    state,
    action.meta.user,
    (hand) => {
      const newHand = [...hand];
      return newHand.splice(action.payload, 1);
    }
  ));
