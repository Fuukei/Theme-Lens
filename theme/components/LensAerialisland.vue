<script setup lang="ts">
import { aerialIslandState } from '../utils/aerialIsland'
</script>

<template>
  <header class="aerial-island">
    <div class="lens-nav-bg leading-side">
      <slot name="leading" />
    </div>

    <nav class="lens-nav-bg center-side">
      <slot v-if="!aerialIslandState.isExpanded" name="center" />
      <slot v-else name="expanded" />
    </nav>

    <div class="lens-nav-bg trailing-side">
      <slot name="trailing" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.aerial-island {
  position: fixed;
  left: 0;
  height: 55px;
  width: 100%;
  padding: 0.375rem max(0.375rem, env(safe-area-inset-left)) 0.375rem max(0.375rem, env(safe-area-inset-right));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &:not(.active-header) {
    top: 2.5%;
  }

  .leading-side,
  .trailing-side,
  .center-side {
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
