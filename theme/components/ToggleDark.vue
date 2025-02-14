<script setup lang="ts">
import { isDark, toggleDark } from './utils'
</script>

<template>
  <button class="toggle-theme daynight" type="button" aria-label="Toggle Dark Mode" @click="toggleDark">
    <div :class="isDark ? 'i-ri-moon-line' : 'i-ri-sun-line'" />
  </button>
</template>
