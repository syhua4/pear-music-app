<template>
  <div class="tabbar">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
.tabbar {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
}
</style>
