export type TCardSuit = number;

export const Suit = Object.freeze({
  HEART: 1,
  DIAMOND: 2,
  CLUB: 3,
  SPADE: 4,
});

export interface ICard {
  suit: TCardSuit;
  rank: number;
  isNew: boolean;
}

export type TUserHash = string;
export interface IUser {
  name: string;
  id: TUserHash;
  isCurrent: boolean;
  hand: ICard[];
}

export interface IPlayer {
  id: TUserHash;
  points: number;
}
