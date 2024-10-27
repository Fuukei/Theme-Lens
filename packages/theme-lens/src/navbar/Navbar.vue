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
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  padding: 0.375rem max(0.375rem, env(safe-area-inset-left)) 0.375rem max(0.375rem, env(safe-area-inset-right));
  transition: all 0.6s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  backdrop-filter: saturate(180%) blur(10px);

  &.active-header {
    backdrop-filter: saturate(180%) blur(10px);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.95);
  }

  &:not(.active-header) {
    top: 2.5%;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
    border-radius: 50px;
    border: 1px solid #f7f7f7;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .navbar-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    transition: color 0.3s;
  }

  .navbar-links {
    ul {
      display: flex;
      gap: 0.1875rem;

      li {
        list-style: none;

        a {
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
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;

    .navbar-links ul {
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
