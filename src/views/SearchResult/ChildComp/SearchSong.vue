<template>
  <div class="result-song" v-if="results && results.length > 0">
    <div class="play-all iconfont" @click="playSong" v-show="isShow || $attrs.isShow">
      {{ '\ue624' }} 播放全部
    </div>
    <div class="song" v-for="(song, index) in results" :key="song.id" @click.stop="playSong(index)">
      <div class="wrapper-left">
        <div class="song-name">{{ song.name }}</div>
        <div class="song-desc">
          <span class="song-artist">{{ artists(song.artists || song.ar) }}</span>
          <span class="song-album">{{ song.album ? song.album.name : song.al.name }}</span>
        </div>
        <div class="song-alias">
          {{ (song.alias && song.alias[0]) || (song.alia && song.alia[0]) }}
        </div>
      </div>
      <div class="wrapper-right">
        <i class="iconfont icon-more"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getTrack } from 'networks/recommend';
import { getArtistsMixin, getTracksMixin } from 'common/mixin';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SearchSong',
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
  margin: 0 24px;
  .play-all {
    padding-top: 20px;
    height: 60px;
    line-height: 60px;
    &.iconfont {
      @include font_size($m);
    }
  }
  .song {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-more {
      margin-left: 20px;
      @include font_color();
      @include font_size($icon_m);
    }
    .song-name {
      @include font_size($ms);
    }
    .song-name,
    .song-desc {
      @include clamp(1);
    }
    .song-desc,
    .song-alias {
      padding-top: 10px;
      @include font_size($s);
      @include font_color();
    }
    .song-artist::after {
      content: '-';
      display: inline-block;
      padding: 0 4px;
    }
  }
}
</style>
