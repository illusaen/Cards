import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayerState, IUser } from '../../types';

const initialPlayersState: IPlayerState = [];

const playersSlice = createSlice({
  name: 'PLAYERS',
  initialState: initialPlayersState,
  reducers: {
    addPlayer(state, action: PayloadAction<IUser>) {
      state.push(action.payload);
    },

    removePlayer(state, action: PayloadAction<IUser>) {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index < 0) {
        return;
      }

      state.splice(index, 1);
    },
  }
});

export const { addPlayer, removePlayer } = playersSlice.actions;
export const playersReducer = playersSlice.reducer;
