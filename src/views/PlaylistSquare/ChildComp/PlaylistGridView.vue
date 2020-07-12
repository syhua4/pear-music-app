<template>
  <div class="playlist-grid">
    <div class="grid-wrapper">
      <div
        class="playlist-wrapper"
        v-for="item in results"
        :key="item.id"
        @click.stop="goPlaylist(item.id)"
      >
        <div class="img-wrapper">
          <img v-lazy="fmtUrl(item.coverImgUrl)" />
          <span class="count iconfont">{{ '\ue827' }}{{ item.playCount | round }}</span>
        </div>
        <div class="title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { roundCountMixin, getUrlMixin } from 'common/mixin';
export default {
  name: 'PlaylistGridView',
  mixins: [roundCountMixin, getUrlMixin],
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
.playlist-grid {
  margin: 0 24px;
  padding-top: 24px;
  .grid-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .playlist-wrapper {
      width: 31.5%;
      margin-bottom: 30px;
      .img-wrapper {
        position: relative;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: same-as-width;
          border-radius: 10px;
        }
        span {
          position: absolute;
          top: 5px;
          right: 10px;
          color: #fff;
          font-weight: 500;
          @include font_size($s);
        }
      }
      .title {
        @include font_size($s);
        @include clamp(2);
      }
    }
  }
}
</style>
