import { createReducer } from 'typesafe-actions';

import { ICard, IUser, TUserHash } from '../../types';
import * as userActions from '../actions/user';

const updateUser = (state: IUser[], userId: TUserHash, withHand: ((hand: ICard[]) => ICard[])) => {
  const index = state.findIndex(u => u.id === userId);
  if (index < 0 || index >= state.length) {
    return state;
  }

  const newUser = { ...state[index], hand: withHand(state[index].hand) };
  return [...state].splice(index, 1, newUser);
};

export const usersReducer = createReducer([])
  .handleAction(userActions.draw, (state: IUser[], action: userActions.TDrawAction) => updateUser(
    state,
    action.meta.user,
    (hand) => [...hand, action.meta.card].flatMap(c => c ? [c] : [])
  ))
  .handleAction(userActions.discard, (state: IUser[], action: userActions.TDiscardAction) => updateUser(
    state,
    action.meta.user,
    (hand) => {
      const newHand = [...hand];
      return newHand.splice(action.payload, 1);
    }
  ));
