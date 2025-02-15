<template>
  <div class="lens-widget lens-nav-bg">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.lens-widget {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: bold;

  &.w-1x1 {
    width: 100px;
    height: 100px;
  }
  &.w-1x2 {
    width: 210px;
    height: 100px;
  }
}
</style>
