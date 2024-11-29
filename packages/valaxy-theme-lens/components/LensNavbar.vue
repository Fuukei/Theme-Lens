<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { Navbar } from 'theme-lens'
import { attachSideAnimation, detachSideAnimation } from 'theme-lens/src/aerialisland/animation'
import { useFrontmatter, useLayout, useSiteConfig } from 'valaxy'
import { watch } from 'vue'
import { useThemeConfig } from '../composables'

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const layout = useLayout()
const frontmatter = useFrontmatter()

const actions: Record<string, () => void> = {
  home: () => attachSideAnimation('both'),
  post: () => detachSideAnimation('both'),
}

watch(layout as ComputedRef<string>, layout => actions[layout]?.())
</script>

<template>
  <Navbar :navbar="themeConfig.nav" :avatar="siteConfig.author.avatar" :post="frontmatter">
    <template #utils-expand>
      <button class="toggle-search" type="button" aria-label="Toggle Search">
        <div i-ant-design-search-outlined />
      </button>
      <!-- TODO: 优先完成文章列表再进行搜索 -->
    </template>
  </Navbar>
</template>
