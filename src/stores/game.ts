import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {
  MIN_BET_SIZE,
  DEFAULT_USER_BALANCE,
  PAYOUT_TABLE,
  RANK_WEIGHTS,
} from '@/config/game';
import {
  generateDeck,
  dealCards,
  drawCards,
  getCombination,
} from '@/helpers/game';
import {
  Combinations,
  GamePhase,
  type Card,
  type EnhancedCard,
  type LogItem,
} from '@/types/game';

export const useGameStore = defineStore('game', () => {
  // User
  const balanceLog = ref<LogItem[]>([]);
  const balance = ref<number>(DEFAULT_USER_BALANCE);

  // Interface
  const selectedBetSize = ref<number>(MIN_BET_SIZE);

  // Game
  const currentBetSize = ref<number>(selectedBetSize.value);
  const deck = ref<Card[]>([]);
  const hand = ref<EnhancedCard[]>([]);
  const drawCount = ref<number>(0);
  const gamePhase = ref<GamePhase | null>(null);
  const combination = ref<Combinations | null>(null);
  const lastPayout = ref<number | null>(null);

  const heldCards = computed<EnhancedCard[]>(() => {
    return hand.value.filter((card) => card.isHeld);
  });

  const canChangeBetSize = computed<boolean>(() => {
    return !gamePhase.value;
  });

  const canDealCards = computed<boolean>(() => {
    return canChangeBetSize.value;
  });

  const canDrawCards = computed<boolean>(() => {
    return gamePhase.value === GamePhase.MAIN && drawCount.value === 0;
  });

  const canDouble = computed<boolean>(() => {
    return lastPayout.value !== null && !gamePhase.value;
  });

  const canGuessCard = computed<boolean>(() => {
    return (
      gamePhase.value === GamePhase.DOUBLE &&
      hand.value.filter((card) => card.card.isFaceUp).length === 1
    );
  });

  const canInteractWithCards = computed<boolean>(() => {
    return (
      (gamePhase.value === GamePhase.MAIN && canDrawCards.value) ||
      (gamePhase.value === GamePhase.DOUBLE && canGuessCard.value)
    );
  });

  function MAKE_BET() {
    currentBetSize.value = selectedBetSize.value;
    balance.value -= currentBetSize.value;

    balanceLog.value.push({
      message: `Ставка ${currentBetSize.value} 🪙`,
      value: balance.value,
    });
  }

  function DEAL_CARDS(cardCount: number = 10, faceUpCount: number = 5) {
    deck.value = generateDeck(cardCount);

    hand.value = dealCards(deck.value, 5).map((card, index) => ({
      card: { ...card, isFaceUp: index + 1 <= faceUpCount },
    }));
  }

  function CHECK_COMBINATION() {
    combination.value = getCombination(hand.value);
  }

  function DRAW_CARDS() {
    drawCount.value = hand.value.length - heldCards.value.length;

    drawCards(hand.value, deck.value);

    gamePhase.value = null;
  }

  function PAY_OUT() {
    if (!combination.value) {
      balanceLog.value.push({
        message: `🤷‍♂️ Нет комбинаций`,
        value: balance.value,
      });

      return;
    }

    const payoutTableItem = PAYOUT_TABLE.find(
      (item) => item.combination === combination.value,
    );

    if (payoutTableItem) {
      const payout = payoutTableItem.payouts[currentBetSize.value - 1];

      balance.value += payout;
      lastPayout.value = payout;

      balanceLog.value.push({
        message: `🎉 Вы собрали «${combination.value}»: +${payout} 🪙`,
        value: balance.value,
      });
    }
  }

  function GUESS_CARD() {
    const comparedCards = hand.value.filter((card) => card.card.isFaceUp);

    if (comparedCards.length === 2 && lastPayout.value !== null) {
      const [firstCard, secondCard] = comparedCards;

      if (
        RANK_WEIGHTS[firstCard.card.rank] < RANK_WEIGHTS[secondCard.card.rank]
      ) {
        balance.value += lastPayout.value;

        balanceLog.value.push({
          message: `💰 «${secondCard.card.rank}» старше «${firstCard.card.rank}»: +${lastPayout.value} 🪙`,
          value: balance.value,
        });
      } else if (
        RANK_WEIGHTS[firstCard.card.rank] > RANK_WEIGHTS[secondCard.card.rank]
      ) {
        balance.value -= lastPayout.value;

        balanceLog.value.push({
          message: `🫤 «${secondCard.card.rank}» младше «${firstCard.card.rank}»: -${lastPayout.value} 🪙`,
          value: balance.value,
        });
      } else {
        balanceLog.value.push({
          message: `🙃 «${secondCard.card.rank}» и «${firstCard.card.rank}» равнозначны`,
          value: balance.value,
        });
      }
    }

    gamePhase.value = null;
    lastPayout.value = null;
  }

  function START_MAIN_GAME() {
    gamePhase.value = lastPayout.value = null;
    drawCount.value = 0;

    gamePhase.value = GamePhase.MAIN;

    MAKE_BET();
    DEAL_CARDS();
    CHECK_COMBINATION();
  }

  function COMBO_DRAW_CARDS() {
    DRAW_CARDS();

    if (drawCount.value) {
      CHECK_COMBINATION();
    }

    PAY_OUT();

    gamePhase.value = null;
  }

  function START_DOUBLE_GAME() {
    combination.value = null;
    gamePhase.value = GamePhase.DOUBLE;

    DEAL_CARDS(5, 1);
  }

  return {
    balanceLog,
    balance,
    selectedBetSize,
    currentBetSize,
    hand,
    heldCards,
    drawCount,
    combination,
    gamePhase,
    canChangeBetSize,
    canDealCards,
    canDrawCards,
    canDouble,
    canGuessCard,
    canInteractWithCards,
    START_MAIN_GAME,
    COMBO_DRAW_CARDS,
    START_DOUBLE_GAME,
    GUESS_CARD,
  };
});
