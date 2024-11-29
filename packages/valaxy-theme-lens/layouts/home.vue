<script setup lang="ts">
import { Header } from 'theme-lens'
</script>

<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <Header />

    <slot>
      <RouterView />
    </slot>
  </div>
</template>
