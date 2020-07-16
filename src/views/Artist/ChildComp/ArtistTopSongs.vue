<template>
  <div class="artist-top-song" v-if="songs && songs.length">
    <div class="song-tools">
      <div class="playall" @click.stop="playSong">
        <i class="iconfont icon-play" />
        <span>播放热门50</span>
      </div>
      <div class="collection">
        <i class="iconfont icon-folder" />
        <span>收藏热门50</span>
      </div>
    </div>
    <div
      class="song-wrapper"
      v-for="(song, index) in songs"
      :key="song.id"
      @click.stop="playSong(index)"
    >
      <div class="index">{{ index + 1 }}</div>
      <div class="song-info">
        <div class="name">{{ song.name }}</div>
        <div class="album">
          {{ song.al.name }}
        </div>
      </div>
      <i class="iconfont icon-more" />
    </div>
  </div>
</template>

<script>
import { getArtistTopSong } from 'networks/artist';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ArtistTopSongs',
  created() {
    getArtistTopSong(this.$route.params.id).then(res => {
      this.songs = res.songs;
    });
  },
  data() {
    return {
      songs: []
    };
  },
  methods: {
    ...mapActions(['setPlayList', 'setShowPlayer', 'setCurrentIndex', 'setIsLoading']),
    playSong(index) {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      this.setPlayList(this.songs);
      typeof index !== 'number' ? this.setCurrentIndex(0) : this.setCurrentIndex(index);
      this.setShowPlayer(true);
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  watch: {
    songs: {
      handler() {
        this.$nextTick(function() {
          this.$emit('contentLoaded');
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.artist-top-song {
  margin: 0 24px;
  position: relative;
  top: calc(25% + 30px);
  .song-tools {
    height: 60px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    font-weight: 500;
    .icon-play {
      display: inline-block;
      margin-right: 10px;
      @include font_size($icon_ms);
    }
    .collection {
      color: #666;
      @include font_size($ms);
      .icon-folder {
        display: inline-block;
        margin-right: 5px;
        @include font_size($icon_s);
      }
    }
  }
  .song-wrapper {
    display: flex;
    align-items: center;
    padding: 16px 0;
    @include font_size($ms);

    .index {
      color: #ccc;
      width: 40px;
      margin-right: 5px;
    }
    .song-info {
      width: 70%;
      div {
        @include clamp(1);
      }
      .album {
        @include font_size($s);
      }
    }
    .icon-more {
      color: #ccc;
      margin-left: auto;
      @include font_size($icon_m);
    }
  }
}
</style>
