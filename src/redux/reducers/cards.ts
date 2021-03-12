import { deck, deal, shuffle } from './utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICardState, TCardId, TUserId } from '../../types';
import { startGame } from '../actions/shared';

const fillStack = (state: ICardState, drawn: number): void => {
  if (drawn <= state.stack.length) {
    return;
  }

  state.stack.concat(state.discard.reverse());
  if (state.rules.shuffleDiscard) {
    shuffle(state.stack);
  }
  state.discard = [];
}

const initialCardsState: ICardState = {
  deck: [],
  discard: [],
  stack: [],
  hands: [],
  rules: {
    shuffleDiscard: false,
    cardsPerPlayer: 8,
    decks: 1
  },
};

const cardsSlice = createSlice({
  name: 'CARDS',
  initialState: initialCardsState,
  reducers: {
    drawCard: {
      reducer: (state, action: PayloadAction<number, string, TUserId>) => {
        const { meta, payload } = action;
        fillStack(state, payload);
        const index = state.hands.findIndex(u => u.id === meta);
        if (index < 0) {
          return;
        }

        const removed = state.stack.splice(0, payload);
        state.hands[index].hand.push(...removed);
      },
      prepare: (count: number, userId: TUserId) => ({
        payload: count,
        meta: userId
      }),
    },

    discardCard: {
      reducer: (state, action: PayloadAction<number, string, TUserId>) => {
        const { meta, payload } = action;
        const index = state.hands.findIndex(u => u.id === meta);
        if (index < 0) {
          return;
        }

        const [removed] = state.hands[index].hand.splice(payload, 1);
        state.discard.push(removed);
      },
      prepare: (index: number, userId: TUserId) => ({
        payload: index,
        meta: userId,
      }),
    },

    reorderCard: {
      reducer: (state, action: PayloadAction<{ card: TCardId, index: number }, string, TUserId>) => {
        const { meta, payload } = action;
        const index = state.hands.findIndex(u => u.id === meta);
        if (index < 0) {
          return;
        }

        const currentCardIndex = state.hands[index].hand.findIndex(el => el === payload.card);
        if ( currentCardIndex < 0) {
          return;
        }

        const [removed] = state.hands[index].hand.splice(currentCardIndex, 1);
        state.hands[index].hand.splice(payload.index, 0, removed);
      },
      prepare: (card: TCardId, index: number, userId: TUserId) => ({
        payload: { card, index },
        meta: userId,
      }),
    },

    dealCards: (state, action: PayloadAction<TUserId[]>) => {
      const { payload } = action;
      state.deck = deck(state.rules.decks);
      if (! payload.length) {
        state.stack = state.deck.map(card => card.id);
        return;
      }

      const { stack, hands } = deal(state.deck, payload, state.rules.cardsPerPlayer);
      state.stack = stack;
      state.hands = hands;
    },
  },

  extraReducers: builder => {
    builder.addCase(startGame, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialCardsState;
    });
  }
});

export const { drawCard, discardCard, reorderCard, dealCards } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
