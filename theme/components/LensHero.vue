<script setup lang="ts">
import { computed } from 'vue'
import { useThemeConfig } from '../composables'
import { isVideoUrl } from './utils'

const themeConfig = useThemeConfig()
const hero = computed(() => themeConfig.value.hero)
const urls = computed(() => themeConfig.value.hero.urls)

const currentUrl = computed(() => {
  if (hero.value.randomUrl) {
    // TODO: 剔除播放过的url
    return urls.value[Math.floor(Math.random() * urls.value.length)]
  }
  else {
    // TODO：非随机指定索引
    return urls.value[0]
  }
})

const currentUrlIsVideo = computed(() => isVideoUrl(currentUrl.value))
</script>

<template>
  <div class="fixed w-100% h-100dvh z--1">
    <template v-if="!currentUrlIsVideo">
      <div
        :key="currentUrl"
        class="bg-cover bg-no-repeat bg-fixed bg-center h-100% w-100%"
        :style="{
          backgroundImage: `url(${currentUrl})`,
        }"
      />
    </template>
    <template v-else>
      <video
        class="h-100% w-100% object-cover"
        preload="auto"
        autoplay
        loop
        muted
      >
        <source :src="currentUrl" type="video/mp4">
      </video>
    </template>
  </div>
</template>
