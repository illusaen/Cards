import { ActionType } from 'typesafe-actions';

import * as cardActions from './cards';
import * as gameActions from './game';

export const actions = { ...cardActions, ...gameActions };
export type TRootAction = ActionType<typeof actions>;