<script setup lang="ts">
  import { computed, getCurrentInstance } from 'vue';
  import BlurInOut from './transitions/BlurInOut.vue';
  import { type Card } from '@/types/game';

  const props = defineProps<{
    card: Card;
  }>();

  const instance = getCurrentInstance();

  const cardHTMLContent = computed<string>(
    () => `${props.card.rank}<span
          ${(instance?.type as any).__scopeId || ''}
          class="v-card__symbol ${
            props.card.isRed ? 'v-card__symbol--is-red' : ''
          }"
        >${props.card.symbol}</span>`,
  );
</script>

<template>
  <div
    :class="['v-card', { 'v-card--is-face-up': card.isFaceUp }]"
    role="button"
  >
    <div class="v-card__inner">
      <div class="v-card__front">
        <template v-if="card.isFaceUp">
          <BlurInOut :value="cardHTMLContent" />
        </template>
      </div>
      <div class="v-card__back"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use 'sass:color';

  .v-card {
    position: relative;
    aspect-ratio: 7 / 10;
    width: 100%;
    max-height: calc(100vh - $all-but-hands-height);
    min-height: 160px;

    @media screen and (max-width: $breakpoint-medium-device) {
      aspect-ratio: 1 / 1;
      max-height: none;
      min-height: 100px;
    }

    @media (hover: hover) {
      &:hover::after {
        opacity: 1;
      }
    }

    &--is-face-up {
      .v-card__inner {
        transform: rotateY(180deg);
      }
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      background-color: rgba($color-black, 0.1);
      opacity: 0;
      transition: opacity $base-transition-time;
    }

    &__inner {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform $base-transition-time;
    }

    &__front,
    &__back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: $base-radius;
    }

    &__front {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $color-white;
      font-size: calc($base-font-size * 3);
      color: $color-black;
      transform: rotateY(180deg);

      @media screen and (max-width: $container-width) {
        font-size: clamp($base-font-size * 2, 5vw, calc($base-font-size * 3));
      }
    }

    &__back {
      background: url('@/assets/images/card-pattern.webp') repeat center / cover;
      border: 10px solid $color-white;

      @media screen and (max-width: $container-width) {
        border-width: clamp(4px, 1vw, 10px);
      }
    }

    &__symbol {
      &--is-red {
        color: $color-red;
      }
    }
  }
</style>
