import { shuffle } from '../../components/utils';
import { ActionType, createReducer } from 'typesafe-actions';

import { ICardState, IUserHand, TCardId, TUserId } from '../../types';
import * as userActions from '../actions/cards';

type UserAction = ActionType<typeof userActions>;
type ModifyHandFunction = (hand: TCardId[]) => TCardId[];

const updateUser = (hands: IUserHand[], userId: TUserId, modify: ModifyHandFunction): { hands: IUserHand[], userIndex: number } => {
  const index = hands.findIndex(u => u.id === userId);
  if (index < 0) {
    return { hands, userIndex: -1 };
  }

  const newUserHand: IUserHand = { ...hands[index], hand: modify(hands[index].hand) };
  return { hands: [...hands].splice(index, 1, newUserHand), userIndex: index };
};

const fillStack = (state: ICardState, drawn: number): ICardState => {
  if (drawn <= state.stack.length) {
    return { ...state };
  }

  const newStack = [...state.stack];
  const discarded = [...state.discard].reverse();
  newStack.push(...(state.rules.shuffleDiscard ? shuffle(discarded) : discarded));

  return { ...state, stack: newStack, discard: [] };
}

const reorderHand = (card: TCardId, index: number): ModifyHandFunction =>
  (hand) => {
    const newHand = [...hand];
    const currentIndex = newHand.findIndex(el => el === card);
    if (currentIndex < 0) {
      return hand;
    }

    const [removed] = newHand.splice(currentIndex, 1);
    newHand.splice(index, 0, removed);
    return newHand;
  };

const drawToHand = (stack: TCardId[], count: number): ModifyHandFunction =>
  (hand) => [...hand, ...stack.slice(0, count - 1)];

const discardFromHand = (index: number): ModifyHandFunction =>
  (hand) => [...hand.slice(0, index), ...hand.slice(index + 1)];

const initialCards: ICardState = {
  deck: [],
  discard: [],
  stack: [],
  hands: [],
  rules: { shuffleDiscard: false },
};

export const cardsReducer = createReducer<ICardState, UserAction>(initialCards)
  .handleAction([userActions.discard, userActions.draw], (state, { meta, payload, type }) => {
    const isDrawAction = type === userActions.UserActions.DRAW;
    const filledStackState = isDrawAction ? fillStack(state, payload) : { ...state };
    
    const { hands, userIndex } = updateUser(
      state.hands,
      meta,
      isDrawAction ? drawToHand(state.stack, payload) : discardFromHand(payload)
    );

    if (isDrawAction) {
      filledStackState.stack.splice(0, payload);
    } else {
      filledStackState.discard.push(state.hands[userIndex].hand[payload]);
    }
    
    return { ...filledStackState, hands };
  })
  .handleAction(userActions.reorder, (state, { meta, payload }) => ({
    ...state,
    hands: updateUser(
      state.hands,
      meta,
      reorderHand(payload.card, payload.index)
    ).hands
  }));
