<script setup lang="ts">
import { NavbarItem } from './navbar'

const props = defineProps<{
  title: string;
  navbar: NavbarItem[];
}>();
</script>

<template>
  <header class="navbar">
    <h1 class="navbar-title">{{ props.title }}</h1>
    <nav class="navbar-links">
      <ul>
        <li v-for="item in props.navbar" :key="item.text">
          <a :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  padding-left: max(0.75rem, env(safe-area-inset-left));
  padding-right: max(0.75rem, env(safe-area-inset-right));
  transition: all 1s ease-in-out !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  &:not(.active-header) {
    width: 95%;
    top: 2.5%;
    left: 2.5%;
    border-radius: 15px;
  }

  &.active-header {
    left: 0;
    backdrop-filter: saturate(180%) blur(3.2px);
  }
}
</style>
