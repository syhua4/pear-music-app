<template>
  <div class="toplist-grid">
    <div class="header">更多榜单</div>
    <div class="grid-wrapper">
      <div
        class="toplist-wrapper"
        v-for="item in results"
        :key="item.id"
        @click.stop="goPlaylist(item.id)"
      >
        <div class="img-wrapper">
          <img v-lazy="fmtUrl(item.coverImgUrl)" />
          <span class="desc">{{ item.updateFrequency }}</span>
        </div>
        <div class="title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUrlMixin } from 'common/mixin';
export default {
  name: 'ToplistGridView',
  mixins: [getUrlMixin],
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    goPlaylist(id) {
      this.$router.push(`/playlists/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.toplist-grid {
  margin: 0 24px;
  padding-top: 24px;
  .header {
    padding: 30px 0 20px;
    @include font_size($m);
  }
  .grid-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &::after {
      content: '';
      flex: calc(100% / 3);
    }
    .toplist-wrapper {
      width: calc(100% / 3);
      .img-wrapper {
        position: relative;
        margin-bottom: 10px;
        margin-right: 16px;
        img {
          width: 100%;
          height: same-as-width;
          border-radius: 10px;
        }
        span {
          position: absolute;
          bottom: 5px;
          left: 10px;
          color: #fff;
          font-weight: 500;
          @include font_size($s);
        }
      }
      .title {
        margin-bottom: 20px;
        @include font_size($s);
        @include clamp(1);
      }
    }
  }
}
</style>
