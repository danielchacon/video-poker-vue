<script setup lang="ts">
  import VContainer from '@/components/layout/VContainer.vue';
  import VHandItem from '@/components/VHandItem.vue';
  import { useGameStore } from '@/stores/game';
  import { GamePhase, type EnhancedCard } from '@/types/game';

  const gameStore = useGameStore();

  function onCardClick(card: EnhancedCard) {
    if (!checkIfCartEnabled(card)) return;

    if (gameStore.gamePhase === GamePhase.MAIN) {
      card.isHeld = !card.isHeld;
    } else if (gameStore.gamePhase === GamePhase.DOUBLE) {
      card.card.isFaceUp = true;

      gameStore.GUESS_CARD();
    }
  }

  function checkIfCartEnabled(card: EnhancedCard): boolean {
    return (
      gameStore.canInteractWithCards &&
      (gameStore.gamePhase === GamePhase.MAIN ||
        (gameStore.gamePhase === GamePhase.DOUBLE && !card.card.isFaceUp))
    );
  }
</script>

<template>
  <div class="v-hand">
    <VContainer>
      <div class="v-hand__row">
        <VHandItem
          v-for="card in gameStore.hand"
          :disabled="!checkIfCartEnabled(card)"
          :card="card"
          :holdable="gameStore.canDrawCards"
          @click="onCardClick(card)"
        />
      </div>
    </VContainer>
  </div>
</template>

<style scoped lang="scss">
  .v-hand {
    &__row {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: $base-spacing;

      @media screen and (max-width: $breakpoint-medium-device) {
        justify-content: center;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: calc($base-spacing / 2);
      }
    }
  }
</style>
