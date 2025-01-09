import { describe, it, expect } from 'vitest';
import { Combinations, Suit, Rank, type EnhancedCard } from '@/types/game';
import { generateCard, getCombination, printHand } from '@/helpers/game';

const TEST_HAND_ERROR: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Ten) },
  { card: generateCard(Suit.Spades, Rank.Ten) },
  { card: generateCard(Suit.Diamonds, Rank.Two) },
  { card: generateCard(Suit.Hearts, Rank.Three) },
];

const TEST_HAND_NULL: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Ten) },
  { card: generateCard(Suit.Spades, Rank.Ten) },
  { card: generateCard(Suit.Diamonds, Rank.Two) },
  { card: generateCard(Suit.Hearts, Rank.Three) },
  { card: generateCard(Suit.Hearts, Rank.Four) },
];

const TEST_HAND_NO_STRAIGHT: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Eight) },
  { card: generateCard(Suit.Spades, Rank.Nine) },
  { card: generateCard(Suit.Diamonds, Rank.Ten) },
  { card: generateCard(Suit.Hearts, Rank.King) },
  { card: generateCard(Suit.Clubs, Rank.Jack) },
];

const TEST_HAND_NO_FLUSH: EnhancedCard[] = [
  { card: generateCard(Suit.Spades, Rank.Eight) },
  { card: generateCard(Suit.Spades, Rank.Nine) },
  { card: generateCard(Suit.Spades, Rank.Ten) },
  { card: generateCard(Suit.Clubs, Rank.Ace) },
  { card: generateCard(Suit.Spades, Rank.Jack) },
];

const TEST_HAND_J_OR_BETTER: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Jack) },
  { card: generateCard(Suit.Spades, Rank.Jack) },
  { card: generateCard(Suit.Diamonds, Rank.Two) },
  { card: generateCard(Suit.Hearts, Rank.Three) },
  { card: generateCard(Suit.Hearts, Rank.Four) },
];

const TEST_HAND_ACES: EnhancedCard[] = [
  { card: generateCard(Suit.Diamonds, Rank.Ace) },
  { card: generateCard(Suit.Clubs, Rank.Ace) },
  { card: generateCard(Suit.Diamonds, Rank.Seven) },
  { card: generateCard(Suit.Clubs, Rank.Queen) },
  { card: generateCard(Suit.Diamonds, Rank.Eight) },
];

const TEST_HAND_THREE_OF_A_KIND: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Jack) },
  { card: generateCard(Suit.Spades, Rank.Jack) },
  { card: generateCard(Suit.Diamonds, Rank.King) },
  { card: generateCard(Suit.Hearts, Rank.Four) },
  { card: generateCard(Suit.Clubs, Rank.Jack) },
];

const TEST_HAND_STRAIGHT: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Eight) },
  { card: generateCard(Suit.Spades, Rank.Nine) },
  { card: generateCard(Suit.Diamonds, Rank.Ten) },
  { card: generateCard(Suit.Hearts, Rank.Queen) },
  { card: generateCard(Suit.Clubs, Rank.Jack) },
];

const TEST_HAND_HIGH_STRAIGHT: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Jack) },
  { card: generateCard(Suit.Spades, Rank.Ace) },
  { card: generateCard(Suit.Diamonds, Rank.King) },
  { card: generateCard(Suit.Hearts, Rank.Queen) },
  { card: generateCard(Suit.Clubs, Rank.Ten) },
];

const TEST_HAND_LOW_STRAIGHT: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Three) },
  { card: generateCard(Suit.Spades, Rank.Five) },
  { card: generateCard(Suit.Diamonds, Rank.Ace) },
  { card: generateCard(Suit.Hearts, Rank.Four) },
  { card: generateCard(Suit.Clubs, Rank.Two) },
];

const TEST_HAND_FLUSH: EnhancedCard[] = [
  { card: generateCard(Suit.Spades, Rank.Eight) },
  { card: generateCard(Suit.Spades, Rank.Nine) },
  { card: generateCard(Suit.Spades, Rank.Ten) },
  { card: generateCard(Suit.Spades, Rank.Ace) },
  { card: generateCard(Suit.Spades, Rank.Jack) },
];

const TEST_HAND_FULL_HOUSE: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Jack) },
  { card: generateCard(Suit.Spades, Rank.Jack) },
  { card: generateCard(Suit.Diamonds, Rank.King) },
  { card: generateCard(Suit.Hearts, Rank.King) },
  { card: generateCard(Suit.Clubs, Rank.Jack) },
];

const TEST_HAND_FOUR_OF_A_KIND: EnhancedCard[] = [
  { card: generateCard(Suit.Hearts, Rank.Jack) },
  { card: generateCard(Suit.Spades, Rank.Jack) },
  { card: generateCard(Suit.Diamonds, Rank.Jack) },
  { card: generateCard(Suit.Hearts, Rank.King) },
  { card: generateCard(Suit.Clubs, Rank.Jack) },
];

const TEST_HAND_STRAIGHT_FLUSH: EnhancedCard[] = [
  { card: generateCard(Suit.Diamonds, Rank.Eight) },
  { card: generateCard(Suit.Diamonds, Rank.Nine) },
  { card: generateCard(Suit.Diamonds, Rank.Ten) },
  { card: generateCard(Suit.Diamonds, Rank.Queen) },
  { card: generateCard(Suit.Diamonds, Rank.Jack) },
];

const TEST_HAND_ROYAL_FLUSH: EnhancedCard[] = [
  { card: generateCard(Suit.Clubs, Rank.Jack) },
  { card: generateCard(Suit.Clubs, Rank.Ace) },
  { card: generateCard(Suit.Clubs, Rank.King) },
  { card: generateCard(Suit.Clubs, Rank.Queen) },
  { card: generateCard(Suit.Clubs, Rank.Ten) },
];

