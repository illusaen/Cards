import { TRootState } from './reducers';

export const isGameRunning = (state: TRootState): boolean => state.game.running;
