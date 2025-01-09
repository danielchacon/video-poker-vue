<script setup lang="ts">
  import VContainer from '@/components/layout/VContainer.vue';
  import { PAYOUT_TABLE } from '@/config/game';
  import { useGameStore } from '@/stores/game';

  const gameStore = useGameStore();
</script>

<template>
  <div class="payout-table">
    <VContainer>
      <div class="payout-table__body">
        <template v-for="(item, itemIndex) in PAYOUT_TABLE">
          <div
            :class="[
              'payout-table__cell payout-table__cell--combination',
              `payout-table__cell--${itemIndex % 2 === 0 ? 'even' : 'odd'}`,
            ]"
          >
            <div class="payout-table__value">
              {{ item.combination }}
            </div>
          </div>
          <div
            v-for="(payout, index) in item.payouts"
            :class="[
              'payout-table__cell payout-table__cell--payout',
              `payout-table__cell--${itemIndex % 2 === 0 ? 'even' : 'odd'}`,

              {
                'payout-table__cell--current':
                  gameStore.selectedBetSize === index + 1,
              },
              {
                'payout-table__cell--highlight':
                  gameStore.combination === item.combination &&
                  gameStore.currentBetSize === index + 1,
              },
            ]"
          >
            <div
              :class="[
                'payout-table__value',
                `payout-table__value--bet-${index + 1}`,
              ]"
            >
              <span class="payout-table__value-inner">{{ payout }}</span>
            </div>
          </div>
        </template>
      </div>
    </VContainer>
  </div>
</template>

<style scoped lang="scss">
  .payout-table {
    &__body {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));

      @media screen and (max-width: $breakpoint-medium-device) {
        grid-template-columns: minmax(0, 1fr) repeat(5, min-content);
      }
    }

    &__cell {
      position: relative;

      &--payout {
        text-align: center;
      }

      &--current {
        .payout-table__value {
          &--bet-1 {
            background-color: rgba($bet-1, 0.25);
          }

          &--bet-2 {
            background-color: rgba($bet-2, 0.25);
          }

          &--bet-3 {
            background-color: rgba($bet-3, 0.25);
          }

          &--bet-4 {
            background-color: rgba($bet-4, 0.25);
          }

          &--bet-5 {
            background-color: rgba($bet-5, 0.25);
          }
        }
      }

      &--odd {
        background-color: rgba($color-white, 0.1);
      }

      &--even {
        background-color: rgba($color-white, 0.25);
      }

      &--highlight {
        .payout-table__value {
          background-color: $success;
          color: $color-black;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: rgba(255, 255, 255, 0.5);
            transform: skewX(-30deg);
            filter: blur(10px);
            animation: glare-animation 3s infinite;
            animation-delay: var(--delay, 0s);
          }
        }
      }
    }

    &__value {
      position: relative;
      overflow: hidden;
      padding: calc($base-spacing / 4) calc($base-spacing / 2);
      font-size: $payout-value-font-size;

      @media screen and (max-width: $breakpoint-medium-device) {
        font-size: $payout-value-font-size-md;
      }
    }

    &__value-inner {
      position: relative;
    }
  }
</style>
