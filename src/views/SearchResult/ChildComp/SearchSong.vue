<template>
  <div class="result-song" v-if="results && results.length > 0">
    <div class="play-all iconfont" @click="play" v-show="isShow || $attrs.isShow">
      {{ '\ue624' }} 播放全部
    </div>
    <div class="song" v-for="(song, index) in results" :key="song.id" @click.stop="play(index)">
      <song-view padding="0">
        <div class="song-info" slot="center">
          <div class="song-name">{{ song.name }}</div>
          <span class="song-artist">{{ artists(song.artists || song.ar) }}</span>
          <span class="song-album">{{ song.album ? song.album.name : song.al.name }}</span>
        </div>
        <i class="iconfont icon-more--line" slot="right" />
      </song-view>
    </div>
  </div>
</template>

<script>
import { getTrack } from 'networks/recommend';
import { getArtistsMixin, getTracksMixin, playSongMixin } from 'common/mixin';
import SongView from '../../../components/content/SongView.vue';

export default {
  name: 'SearchSong',
  components: { SongView },
  mixins: [getArtistsMixin, getTracksMixin, playSongMixin],
  methods: {
    play(index) {
      typeof index === 'number' ? this.playSong([this.tracks[index]]) : this.playSong(this.tracks);
    }
  },
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    results: {
      immediate: true,
      deep: true,
      handler(val) {
        let ids = this.getTrackIds(val);
        getTrack(ids).then(res => {
          this.tracks = res.songs;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.result-song {
  .play-all {
    margin: 0 24px;
    height: 60px;
    line-height: 60px;
    @include font_size($ms);
  }
  .song {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
