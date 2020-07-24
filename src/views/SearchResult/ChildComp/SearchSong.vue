<template>
  <div class="result-song" v-if="results && results.length > 0">
    <div class="play-all iconfont" @click="playSong" v-show="isShow || $attrs.isShow">
      {{ '\ue624' }} 播放全部
    </div>
    <div class="song" v-for="(song, index) in results" :key="song.id" @click.stop="playSong(index)">
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
import { getArtistsMixin, getTracksMixin } from 'common/mixin';
import { mapGetters, mapActions } from 'vuex';
import SongView from '../../../components/content/SongView.vue';

export default {
  name: 'SearchSong',
  components: { SongView },
  mixins: [getArtistsMixin, getTracksMixin],
  methods: {
    ...mapActions(['setPlayList', 'setShowPlayer', 'setCurrentIndex', 'setIsLoading']),
    playSong(index) {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      typeof index === 'number'
        ? this.setPlayList([this.tracks[index]])
        : this.setPlayList(this.tracks);
      this.setCurrentIndex(0);
      this.setShowPlayer(true);
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
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
