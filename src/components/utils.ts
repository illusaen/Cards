import { ESuit, ICard, IUserHand, TCardId, TUserId } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const shuffle = (cards: TCardId[]): TCardId[] => {
  const newCards = [...cards];
  for (let i = newCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
  }
  return newCards;
};

const CARDS_PER_SUIT = 13;
const SUIT_RANK_START = 2;
const CARD_NUMBERS = Array.from(Array(CARDS_PER_SUIT).keys()).map((el: number) => el + SUIT_RANK_START);
export const deck = (count: number, result: ICard[] = []): ICard[] => {
  if (count <= 0) {
    return result;
  }

  const isNew = false;
  const single = CARD_NUMBERS.flatMap((rank: number) => [
    { suit: ESuit.HEART, rank, isNew, id: uuidv4() },
    { suit: ESuit.DIAMOND, rank, isNew, id: uuidv4() },
    { suit: ESuit.SPADE, rank, isNew, id: uuidv4() },
    { suit: ESuit.CLUB, rank, isNew, id: uuidv4() }
  ]);
  return deck(count - 1, [...result, ...single]);
};

export const deal = (deck: ICard[], players: TUserId[], cards: number): IUserHand[] => {
  // eslint-disable-next-line prefer-spread
  const result: IUserHand[] = players.map((id) => ({ id, hand: [] }));
  return deck.reduce((acc, current, index) => {
    const i = (index % players.length) - 1;
    if (acc[i].hand.length >= cards) {
      return acc;
    }

    acc[i].hand.push(current.id);
    return acc;
  }, result);
};
