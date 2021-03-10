import React from 'react';
import {ICard} from '../types';

export const Card = ({ suit, rank }: ICard): JSX.Element => {
  return (
    <div>
      `Card ${suit} ${rank}`
    </div>
  );
};
