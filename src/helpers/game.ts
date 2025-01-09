import { RANK_WEIGHTS, SUIT_SYMBOLS, RED_SUITS } from '@/config/game';
import {
  Combinations,
  Suit,
  Rank,
  type Card,
  type EnhancedCard,
} from '@/types/game';

export function generateCard(suit: Suit, rank: Rank): Card {
  const weight = RANK_WEIGHTS[rank];
  const symbol = SUIT_SYMBOLS[suit];
  const isRed = RED_SUITS.includes(suit);

  return {
    suit,
    symbol,
    rank,
    weight,
    isRed,
  };
}

export function generateDeck(cardCount: number = 52): Card[] {
  const suits = Object.values(Suit);
  const ranks = Object.values(Rank);
  const fullDeck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      fullDeck.push(generateCard(suit, rank));
    }
  }

  fullDeck.sort(() => Math.random() - 0.5);

  return fullDeck.slice(0, cardCount);
}

export function dealCards(deck: Card[], count: number): Card[] {
  const dealtCards = deck.splice(0, count);

  return dealtCards;
}

export function drawCards(hand: EnhancedCard[], deck: Card[]): void {
  hand.forEach((card, index) => {
    if (!card.isHeld && deck.length > 0) {
      const newCard = deck.shift();

      if (newCard) {
        hand[index] = {
          card: {
            ...newCard,
            isFaceUp: true,
          },
        };
      }
    }
  });
}

function getRankCounts(cards: EnhancedCard[]): Record<number, Rank[]> {
  const rankMap: Record<string, { rank: Rank; count: number }> = {};

  for (const card of cards) {
    const rank = card.card.rank;
    if (!rankMap[rank]) {
      rankMap[rank] = { rank, count: 0 };
    }
    rankMap[rank].count++;
  }

  const counts: Record<number, Rank[]> = {};

  for (const { rank, count } of Object.values(rankMap)) {
    if (!counts[count]) {
      counts[count] = [];
    }
    counts[count].push(rank);
  }

  return counts;
}

function getSuitCounts(cards: EnhancedCard[]): Record<Suit, number> {
  return cards.reduce((acc, card) => {
    const suit = card.card.suit;
    acc[suit] = (acc[suit] || 0) + 1;
    return acc;
  }, {} as Record<Suit, number>);
}

function checkFlush(suitCounts: Record<Suit, number>): boolean {
  return Object.values(suitCounts).some((count) => count === 5);
}

function checkStraight(cards: EnhancedCard[]): boolean {
  const weights = cards.map((card) => card.card.weight);
  for (let i = 0; i < weights.length - 1; i++) {
    if (weights[i + 1] - weights[i] !== 1) {
      if (weights.join(',') === '2,3,4,5,14') return true;
      return false;
    }
  }
  return true;
}

function markCombination(
  originalCards: EnhancedCard[],
  sortedCards: EnhancedCard[],
  matchingRanks: Rank[] = [],
): void {
  for (const card of originalCards) {
    card.isInCombination =
      matchingRanks.length > 0
        ? matchingRanks.includes(card.card.rank)
        : sortedCards.includes(card);
  }
}

export function getCombination(cards: EnhancedCard[]): Combinations | null {
  if (cards.length !== 5) {
    throw new Error('Для комбинации нужно 5 карт');
  }

  const sortedCards = [...cards].sort((a, b) => a.card.weight - b.card.weight);
  const rankCounts = getRankCounts(sortedCards);
  const suitCounts = getSuitCounts(sortedCards);

  const isFlush = checkFlush(suitCounts);
  const isStraight = checkStraight(sortedCards);

  if (isFlush && isStraight) {
    const isRoyal =
      sortedCards.map((card) => card.card.weight).join(',') ===
      '10,11,12,13,14';

    markCombination(cards, sortedCards);

    return isRoyal ? Combinations.ROYAL_FLUSH : Combinations.STRAIGHT_FLUSH;
  }

  if (rankCounts[4]) {
    markCombination(cards, sortedCards, rankCounts[4]);

    return Combinations.FOUR_OF_A_KIND;
  }

  if (rankCounts[3] && rankCounts[2]) {
    markCombination(cards, sortedCards, [...rankCounts[3], ...rankCounts[2]]);

    return Combinations.FULL_HOUSE;
  }

  if (isFlush) {
    markCombination(cards, sortedCards);

    return Combinations.FLUSH;
  }

  if (isStraight) {
    markCombination(cards, sortedCards);

    return Combinations.STRAIGHT;
  }

  if (rankCounts[3]) {
    markCombination(cards, sortedCards, rankCounts[3]);

    return Combinations.THREE_OF_A_KIND;
  }

  if (rankCounts[2]?.length === 2) {
    markCombination(cards, sortedCards, rankCounts[2]);

    return Combinations.TWO_PAIRS;
  }

  if (rankCounts[2]?.length) {
    const validRanks = rankCounts[2].filter(
      (rank) => RANK_WEIGHTS[rank] >= RANK_WEIGHTS[Rank.Jack],
    );

    if (validRanks.length > 0) {
      const matchingCards = sortedCards.filter((card) =>
        validRanks.includes(card.card.rank),
      );

      markCombination(cards, matchingCards);

      return Combinations.JACKS_OR_BETTER;
    }
  }

  return null;
}

export function printHand(cards: EnhancedCard[]) {
  return cards.map((card) => `${card.card.rank}${card.card.symbol}`).join(' ');
}
