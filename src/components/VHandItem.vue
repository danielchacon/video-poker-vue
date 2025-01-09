<script setup lang="ts">
  import VCard from '@/components/VCard.vue';
  import { type EnhancedCard } from '@/types/game';

  defineProps<{
    card: EnhancedCard;
    holdable: boolean;
    disabled?: boolean;
  }>();
</script>

<template>
  <div :class="['v-hand-item', { 'v-hand-item--disabled': disabled }]">
    <VCard class="v-hand-item__card" :card="card.card" />

    <div v-if="holdable" class="v-hand-item__status-wrapper">
      <div
        :class="[
          'v-hand-item__status',
          { 'v-hand-item__status--is-held': card.isHeld },
        ]"
      >
        {{ card.isHeld ? '🔒' : '🔓' }}
      </div>
    </div>

    <div v-if="card.isInCombination" class="v-hand-item__mark"></div>
  </div>
</template>

<style scoped lang="scss">
  .v-hand-item {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $base-spacing;
    cursor: pointer;

    &--disabled {
      cursor: default;
      pointer-events: none;
    }

    &__status-wrapper {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &__status {
      text-align: center;
      font-size: $base-font-size * 2;
      opacity: 0.5;
      transform-origin: top center;
      animation: swingAnimation 1.5s infinite linear;

      @media screen and (max-width: $container-width) {
        font-size: clamp($base-font-size, 5vw, $base-font-size * 2);
      }

      &--is-held {
        animation: none;
        opacity: 1;
      }
    }

    &__mark {
      position: absolute;
      bottom: $base-spacing;
      left: 50%;
      transform: translateX(-50%);
      width: $base-font-size;
      height: $base-font-size;
      background-color: $color-gold;
      border-radius: 100%;

      @media screen and (max-width: $container-width) {
        bottom: clamp(calc($base-spacing / 2), 1vw, $base-spacing);
        width: clamp(calc($base-font-size / 2), 1vw, $base-font-size);
        height: clamp(calc($base-font-size / 2), 1vw, $base-font-size);
      }
    }
  }
</style>