describe('getCombination', () => {
  it(`${printHand(TEST_HAND_ERROR)} должен выбросить ошибку`, () => {
    expect(() => getCombination(TEST_HAND_ERROR)).toThrow(
      'Для комбинации нужно 5 карт',
    );
  });

  it(`${printHand(TEST_HAND_NULL)} должен вернуть null`, () => {
    const result = getCombination(TEST_HAND_NULL);

    expect(result).toBe(null);
  });

  it(`${printHand(TEST_HAND_NO_STRAIGHT)} должен вернуть null`, () => {
    const result = getCombination(TEST_HAND_NO_STRAIGHT);

    expect(result).toBe(null);
  });

  it(`${printHand(TEST_HAND_NO_FLUSH)} должен вернуть null`, () => {
    const result = getCombination(TEST_HAND_NO_FLUSH);

    expect(result).toBe(null);
  });

  it(`${printHand(TEST_HAND_J_OR_BETTER)} должен вернуть ${
    Combinations.JACKS_OR_BETTER
  }`, () => {
    const result = getCombination(TEST_HAND_J_OR_BETTER);

    expect(result).toBe(Combinations.JACKS_OR_BETTER);
    expect(
      TEST_HAND_J_OR_BETTER.filter((card) => card.isInCombination).length,
    ).toBe(2);
  });

  it(`${printHand(TEST_HAND_ACES)} должен вернуть ${
    Combinations.JACKS_OR_BETTER
  }`, () => {
    const result = getCombination(TEST_HAND_ACES);

    expect(result).toBe(Combinations.JACKS_OR_BETTER);
    expect(TEST_HAND_ACES.filter((card) => card.isInCombination).length).toBe(
      2,
    );
  });

  it(`${printHand(TEST_HAND_THREE_OF_A_KIND)} должен вернуть ${
    Combinations.THREE_OF_A_KIND
  }`, () => {
    const result = getCombination(TEST_HAND_THREE_OF_A_KIND);

    expect(result).toBe(Combinations.THREE_OF_A_KIND);
    expect(
      TEST_HAND_THREE_OF_A_KIND.filter((card) => card.isInCombination).length,
    ).toBe(3);
  });

  it(`${printHand(TEST_HAND_STRAIGHT)} должен вернуть ${
    Combinations.STRAIGHT
  }`, () => {
    const result = getCombination(TEST_HAND_STRAIGHT);

    expect(result).toBe(Combinations.STRAIGHT);
    expect(
      TEST_HAND_STRAIGHT.filter((card) => card.isInCombination).length,
    ).toBe(5);
  });

  it(`${printHand(TEST_HAND_HIGH_STRAIGHT)} должен вернуть ${
    Combinations.STRAIGHT
  }`, () => {
    const result = getCombination(TEST_HAND_HIGH_STRAIGHT);

    expect(result).toBe(Combinations.STRAIGHT);
    expect(
      TEST_HAND_HIGH_STRAIGHT.filter((card) => card.isInCombination).length,
    ).toBe(5);
  });

  it(`${printHand(TEST_HAND_LOW_STRAIGHT)} должен вернуть ${
    Combinations.STRAIGHT
  }`, () => {
    const result = getCombination(TEST_HAND_LOW_STRAIGHT);

    expect(result).toBe(Combinations.STRAIGHT);
    expect(
      TEST_HAND_LOW_STRAIGHT.filter((card) => card.isInCombination).length,
    ).toBe(5);
  });

  it(`${printHand(TEST_HAND_FLUSH)} должен вернуть ${
    Combinations.FLUSH
  }`, () => {
    const result = getCombination(TEST_HAND_FLUSH);

    expect(result).toBe(Combinations.FLUSH);
    expect(TEST_HAND_FLUSH.filter((card) => card.isInCombination).length).toBe(
      5,
    );
  });

  it(`${printHand(TEST_HAND_FULL_HOUSE)} должен вернуть ${
    Combinations.FULL_HOUSE
  }`, () => {
    const result = getCombination(TEST_HAND_FULL_HOUSE);

    expect(result).toBe(Combinations.FULL_HOUSE);
    expect(
      TEST_HAND_FULL_HOUSE.filter((card) => card.isInCombination).length,
    ).toBe(5);
  });

  it(`${printHand(TEST_HAND_FOUR_OF_A_KIND)} должен вернуть ${
    Combinations.FOUR_OF_A_KIND
  }`, () => {
    const result = getCombination(TEST_HAND_FOUR_OF_A_KIND);

    expect(result).toBe(Combinations.FOUR_OF_A_KIND);
    expect(
      TEST_HAND_FOUR_OF_A_KIND.filter((card) => card.isInCombination).length,
    ).toBe(4);
  });

  it(`${printHand(TEST_HAND_STRAIGHT_FLUSH)} должен вернуть ${
    Combinations.STRAIGHT_FLUSH
  }`, () => {
    const result = getCombination(TEST_HAND_STRAIGHT_FLUSH);

    expect(result).toBe(Combinations.STRAIGHT_FLUSH);
    expect(
      TEST_HAND_STRAIGHT_FLUSH.filter((card) => card.isInCombination).length,
    ).toBe(5);
  });

  it(`${printHand(TEST_HAND_ROYAL_FLUSH)} должен вернуть ${
    Combinations.ROYAL_FLUSH
  }`, () => {
    const result = getCombination(TEST_HAND_ROYAL_FLUSH);

    expect(result).toBe(Combinations.ROYAL_FLUSH);
    expect(
      TEST_HAND_ROYAL_FLUSH.filter((card) => card.isInCombination).length,
    ).toBe(5);
  });
});
