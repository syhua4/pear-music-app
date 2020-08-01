<template>
  <div class="artist-top-song" v-if="songs && songs.length">
    <div class="song-tools">
      <div class="playall" @click.stop="play">
        <i class="iconfont icon-play" />
        <span>播放热门50</span>
      </div>
      <div class="collection" @click.stop="addToList">
        <i class="iconfont icon-folder" />
        <span>收藏热门50</span>
      </div>
    </div>
    <div class="song-wrapper" v-for="(song, index) in songs" :key="song.id">
      <song-view>
        <div class="index" slot="left">{{ index + 1 }}</div>
        <div class="song-info" slot="center" @click.stop="play(index)">
          <div class="name">{{ song.name }}</div>
          <span class="album">
            {{ song.al.name }}
          </span>
        </div>
        <i class="iconfont icon-more--line" slot="right" @click.stop="showMore(song)" />
      </song-view>
    </div>
  </div>
</template>

<script>
import { getArtistTopSong } from 'networks/artist';
import SongView from 'components/content/SongView.vue';

import { playSongMixin } from 'common/mixin';
export default {
  name: 'ArtistTopSongs',
  components: { SongView },
  mixins: [playSongMixin],
  created() {
    getArtistTopSong(this.id).then(res => {
      this.songs = res.songs;
    });
  },
  data() {
    return {
      songs: []
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    addToList() {
      this.$emit('addToList');
    },
    play(index) {
      this.playSong(this.songs, index);
    },
    showMore(song) {
      this.$emit('showMore', song);
    }
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
.artist-top-song {
  position: relative;
  .song-tools {
    margin: 0 24px;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    font-weight: 500;
    @include font_size($ms);

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
    .index {
      min-width: 50px;
      margin-right: 10px;
    }
  }
}
</style>
