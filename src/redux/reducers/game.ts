import { createSlice } from '@reduxjs/toolkit';

import { IGameState, TUserId } from '../../types';
import { startGame } from '../actions/shared';

const initialGameState: IGameState = {
  running: false,
  rounds: 0,
  turn: undefined,
  order: [],
};

const next = (order: TUserId[], current: TUserId | undefined) => {
  if (current === undefined) {
    return order[0];
  }

  const index = order.findIndex(el => el === current);
  return index < 0 ? current : order[(index + 1) % order.length];
};

const gameSlice = createSlice({
  name: 'GAME',
  initialState: initialGameState,
  reducers: {
    endGame(state) {
      state.running = false;
    },

    nextPlayer(state) {
      if (state.order.length) {
        state.turn = next(state.order, state.turn);
      }
    },

    startRound(state) {
      state.rounds++;
    },
  },
  extraReducers: builder => {
    builder.addCase(startGame, (state) => { state.running = true });
  }
});

export const { endGame, nextPlayer, startRound } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
