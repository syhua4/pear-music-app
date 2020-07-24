<template>
  <div class="scroll-view" :style="{ '--height': height }">
    <div class="cover" ref="cover"><slot name="cover" /></div>
    <div class="tools">
      <slot name="tab" />
      <div class="left-tool">
        <slot name="left" />
      </div>
      <div class="right-tool">
        <slot name="right" />
      </div>
    </div>
    <scroll>
      <slot name="component" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';
export default {
  name: 'ScrollView',
  components: { Scroll },
  props: {
    height: {
      type: String,
      default: '35%'
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-view {
  .cover {
    background-color: #444;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 100px;
    height: var(--height);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 25%);
    }
  }
  .tools {
    padding: 0 24px;
    overflow: hidden;
    display: flex;
    align-items: center;
    height: 80px;
    position: absolute;
    top: calc(var(--height) + 80px);
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
    border-radius: 30px 30px 0 0;
    border-bottom: 1px solid #eee;
    @include font_size($ms);

    .iconfont {
      @include font_size($icon_s);
      &.icon-play {
        @include font_size($icon_ms);
      }
    }
    .left-tool {
      .iconfont {
        margin-right: 20px;
      }
      font-weight: 500;
    }
    .right-tool {
      margin-left: auto;
    }
  }
  .scroll-wrapper {
    position: absolute;
    top: calc(var(--height) + 160px);
    left: 0;
    right: 0;
    bottom: 0px;
    overflow: hidden;
  }
}
</style>
