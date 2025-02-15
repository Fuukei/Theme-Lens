<template>
  <section class="lens-widget-box">
    <div class="lens-widget-container">
      <LensWidget class="w-1x1">
        1x1 小组件
      </LensWidget>
      <LensWidget class="w-1x1">
        1x1 小组件
      </LensWidget>
      <LensWidget class="w-1x2">
        1x2 小组件
      </LensWidget>
      <LensWidget class="w-1x2">
        1x2 小组件
      </LensWidget>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.lens-widget-container {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-auto-rows: 100px;
  gap: 10px;
}
</style>
