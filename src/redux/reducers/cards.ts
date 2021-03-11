import { shuffle } from '../../components/utils';
import { createReducer } from 'typesafe-actions';

import { ICardState, IUserHand, TCardId, TUserId } from '../../types';
import * as userActions from '../actions/cards';
import type * as TUserAction from '../actions/cards';

const updateUser = (state: IUserHand[], userId: TUserId, withHand: ((hand: TCardId[]) => TCardId[])) => {
  const index = state.findIndex(u => u.id === userId);
  if (index < 0) {
    return state;
  }

  const newUserHand: IUserHand = { ...state[index], hand: withHand(state[index].hand) };
  return [...state].splice(index, 1, newUserHand);
};

const initialCards: ICardState = {
  deck: [],
  discard: [],
  stack: [],
  hands: [],
  rules: { shuffleDiscard: false },
};

export const cardsReducer = createReducer(initialCards)
  .handleAction(userActions.draw, (state: ICardState, action: TUserAction.TDrawAction) => {
    const newStack = [...state.stack];
    if (action.payload > state.stack.length) {
      const discarded = state.discard.reverse();
      newStack.push(...(state.rules.shuffleDiscard ? shuffle(discarded) : discarded));
    }

    const newState = updateUser(
      state.hands,
      action.meta.userId,
      (hand) => [...hand, ...newStack.slice(0, action.payload - 1)]
    );
    newStack.splice(0, action.payload);

    return { ...newState, stack: newStack };
  })
  .handleAction(userActions.discard, (state: ICardState, action: TUserAction.TDiscardAction) => updateUser(
    state.hands,
    action.meta.userId,
    (hand) => [...hand.slice(0, action.payload), ...hand.slice(action.payload + 1)]
  ))
  .handleAction(userActions.reorder, (state: ICardState, action: TUserAction.TReorderAction) => updateUser(
    state.hands,
    action.meta.userId,
    (hand) => {
      const newHand = [...hand];
      const index = newHand.findIndex(el => el === action.payload.card);
      if (index < 0) {
        return hand;
      }

      const [removed] = newHand.splice(index, 1);
      newHand.splice(action.payload.index, 0, removed);
      return newHand;
    }
  ));
