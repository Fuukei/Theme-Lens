<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { useFrontmatter, useLayout, useSiteConfig } from 'valaxy'
import { computed, onMounted, watch } from 'vue'
import { useThemeConfig } from '../composables'
import { aerialIslandAnimation } from '../utils/aerialIsland'

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const layout = useLayout()
const frontmatter = useFrontmatter()

const actions: Record<string, () => void> = {
  home: () => aerialIslandAnimation('attachedBothSide'),
  post: () => aerialIslandAnimation('detachedLeadingSide'),
}

watch(layout as ComputedRef<string>, layout => actions[layout]?.())

const navbarImg = computed(() => {
  return layout.value === 'post' ? siteConfig.value.author.avatar : siteConfig.value.favicon
})

onMounted(() => {
  actions[layout.value as string]?.()
})

// setTimeout(() => {
//   aerialIslandAnimation('expandedHeight')
// }, 4000)

// setTimeout(() => {
//   aerialIslandAnimation('collapsedHeight')
// }, 8000)
</script>

<template>
  <Navbar :navbar="themeConfig.nav" :avatar="navbarImg" :post="frontmatter">
    <template v-if="layout === 'home'" #utils-expand>
      <button class="toggle-search" type="button" aria-label="Toggle Search">
        <div i-ant-design-search-outlined />
      </button>
      <!-- TODO: 优先完成文章列表再进行搜索 -->
    </template>
    <template v-else-if="layout === 'post'" #utils-expand>
      <!-- TODO: 占位 -->
      <button class="toggle-search" type="button" aria-label="Toggle Search">
        字体切换
      </button>
      <button class="toggle-search" type="button" aria-label="Toggle Search">
        明亮模式
      </button>
    </template>
    <template v-else #utils-expand>
      <!-- TODO: 其他功能区 -->
    </template>
  </Navbar>
</template>
