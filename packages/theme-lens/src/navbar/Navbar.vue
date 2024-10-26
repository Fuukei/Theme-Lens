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
  left: 0;
  width: 100%;
  padding: 0.75rem max(0.75rem, env(safe-area-inset-left)) 0.75rem max(0.75rem, env(safe-area-inset-right));
  transition: all 0.6s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 87, 34, 0.8), rgba(41, 121, 255, 0.8));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &.active-header {
    backdrop-filter: saturate(180%) blur(10px);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.95);
  }

  &:not(.active-header) {
    top: 2.5%;
    left: 2.5%;
    width: 95%;
    border-radius: 15px;
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
      gap: 1.5rem;

      li {
        list-style: none;

        a {
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
          position: relative;
          transition: color 0.3s, transform 0.3s;

          &:hover {
            color: #ff5722;
            transform: scale(1.1);
          }

          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 0;
            height: 2px;
            background-color: #ff5722;
            transition: width 0.3s;
          }

          &:hover::after {
            width: 100%;
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
