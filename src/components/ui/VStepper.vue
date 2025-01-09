<script setup lang="ts">
  import VButton from '@/components/ui/VButton.vue';

  const model = defineModel<number>();

  const props = defineProps<{
    min: number;
    max: number;
    disabled?: boolean;
  }>();

  const STEP = 1;

  function increase() {
    if (!model.value) return;

    const newValue = Math.min(model.value + STEP, props.max);

    model.value = newValue;
  }

  function decrease() {
    if (!model.value) return;

    const newValue = Math.max(model.value - STEP, props.min);

    model.value = newValue;
  }
</script>

<template>
  <div class="v-stepper">
    <div>
      <VButton
        :disabled="modelValue <= min || disabled"
        theme="primary"
        @click="decrease"
        >-</VButton
      >
    </div>
    <div class="v-stepper__value">
      <slot />
    </div>
    <div>
      <VButton
        :disabled="modelValue >= max || disabled"
        theme="primary"
        @click="increase"
        >+</VButton
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
  .v-stepper {
    display: inline-flex;
    gap: $base-spacing;
    align-items: center;
  }
</style>
