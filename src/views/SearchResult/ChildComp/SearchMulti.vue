<template>
  <div class="result-multi">
    <panel-view
      title="单曲"
      :footer="results.song.more ? results.song.moreText : ''"
      btnText="播放全部"
      @btnClick="btnClick"
      @footerClick="footerClick(1)"
      v-if="songs && songs.length !== 0"
    >
      <song :results="songs" ref="song" :isShow="false" v-bind="$attrs" />
    </panel-view>
    <panel-view
      title="歌单"
      :footer="results.playList.more ? results.playList.moreText : ''"
      @footerClick="footerClick(2)"
      v-if="playlists && playlists.length !== 0"
    >
      <playlist :results="playlists" />
    </panel-view>
    <panel-view
      title="视频"
      :footer="results.video.more ? results.video.moreText : ''"
      @footerClick="footerClick(5)"
      v-if="videos && videos.length !== 0"
      @click.native="noFunc"
    >
      <videos :results="videos" />
    </panel-view>
    <panel-view title="相关搜索" v-if="sim_querys && sim_querys.length !== 0">
      <div class="query">
        <span v-for="query in sim_querys" :key="query.keyword">{{ query.keyword }}</span>
      </div>
    </panel-view>
    <panel-view
      title="歌手"
      :footer="results.artist.more ? results.artist.moreText : ''"
      @footerClick="footerClick(3)"
      v-if="artists && artists.length !== 0"
    >
      <artist :results="artists" />
    </panel-view>
    <panel-view
      title="专辑"
      :footer="results.album.more ? results.album.moreText : ''"
      @footerClick="footerClick(4)"
      v-if="albums && albums.length !== 0"
    >
      <album :results="albums" />
    </panel-view>
  </div>
</template>

<script>
import Song from './SearchSong';
import Playlist from './SearchPlaylist';
import Artist from './SearchArtist';
import Album from './SearchAlbum';
import Videos from './SearchVideo';

import PanelView from 'components/content/PanelView';

export default {
  name: 'SearchMulti',
  components: {
    PanelView,
    Song,
    Playlist,
    Artist,
    Album,
    Videos
  },
  data() {
    return {
      songs: [],
      playlists: [],
      videos: [],
      sim_querys: [],
      artists: [],
      albums: []
    };
  },
  props: {
    results: {
      type: [Object, Array],
      default: () => {},
      required: true
    }
  },
  methods: {
    btnClick() {
      this.$refs.song.playSong();
    },
    footerClick(index) {
      this.$emit('changeTabNav', index);
    },
    noFunc() {
      this.$toast.show('demo不包括视频哦', 1000);
    }
  },
  watch: {
    results: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.albums = val.album ? val.album.albums : [];
          this.artists = val.artist ? val.artist.artists : [];
          this.playlists = val.playList ? val.playList.playLists : [];
          this.songs = val.song ? val.song.songs : [];
          this.videos = val.video ? val.video.videos : [];
          this.sim_querys = val.sim_query ? val.sim_query.sim_querys : [];
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.result-multi {
  .query {
    display: flex;
    flex-wrap: wrap;
    margin: 0 24px;
    span {
      background-color: #eee;
      border-radius: 20px;
      padding: 5px 20px;
      margin-right: 16px;
      margin-bottom: 16px;
      @include font_size($s);
    }
  }
}
</style>
