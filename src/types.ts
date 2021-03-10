export type CardSuit = number;

export const Suit = Object.freeze({
  HEART: 1,
  DIAMOND: 2,
  CLUB: 3,
  SPADE: 4,
});

export interface CardType {
  suit: CardSuit;
  rank: number;
  new: boolean;
}

export type UserHash = string;
export interface UserState {
  name: string;
  id: UserHash;
  isCurrent: boolean;
  hand: CardType[];
}

export type DiscardState = CardType[];
export type StackState = CardType[];

export interface Player {
  id: UserHash;
  points: number;
}

export interface GameState {
  discard: DiscardState;
  stack: StackState;
  players: Player[]
}

export interface RootState {
  user: UserState;
  game: GameState;
}
