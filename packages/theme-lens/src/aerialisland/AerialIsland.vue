<script setup lang="ts">
// Test
import { aerialIslandState } from './aerialIsland'
</script>

<template>
  <header class="aerial-island">
    <div class="navbar-bg leading-side">
      <slot name="leading" />
    </div>

    <nav class="navbar-bg center-side">
      <slot v-if="!aerialIslandState.isExpanded" name="center" />
      <slot v-else name="expanded" />
    </nav>

    <div class="navbar-bg trailing-side">
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

.navbar-bg {
  background: rgba(255, 255, 255, 0.75);
  transition: all 0.6s ease-in-out;
  backdrop-filter: saturate(180%) blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.95);
  }

  &.active-header {
    backdrop-filter: saturate(180%) blur(10px);
  }

  &:not(.active-header) {
    border-radius: 50px;
  }
}

html.dark {
  .navbar-bg {
    background: rgba(0, 0, 0, 0.65);
    transition: all 0.6s ease-in-out;
    backdrop-filter: saturate(180%) blur(10px);

    &:hover {
      background: rgba(0, 0, 0, 0.95);
    }

    &.active-header {
      backdrop-filter: saturate(180%) blur(10px);
    }

    &:not(.active-header) {
      border-radius: 50px;
      // border-width 为动态数值
      border-style: solid;
      border-color: #222222;
      box-shadow: 0 4px 12px rgba(33, 33, 33, 0.5);
    }

    a {
      color: #cccccc;

      &:hover {
        box-shadow: inset 0 0 10px rgba(33, 33, 33, 0.1);
      }
    }
  }
}
</style>
