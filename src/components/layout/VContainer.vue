<script setup lang="ts"></script>

<template>
  <div class="v-container"><slot /></div>
</template>

<style scoped lang="scss">
  .v-container {
    width: 100%;
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $base-spacing;
  }
</style>
