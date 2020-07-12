<template>
  <div class="navbar">
    <div class="left-nav">
      <slot name="left" />
    </div>
    <div class="center-nav">
      <slot name="center" />
    </div>
    <div class="right-nav">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.navbar {
  height: 100px;
  width: 100%;
  @include bg_color();
  @include font_color();
  @include font_size($m);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-nav,
  .right-nav,
  .center-nav {
    height: 84px;
    line-height: 84px;
    margin: 0 20px;
  }
  .center-nav {
    height: 100%;
    margin: 0;
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
</style>
