<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import { animate, spring, timeline, TimelineDefinition } from 'motion';
import type { NavbarItem } from './navbar'
import { AppLink, ToggleDark } from '../lens'
import { Post } from '../post/post'

const props = defineProps<{
  title?: string
  avatar: string
  navbar: NavbarItem[]
  post?: Post
}>()

// Ref to toggle active state for animations
const isActive = ref(false)
const isTop = ref(true)
const navbarWidth = ref(0)

let width

onMounted(() => {
  window.addEventListener('scroll', () => {
    isTop.value = window.scrollY === 0
  })

  width = document.querySelector('.navbar-links')?.clientWidth
})

watch(isTop, (newVal) => {
  const newWidth = newVal ? width : 200
  const navbarLinks = document.querySelector('.navbar-links');
  let sequence: TimelineDefinition

  if(newVal) {
    sequence = [
      ['.navbar-links .overlay', { display: ['block'] }, { duration: 0 }], // Initialize visible
      [navbarLinks!, { width: [`200px`, `${width}px`] }, { easing: spring({ stiffness: 70, damping: 7, restSpeed: 200 }), duration: 0.6 }],
      ['.navbar-links .overlay', { backgroundColor: ['hsla(0, 0%, 100%, 0.7)', 'transparent'] }, { duration: 0.8, at: "<" }],
      ['.navbar-links .overlay', { backdropFilter: ['blur(2.2px)', 'blur(0)'] }, { duration: 0.8, at: "<" }],
    ]
  } else {
    sequence = [
      [navbarLinks!, { width: [`${width}px`, `200px`], }, { duration: 0.4 }],
      ['.navbar-links .overlay', { backgroundColor: ['hsla(0, 0%, 100%, 0.7)', 'transparent'] }, { duration: 0.8, at: "<" }],
      ['.navbar-links .overlay', { backdropFilter: ['blur(2.2px)', 'blur(0)'] }, { duration: 0.8, at: "<" }],
      [navbarLinks!, { height: ['43px', '44px'] }, { easing: spring({ velocity: 80, stiffness: 70, damping: 7 }), duration: 0.6, at: '-0.5' }],
      ['.navbar-links .overlay', { display: ['block', 'none'] }, { duration: 0.1, at: "<" }],
    ]
  }

  timeline(sequence)
})
</script>

<template>
  <header class="navbar">
    <div class="navbar-avatar navbar-bg">
      <img class="rounded-full" :src="props.avatar" alt="avatar">
    </div>

    <nav class="navbar-bg navbar-links">
      <div class="overlay" />
      <span v-show="post?.title && !isTop" class="flex-center w-full">
        <a>
          Title: {{ post.title }}
        </a>
      </span>
      <div v-show="isTop" class="flex-center w-full">
        <AppLink v-for="item in props.navbar" :key="item.text" :to="item.link">
          {{ item.text }}
        </AppLink>
      </div>
    </nav>

    <div class="navbar-bg navbar-utils">
      <slot name="utils">
        <ToggleDark />
        <slot name="utils-expand" />
      </slot>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  left: 0;
  height: 55px;
  width: 100%;
  padding: 0.375rem max(0.375rem, env(safe-area-inset-left)) 0.375rem max(0.375rem, env(safe-area-inset-right));
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 1000;

  &:not(.active-header) {
    top: 2.5%;
  }

  .navbar-links {
    position: relative;
    height: 100%;
    display: flex;
    gap: 0.1875rem;
    text-align: center;
    padding: 0.1875rem;
    overflow: hidden;
    white-space: nowrap;
    text-shadow: #007bff;

    .overlay {
      position: absolute;
      inset: 0;
      z-index: 10;
    }

    a {
      display: flex;
      align-items: center;
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
        background-color: rgba(0, 123, 255, 0.1);
        border-radius: 50px;
        text-shadow: 1px 1px 5px rgba(0, 123, 255, 0.175);
        box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
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
}

.navbar-bg {
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
    border: 1px solid #f7f7f7;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

html.dark {
  .navbar-bg {
    background: rgba(0, 0, 0, 0.65);
    box-shadow: 0 4px 12px rgba(33, 33, 33, 0.5);
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
      border: 1px solid #222222;
      box-shadow: 0 4px 12px rgba(33, 33, 33, 0.5);
    }

    a {
      color: #cccccc;

      &:hover {
        box-shadow: inset 0 0 10px rgba(33, 33, 33, 0.1);
      }
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
