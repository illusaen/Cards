import React from 'react';
import {CardType} from '../types';

export const Card = ({ suit, rank }: CardType): JSX.Element => {
  return (
    <div>
      `Card ${suit} ${rank}`
    </div>
  );
};
