<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps<{
    value: string | number;
  }>();

  const textValue = ref<string | number>(props.value);
  const fadeOut = ref<boolean>(false);

  function onTransitionEnd() {
    textValue.value = props.value;
    fadeOut.value = false;
  }

  watch(
    () => props.value,
    () => {
      fadeOut.value = true;
    },
  );
</script>

<template>
  <span
    :class="['blur-in-out', { 'blur-in-out--active': fadeOut }]"
    v-html="textValue"
    @transitionend="onTransitionEnd"
  >
  </span>
</template>

<style scoped lang="scss">
  .blur-in-out {
    opacity: 1;
    filter: blur(0);
    transition: opacity $base-transition-time, filter $base-transition-time;

    &--active {
      opacity: 0.8;
      filter: blur(7px);
    }
  }
</style>
