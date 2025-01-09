<script setup lang="ts">
  import VContainer from '@/components/layout/VContainer.vue';
  import VButton from '@/components/ui/VButton.vue';
  import VStepper from '@/components/ui/VStepper.vue';
  import VChip from '@/components/VChip.vue';
  import { MIN_BET_SIZE, MAX_BET_SIZE } from '@/config/game';
  import { useGameStore } from '@/stores/game';

  const gameStore = useGameStore();
</script>

<template>
  <div class="toolbar">
    <VContainer>
      <div class="toolbar__row">
        <div class="toolbar__inner">
          <VStepper
            v-model="gameStore.selectedBetSize"
            class="toolbar__stepper"
            :disabled="!gameStore.canChangeBetSize"
            :min="MIN_BET_SIZE"
            :max="MAX_BET_SIZE"
          >
            <VChip class="toolbar__chip" :value="gameStore.selectedBetSize" />
          </VStepper>
          <VButton
            :disabled="!gameStore.canDouble"
            theme="alert"
            @click="gameStore.START_DOUBLE_GAME"
          >
            <template #icon>💰</template>
            Удвоить
          </VButton>
          <VButton
            :disabled="!gameStore.canDrawCards"
            theme="warning"
            @click="gameStore.COMBO_DRAW_CARDS"
          >
            <template #icon>
              {{
                gameStore.heldCards.length === gameStore.hand.length &&
                gameStore.hand.length
                  ? '⏭️'
                  : '🔁'
              }}
            </template>
            {{
              gameStore.heldCards.length === gameStore.hand.length &&
              gameStore.hand.length
                ? 'Закончить ход'
                : 'Заменить'
            }}</VButton
          >
          <VButton
            :disabled="!gameStore.canDealCards"
            theme="primary"
            @click="gameStore.START_MAIN_GAME"
          >
            <template #icon>✋</template>
            Раздать
          </VButton>
        </div>
      </div>
    </VContainer>
  </div>
</template>

<style scoped lang="scss">
  .toolbar {
    &__row {
      display: flex;
      justify-content: center;
    }

    &__inner {
      display: flex;
      justify-content: center;
      gap: $base-spacing;
      align-items: center;
      padding: $base-spacing;
      border-radius: $base-radius;
      background-color: rgba($color-white, 0.25);

      @media screen and (max-width: $breakpoint-medium-device) {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    &__stepper {
      grid-column: 1 / 4;
      justify-self: center;
    }

    &__chip {
      display: block;
      width: $chip-height;
    }
  }
</style>
