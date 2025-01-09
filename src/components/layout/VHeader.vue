<script setup lang="ts">
  import VContainer from '@/components/layout/VContainer.vue';
  import VBalance from '@/components/VBalance.vue';
  import { useGameStore } from '@/stores/game';

  const gameStore = useGameStore();
</script>

<template>
  <header class="v-header">
    <VContainer class="v-header__container">
      <h1 class="v-header__logo">Видеопокер</h1>
      <VBalance :value="gameStore.balance" />
    </VContainer>
  </header>
</template>

<style scoped lang="scss">
  .v-header {
    &__logo {
      font-family: $logo-font-family;
      font-size: 30px;
      color: var(--color-white);
    }

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
