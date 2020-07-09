<template>
  <div class="result-playlist" v-if="results && results.length > 0">
    <div
      v-for="playlist in results"
      :key="playlist.id"
      class="playlist"
      @click.once="goPlaylist(playlist.id)"
    >
      <div class="wrapper-left">
        <img v-lazy="fmtUrl(playlist.coverImgUrl)" class="playlist-img" />
      </div>
      <div class="wrapper-right">
        <div class="playlist-name">{{ playlist.name }}</div>
        <div class="playlist-desc">
          <span class="playlist-track-count">{{ playlist.trackCount }}首音乐</span>
          <span class="playlist-creator">by {{ 'unknown' || playlist.creator.nickname }},</span>
          <span class="playlist-play-count">播放{{ playlist.playCount | round(1) }}次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUrlMixin, roundCountMixin } from 'common/mixin';

export default {
  name: 'SearchPlaylist',
  mixins: [getUrlMixin, roundCountMixin],
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    goPlaylist(id) {
      this.$router.push(`/playlist/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.result-playlist {
  margin: 0 24px;
  .playlist {
    display: flex;
    align-items: center;
    padding: 10px 0;
    @include font_size($ms);

    .playlist-img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin-right: 20px;
    }
    .playlist-desc {
      @include font_size($s);
      @include font_color();
      padding-top: 10px;
      span {
        padding: 0 5px;
      }
    }
    .playlist-name {
      @include clamp(1);
    }
  }
}
</style>
