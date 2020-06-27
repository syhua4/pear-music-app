<template>
  <div class="header-wrapper">
    <div class="play-all-wrapper" @click="playAll">
      <i class="iconfont icon-play" />
      <span class="play-all">播放全部</span>
      <span class="total-count">(共{{ item.length }}首)</span>
    </div>
    <div class="collection-btn">
      <i class="iconfont icon-plus" />
      <span>收藏 ({{ subCount | round }})</span>
    </div>
  </div>
</template>

<script>
import { roundCountMixin, getArtistsMixin } from 'common/mixin';
export default {
  name: 'PlaylistList',
  mixins: [roundCountMixin, getArtistsMixin],
  props: {
    item: {
      type: Array,
      default: () => [],
      required: true
    },
    subCount: {
      type: Number,
      default: 0,
      required: true
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    playAll() {
      this.$emit('playAll');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.header-wrapper {
  height: 100px;
  display: flex;
  padding: 0 24px;
  align-items: center;
  background-color: #fff;
  border-radius: 40px 40px 0 0;
  border-bottom: 1px solid #eee;
  @include font_size($ms);

  .icon-play {
    padding-right: 20px;
    @include font_size($icon_m);
  }
  .play-all {
    @include font_size($m);
  }
  .total-count {
    @include font_color();
  }
  .collection-btn {
    margin-left: auto;
    color: #fff;
    padding: 20px 25px;
    border-radius: 35px;
    background: $gradient-color-theme;
    .icon-plus {
      font-weight: 700;
      margin-right: 5px;
      @include font_size($icon_s);
    }
  }
}
</style>
