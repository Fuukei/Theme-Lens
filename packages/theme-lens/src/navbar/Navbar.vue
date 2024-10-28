<script setup lang="ts">
import { NavbarItem } from './navbar'

const props = defineProps<{
  title?: string;
  avatar: string;
  navbar: NavbarItem[];
}>();
</script>

<template>
  <header class="navbar">
    <!-- <h1 class="navbar-title">{{ props.title }}</h1> -->
     <div class="navbar-avatar navbar-bg">
      <img class="rounded-full" :src="props.avatar" alt="avatar" />
    </div>
     
    <nav class="navbar-links navbar-bg">
      <AppLink v-for="item in props.navbar" :key="item.text" :to="item.link">
        {{ item.text }}
      </AppLink>
    </nav>

    <div class="navbar-utils navbar-bg nav-toggler-panel">
      <slot name="utils" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  left: 0;
  height: 55px;
  // width: fit-content;
  width: 100%;
  padding: 0.375rem max(0.375rem, env(safe-area-inset-left)) 0.375rem max(0.375rem, env(safe-area-inset-right));
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;

  &:not(.active-header) {
    top: 2.5%;
    // width: fit-content;
  }

  .navbar-links {
    height: 100%;
    display: flex;
    gap: 0.1875rem;
    text-align: center;
    padding: 0.375rem;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6); 
      position: relative;
      transition: color 0.3s, background-color 0.3s, text-shadow 0.3s;
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

    img {
      height: 100%;
    }
  }

  .navbar-utils {
    display: flex;
    padding: 0.375rem;
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
</style>
