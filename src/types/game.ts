export enum Combinations {
  JACKS_OR_BETTER = 'Валеты и выше',
  TWO_PAIRS = 'Две пары',
  THREE_OF_A_KIND = 'Тройки',
  STRAIGHT = 'Стрит',
  FLUSH = 'Флеш',
  FULL_HOUSE = 'Фулл-хаус',
  FOUR_OF_A_KIND = 'Каре',
  STRAIGHT_FLUSH = 'Стрит-флеш',
  ROYAL_FLUSH = 'Флеш-рояль',
}

export type PayoutCombination = {
  name: Combinations;
  baseMultiplier: number;
};

export type PayoutTable = {
  combination: Combinations;
  payouts: number[];
}[];

export enum Suit {
  Hearts = 'Hearts',
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
  Spades = 'Spades',
}

export enum Rank {
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
  Ace = 'A',
}

export type Card = {
  suit: Suit;
  symbol: string;
  rank: Rank;
  weight: number;
  isRed?: boolean;
  isFaceUp?: boolean;
};

export type EnhancedCard = {
  card: Card;
  isHeld?: boolean;
  isInCombination?: boolean;
};

export enum GamePhase {
  MAIN = 'main',
  DOUBLE = 'double',
}

export type LogItem = {
  message: string;
  value: string | number;
};
