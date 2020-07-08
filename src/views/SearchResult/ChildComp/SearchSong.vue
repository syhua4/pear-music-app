<template>
  <div class="result-song" v-if="results && results.length > 0">
    <div class="song" v-for="(song, index) in results" :key="song.id" @click="playSong(index)">
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
import { getArtistsMixin } from 'common/mixin';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SearchSong',
  mixins: [getArtistsMixin],
  methods: {
    ...mapActions(['setPlayList', 'setShowPlayer', 'setCurrentIndex', 'setIsLoading']),
    playSong(index) {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      index || index === 0
        ? this.setPlayList([this.allResults.song.songs[index]])
        : this.setPlayList(this.allResults.song.songs);
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.result-song {
  margin: 0 24px;
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
