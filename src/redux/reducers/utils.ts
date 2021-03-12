import { ESuit, ICard, IUserHand, TCardId, TUserId } from '../../types';
import { nanoid } from '@reduxjs/toolkit';

export const shuffle = (cards: TCardId[]): void => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
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
    { suit: ESuit.HEART, rank, isNew, id: nanoid() },
    { suit: ESuit.DIAMOND, rank, isNew, id: nanoid() },
    { suit: ESuit.SPADE, rank, isNew, id: nanoid() },
    { suit: ESuit.CLUB, rank, isNew, id: nanoid() }
  ]);
  return deck(count - 1, [...result, ...single]);
};

export const deal = (deck: ICard[], players: TUserId[], cards: number): { stack: TCardId[], hands: IUserHand[] } => {
  // eslint-disable-next-line prefer-spread
  const result: IUserHand[] = players.map((id) => ({ id, hand: [] }));
  const stack: TCardId[] = [];
  const hands = deck.reduce((acc, current, index) => {
    const i = (index % players.length) - 1;
    if (acc[i].hand.length >= cards) {
      stack.push(current.id);
      return acc;
    }

    acc[i].hand.push(current.id);
    return acc;
  }, result);

  return { stack, hands };
};
