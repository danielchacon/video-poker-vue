<script setup lang="ts">
  import { computed } from 'vue';
  import BlurInOut from './transitions/BlurInOut.vue';
  import { useGameStore } from '@/stores/game';

  const gameStore = useGameStore();

  const message = computed<string>(() => {
    if (gameStore.hand.length === 0) {
      return 'Жмите «Раздать» 🖱️';
    }

    if (gameStore.canGuessCard) {
      return 'Игра на удвоение 💰➡️💰💰';
    }

    return gameStore.balanceLog.length
      ? gameStore.balanceLog[gameStore.balanceLog.length - 1].message
      : '';
  });
</script>

<template>
  <div class="v-log">
    <div class="v-log__inner">
      <BlurInOut :value="message" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .v-log {
    display: flex;
    justify-content: center;

    &__inner {
      padding: $base-spacing;
      background-color: rgba($color-black, 0.25);
      border-radius: $base-radius;
      text-align: center;
      color: var(--color-white);
    }
  }
</style>
