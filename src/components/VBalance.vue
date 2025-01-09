<script setup lang="ts">
  import BlurInOut from './transitions/BlurInOut.vue';

  defineProps<{
    value: string | number;
  }>();
</script>

<template>
  <div class="v-balance"><BlurInOut :value="value" /> 🪙</div>
</template>

<style scoped lang="scss">
  .v-balance {
    padding: calc($base-spacing / 4) calc($base-spacing / 2);
    border-radius: $base-radius;
    font-weight: bold;
    background-color: rgba($color-white, 0.25);
  }
</style>
