import { TCardId, TUserId } from '../../types';
import { ActionType, createAction } from 'typesafe-actions';

const UserActions = {
  DRAW: 'DRAW_CARD',
  DISCARD: 'DISCARD_CARD',
  REORDER: 'REORDER_CARD',
};

export const draw = createAction(UserActions.DRAW)<number, { userId: TUserId }>();
export const discard = createAction(UserActions.DISCARD)<number, { userId: TUserId }>();
export const reorder = createAction(UserActions.REORDER)<{ card: TCardId, index: number }, { userId: TUserId }>();

export type TDrawAction = ActionType<typeof draw>;
export type TDiscardAction = ActionType<typeof discard>;
export type TReorderAction = ActionType<typeof reorder>;
