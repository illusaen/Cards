import { ICard, TUserHash } from '../../types';
import { ActionType, createAction, createCustomAction } from 'typesafe-actions';

const UserActions = {
  DRAW: 'USER_DRAW_CARD',
  DISCARD: 'USER_DISCARD_CARD',
  REORDER: 'USER_REORDER_CARDS',
};

export const draw = createCustomAction(UserActions.DRAW, (userHash: TUserHash): { meta: { user: TUserHash, card: ICard | null }} => ({ meta: { user: userHash, card: null } }));
export const discard = createAction(UserActions.DISCARD)<number, { user: TUserHash }>();
export const reorder = createAction(UserActions.REORDER)<{ card: ICard, index: number }, { user: TUserHash }>();

export type TDrawAction = ActionType<typeof draw>;
export type TDiscardAction = ActionType<typeof discard>;
export type TReorderAction = ActionType<typeof reorder>;
