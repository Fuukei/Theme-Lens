<script setup lang="ts">
import { useAppStore } from 'valaxy'

const appStore = useAppStore()
</script>

<template>
  <button class="sakura-icon-btn sakura-toggle-theme" type="button" aria-label="Toggle Dark Mode" @click="appStore.toggleDarkWithTransition">
    <div :class="appStore.isDark ? 'i-ri-moon-line' : 'i-ri-sun-line'" />
  </button>
</template>
