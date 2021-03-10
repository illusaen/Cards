import { ICard, Suit } from './types';

export const shuffle = (cards: ICard[]): void => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
};

const CARDS_PER_SUIT = 13;
const SUIT_RANK_START = 2;
const CARD_NUMBERS = Array.from(Array(CARDS_PER_SUIT).keys()).map((el: number) => el + SUIT_RANK_START);
export const deck = (): ICard[] => {
  const isNew = false;
  return CARD_NUMBERS.flatMap((rank: number) => [
    { suit: Suit.HEART, rank, isNew },
    { suit: Suit.DIAMOND, rank, isNew },
    { suit: Suit.SPADE, rank, isNew },
    { suit: Suit.CLUB, rank, isNew }
  ]);
};

export const deal = (deck: ICard[], players: number): ICard[][] => {
  // eslint-disable-next-line prefer-spread
  const result: ICard[][] = Array.apply(null, Array(players)).map((): [] => []);
  return deck.reduce((acc, current, index) => {
    const i = (index % players) - 1;
    acc[i].push(current);
    return acc;
  }, result);
};
