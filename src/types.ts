export enum ESuit {
  HEART = 1,
  DIAMOND,
  CLUB,
  SPADE,
}

export enum EFaceRank {
  JACK = 11,
  QUEEN,
  KING,
  ACE,
  JOKER,
}

export type TCardId = string;
export interface ICard {
  id: TCardId;
  suit: ESuit;
  rank: number;
  isNew: boolean;
}

export type TUserId = string;
export interface IUser {
  id: TUserId;
  name: string;
}

export interface IUserHand {
  id: TUserId;
  hand: TCardId[];
}

export interface IScore {
  player: TUserId;
  score: number;
}

export interface ICardRules {
  shuffleDiscard: boolean;
  cardsPerPlayer: number;
  decks: number;
}

export interface ICardState {
  deck: ICard[];
  discard: TCardId[];
  stack: TCardId[];
  hands: IUserHand[];
  rules: ICardRules;
}

export interface IPlayerState {
  players: IUser[];
}

export interface IScoreState {
  scores: IScore[];
}

export interface IGameState {
  running: boolean;
  rounds: number;
  turn: TUserId | undefined;
  order: TUserId[];
}
