<script setup lang="ts">
  import { computed, useSlots } from 'vue';

  defineProps<{
    theme?: 'primary' | 'alert' | 'warning';
    disabled?: boolean;
  }>();

  const slots = useSlots();

  const hasIconSlot = computed<boolean>(() => !!slots.icon);
</script>

<template>
  <button
    type="button"
    :class="['v-button', theme && `v-button--theme-${theme}`]"
    :disabled="disabled"
  >
    <span class="v-button__text"><slot /></span>
    <span v-if="hasIconSlot" class="v-button__icon">
      <slot name="icon" />
    </span>
  </button>
</template>

<style scoped lang="scss">
  @use 'sass:color';

  .v-button {
    all: unset;
    padding: calc($base-spacing / 2) $base-spacing;
    border-radius: $base-radius;
    transition: background-color $base-transition-time;
    text-align: center;
    cursor: pointer;
    user-select: none;

    &[disabled] {
      background-color: color.mix($color-black, $color-white, 60%);
      color: $color-white;
      pointer-events: none;
      cursor: default;
    }

    &--theme-primary {
      background-color: $color-dark-blue;
      color: $color-white;

      @media (hover: hover) {
        &:hover {
          background-color: color.mix($color-dark-blue, $color-white, 90%);
        }
      }

      &:active {
        background-color: $color-dark-blue;
      }
    }

    &--theme-warning {
      background-color: $color-gold;
      color: $color-black;

      @media (hover: hover) {
        &:hover {
          background-color: color.mix($color-gold, $color-black, 90%);
        }
      }

      &:active {
        background-color: $color-gold;
      }
    }

    &--theme-alert {
      background-color: $color-red;
      color: $color-white;

      @media (hover: hover) {
        &:hover {
          background-color: color.mix($color-red, $color-black, 90%);
        }
      }

      &:active {
        background-color: $color-red;
      }
    }

    &__icon {
      @media screen and (max-width: $breakpoint-medium-device) {
        display: none;
      }
    }
  }
</style>
