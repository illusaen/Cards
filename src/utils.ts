import * as T from './types';

export const shuffle = (cards: T.Card[]): void => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
};

const CARDS_PER_SUIT = 13;
const SUIT_RANK_START = 2;
const CARD_NUMBERS = Array(CARDS_PER_SUIT).keys().map((el: number) => el + SUIT_RANK_START);
export const deck = (): T.Card[] => {
  return CARD_NUMBERS.flatMap((rank: number) => [
    { suit: T.Suit.HEART, rank },
    { suit: T.Suit.DIAMOND, rank },
    { suit: T.Suit.SPADE, rank },
    { suit: T.Suit.CLUB, rank }
  ]);
};

export const deal = (deck: T.Card[], players: number): [T.Card[]] => {
  // eslint-disable-next-line prefer-spread
  const result = Array.apply(null, Array(players)).map((): [] => []);
  return deck.reduce((acc, current, index) => {
    const i = (index % players) - 1;
    acc[i].push(current);
  }, result);
};
