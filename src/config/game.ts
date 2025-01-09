import {
  Combinations,
  Suit,
  Rank,
  type PayoutCombination,
  type PayoutTable,
} from '@/types/game';

export const COMBINATIONS: PayoutCombination[] = [
  { name: Combinations.ROYAL_FLUSH, baseMultiplier: 250 },
  { name: Combinations.STRAIGHT_FLUSH, baseMultiplier: 50 },
  { name: Combinations.FOUR_OF_A_KIND, baseMultiplier: 25 },
  { name: Combinations.FULL_HOUSE, baseMultiplier: 9 },
  { name: Combinations.FLUSH, baseMultiplier: 6 },
  { name: Combinations.STRAIGHT, baseMultiplier: 4 },
  { name: Combinations.THREE_OF_A_KIND, baseMultiplier: 3 },
  { name: Combinations.TWO_PAIRS, baseMultiplier: 2 },
  { name: Combinations.JACKS_OR_BETTER, baseMultiplier: 1 },
];

export const DEFAULT_USER_BALANCE = 0;

export const MIN_BET_SIZE = 1;

export const MAX_BET_SIZE = 5;

export const SUIT_SYMBOLS: Record<Suit, string> = {
  [Suit.Hearts]: '♥',
  [Suit.Diamonds]: '♦',
  [Suit.Clubs]: '♣',
  [Suit.Spades]: '♠',
};

export const RANK_WEIGHTS: Record<Rank, number> = {
  [Rank.Two]: 2,
  [Rank.Three]: 3,
  [Rank.Four]: 4,
  [Rank.Five]: 5,
  [Rank.Six]: 6,
  [Rank.Seven]: 7,
  [Rank.Eight]: 8,
  [Rank.Nine]: 9,
  [Rank.Ten]: 10,
  [Rank.Jack]: 11,
  [Rank.Queen]: 12,
  [Rank.King]: 13,
  [Rank.Ace]: 14,
};

export const RED_SUITS = [Suit.Hearts, Suit.Diamonds];

function generatePayoutTable(
  combinations: PayoutCombination[],
  maxBonus: number = 4000,
): PayoutTable {
  return combinations.map(({ name, baseMultiplier }) => {
    const payouts = [];

    for (let bet = 1; bet <= 5; bet++) {
      if (name === Combinations.ROYAL_FLUSH && bet === 5) {
        payouts.push(maxBonus);
      } else {
        payouts.push(baseMultiplier * bet);
      }
    }

    return {
      combination: name,
      payouts,
    };
  });
}

export const PAYOUT_TABLE = generatePayoutTable(COMBINATIONS);
