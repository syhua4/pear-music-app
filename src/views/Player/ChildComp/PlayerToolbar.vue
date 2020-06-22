<template>
  <div class="player-toolbar">
    <i class="iconfont icon-heart"></i>
    <i class="iconfont icon-download"></i>
    <i class="iconfont icon-comment"></i>
    <i class="iconfont icon-more--line"></i>
  </div>
</template>

<script>
export default {
  name: 'PlayerToolbar'
}
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.player-toolbar {
  height: 5%;
  color: #fff;
  display: flex;
  position: relative;
  z-index: 2;
  justify-content: space-around;
  .iconfont {
    @include font_size($icon_m);
  }
}
</style>
