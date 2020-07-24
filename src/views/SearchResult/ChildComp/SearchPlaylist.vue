<template>
  <div class="result-playlist" v-if="results && results.length > 0">
    <div
      v-for="playlist in results"
      :key="playlist.id"
      class="playlist"
      @click.once="goPlaylist(playlist.id)"
    >
      <song-view>
        <img v-lazy="fmtUrl(playlist.coverImgUrl)" class="playlist-img" slot="left" />
        <div class="playlist-info" slot="center">
          <div class="playlist-name">{{ playlist.name }}</div>
          <span class="playlist-track-count">{{ playlist.trackCount }}首音乐</span>
          <span class="playlist-creator">by {{ 'unknown' || playlist.creator.nickname }},</span>
          <span class="playlist-play-count">播放{{ playlist.playCount | round(1) }}次</span>
        </div>
      </song-view>
    </div>
  </div>
</template>

<script>
import { getUrlMixin, roundCountMixin } from 'common/mixin';
import SongView from '../../../components/content/SongView.vue';

export default {
  name: 'SearchPlaylist',
  components: { SongView },
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
      this.$router.push(`/playlists/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.result-playlist {
  .playlist {
    display: flex;
    .playlist-img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
}
</style>
