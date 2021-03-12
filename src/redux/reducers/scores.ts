import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IScoreState, TUserId } from '../../types';
import { startGame } from '../actions/shared';

const initialScoresState: IScoreState = [];

const scoresSlice = createSlice({
  name: 'SCORES',
  initialState: initialScoresState,
  reducers: {
    raiseScore: {
      reducer: (state, action: PayloadAction<number, string, TUserId>) => {
        const { meta, payload } = action;
        const playerScore = state.find(s => s.player === meta);
        if (! playerScore) {
          return;
        }

        playerScore.score += payload;
      },
      prepare: (points: number, userId: TUserId) => ({
        payload: points,
        meta: userId,
      }),
    },

    lowerScore: {
      reducer: (state, action: PayloadAction<number, string, TUserId>) => {
        const { meta, payload } = action;
        const playerScore = state.find(s => s.player === meta);
        if (! playerScore) {
          return;
        }

        playerScore.score -= payload;
      },
      prepare: (points: number, userId: TUserId) => ({
        payload: points,
        meta: userId,
      })
    },
  },
  extraReducers: builder => {
    builder.addCase(startGame, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialScoresState;
    });
  }
});

export const { raiseScore, lowerScore } = scoresSlice.actions;
export const scoresReducer = scoresSlice.reducer;
