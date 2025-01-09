<script setup lang="ts">
  import VHeader from '@/components/layout/VHeader.vue';
  import PayoutTable from '@/components/PayoutTable.vue';
  import ToolBar from '@/components/ToolBar.vue';
  import VHand from '@/components/VHand.vue';
  import VLog from '@/components/VLog.vue';
</script>

<template>
  <div class="app">
    <VHeader />
    <main class="app__main">
      <PayoutTable />
      <section class="app__hand-wrapper">
        <VHand />
      </section>
      <VLog />
      <ToolBar />
    </main>
  </div>
</template>

<style scoped lang="scss">
  .app {
    display: grid;
    grid-template-rows: $header-height minmax(0, 1fr);
    gap: $base-spacing;
    height: 100vh;
    min-height: $app-min-height;
    min-width: $app-min-width;
    padding: $base-spacing 0;

    @media screen and (max-width: $breakpoint-medium-device) {
      min-height: $app-min-height-md;
    }

    &__main {
      display: grid;
      grid-template-rows: $payout-table-height minmax(0, 1fr) $log-height $toolbar-height;
      gap: $base-spacing;

      @media screen and (max-width: $breakpoint-medium-device) {
        grid-template-rows: $payout-table-height-md minmax(0, 1fr) $log-height $toolbar-height-md;
      }
    }

    &__hand-wrapper {
      position: relative;
      align-self: center;
    }
  }
</style>
