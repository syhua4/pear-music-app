<template>
  <div class="track" :style="{ '--padding': padding + 'px' }">
    <slot name="left"></slot>
    <div class="track-center">
      <slot name="center"></slot>
    </div>
    <div class="track-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongView',
  props: {
    padding: {
      type: String,
      default: '15'
    }
  }
};
</script>

<style lang="scss" scoped>
.track {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: var(--padding) 24px;
  color: #999;
  @include font_size($ms);

  .track-center {
    flex: 1;
    @include clamp(1);

    div > div {
      @include clamp(1);
      color: #333;
    }
    span {
      @include font_size($s);
      margin-right: 10px;
    }
  }
  .track-right {
    margin-left: auto;
    margin-left: 50px;

    .iconfont {
      font-weight: 700;
      @include font_size($m);
    }
  }
}
</style>
