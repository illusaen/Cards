import { CardType, UserHash } from '../../types';
import { createAction, createCustomAction } from 'typesafe-actions';

export const UserActions = {
  DRAW: 'USER_DRAW_CARD',
  DISCARD: 'USER_DISCARD_CARD',
  REORDER: 'USER_REORDER_CARDS',
}

export const draw = createCustomAction(UserActions.DRAW, (userHash: UserHash) => ({ meta: { user: userHash, card: null } }));
export const discard = createAction(UserActions.DISCARD)<number, { user: UserHash }>();
export const reorder = createAction(UserActions.REORDER)<{ card: CardType, index: number }, { user: UserHash }>();
