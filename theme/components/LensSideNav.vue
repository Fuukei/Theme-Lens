<template>
  <header class="lens-side-nav" flex="~ col">
    <div class="lens-nav-bg">
      <LensAppLink to="/">
        <div class="nav-item" i-ant-design-home-outlined />
      </LensAppLink>
      <LensAppLink to="post">
        <div class="nav-item" i-ant-design-file-text-filled />
      </LensAppLink>
      <LensAppLink to="about">
        <div class="nav-item" i-ant-design-info-circle-outlined />
      </LensAppLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.lens-side-nav {
  position: fixed;
  left: 1rem;
  top: 50%;
  height: auto;
  padding: 0.375rem max(0.375rem, env(safe-area-inset-left)) 0.375rem max(0.375rem, env(safe-area-inset-right));
  z-index: 1000;
  transform: translateY(-50%);

  .lens-nav-bg {
    border-width: 1px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .nav-item {
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--lens-c-text);
    transition: color 0.3s ease;
    margin: 5px;
    height: 0.9em;
    width: 0.9em;

    &:hover {
      color: #007bff;
    }

    @at-root html.dark & {
      color: #cccccc;

      &:hover {
        color: #007bff;
      }
    }
  }

  .router-link-active {
    &.router-link-exact-active {
      background-color: #666c97;
      border-radius: 100%;

      .nav-item {
        color: #fff;
      }
    }
  }
}
</style>
