<script setup lang="ts">
import type { Post } from '../post/post'
import type { NavbarItem } from './navbar'
import { onMounted, ref, watch } from 'vue'
import { aerialIslandAnimation, aerialIslandAnimationInit } from '../aerialisland/aerialIsland'
import Aerialisland from '../aerialisland/AerialIsland.vue'
import { AppLink, ToggleDark } from '../lens'

const props = defineProps<{
  title?: string
  avatar: string
  navbar: NavbarItem[]
  post?: Post
}>()

// Ref to toggle active state for animations
const isActive = ref(false)
const isTop = ref(true)

onMounted(() => {
  aerialIslandAnimationInit()

  window.addEventListener('scroll', () => {
    isTop.value = window.scrollY === 0
  })
})

watch(isTop, (newVal) => {
  // 导航栏动画
  if (newVal) {
    aerialIslandAnimation('expandedWidth')
  }
  else {
    aerialIslandAnimation('collapsedWidth')
  }
})
</script>

<template>
  <Aerialisland class="navbar">
    <template #leading>
      <div class="navbar-avatar">
        <img class="rounded-full" :src="props.avatar" alt="avatar">
      </div>
    </template>

    <template #center>
      <div class="navbar-links">
        <span v-show="post?.title && !isTop" class="flex-center w-full" @click="aerialIslandAnimation('expandedHeight')">
          <a>
            Title: {{ post?.title }}
          </a>
        </span>
        <div v-show="isTop" class="flex-center w-full">
          <AppLink v-for="item in props.navbar" :key="item.text" :to="item.link">
            {{ item.text }}
          </AppLink>
        </div>
      </div>
    </template>

    <template #trailing>
      <div class="navbar-utils" flex="~">
        <slot name="utils">
          <ToggleDark />
          <slot name="utils-expand" />
        </slot>
      </div>
    </template>

    <template #expanded>
      <div w="300px" @click="aerialIslandAnimation('collapsedHeight')">
        这些写一些文章摘要等内容 (expanded)
      </div>
    </template>
  </Aerialisland>
</template>

<style lang="scss" scoped>
.navbar-links {
  display: flex;
  width: 100%;
  white-space: nowrap;
  text-shadow: #007bff;

  // &:hover {
  //   background-color: rgba(0, 123, 255, 0.1);
  // }

  a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
    position: relative;
    transition:
      color 0.3s,
      background-color 0.3s,
      text-shadow 0.3s;
    padding: 0.375rem max(1rem, env(safe-area-inset-left)) 0.375rem max(1rem, env(safe-area-inset-right));
    border-radius: 50px;
    text-shadow: 1px 1px 5px rgba(85, 85, 85, 0.175);

    &:hover {
      color: #007bff;
      text-shadow: 1px 1px 5px rgba(0, 123, 255, 0.175);
    }
  }
}

.navbar-avatar {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.1875rem;

  img {
    height: 100%;
  }
}

.navbar-utils {
  display: flex;
  padding: 0.1875rem;
  flex-direction: row;
  gap: 1rem;

  button {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.6);
    transition:
      color 0.3s,
      background-color 0.3s,
      text-shadow 0.3s;
    padding: 0.5rem max(0.5rem, env(safe-area-inset-left)) 0.5rem max(0.5rem, env(safe-area-inset-right));
    border-radius: 50px;
    text-shadow: 1px 1px 5px rgba(85, 85, 85, 0.175);

    &:hover {
      color: #007bff;
      background-color: rgba(0, 123, 255, 0.1);
      border-radius: 50px;
      text-shadow: 1px 1px 5px rgba(0, 123, 255, 0.175);
      box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
    }
  }
}

html.dark {
  .navbar-links {
    a {
      color: #cccccc;
    }
  }

  .navbar-utils {
    button {
      color: #cccccc;
      transition:
        color 0.3s,
        background-color 0.3s,
        text-shadow 0.3s;
      text-shadow: 1px 1px 5px rgba(85, 85, 85, 0.175);

      &:hover {
        box-shadow: inset 0 0 10px rgba(33, 33, 33, 0.1);
      }
    }
  }
}
</style>
