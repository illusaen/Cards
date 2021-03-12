import { TCardId, TUserId } from '../../types';
import { createAction } from 'typesafe-actions';

export const CardActions = {
  DRAW: 'DRAW_CARD',
  DISCARD: 'DISCARD_CARD',
  REORDER: 'REORDER_CARD',
};

export const draw = createAction(
  CardActions.DRAW,
  (count: number, { }: TUserId) => count,
  ({ }: number, userId: TUserId) => userId
)<number, TUserId>();

export const discard = createAction(
  CardActions.DISCARD,
  (index: number, { }: TUserId) => index,
  ({ }: number, userId: TUserId) => userId
)<number, TUserId>();

export const reorder = createAction(
  CardActions.REORDER,
  (card: TCardId, index: number, { }: TUserId) => ({ card, index }),
  ({ }: TCardId, { }: number, userId: TUserId) => userId
)<{ card: TCardId, index: number }, TUserId>();
