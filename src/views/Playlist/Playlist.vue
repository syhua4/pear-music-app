<template>
  <div id="playlist-view">
    <nav-bar class="playlist-nav">
      <i class="iconfont icon-back" slot="left" @click="goBack"></i>
      <div slot="center" class="header">歌单</div>
      <i class="iconfont icon-more--line" slot="right"></i>
    </nav-bar>
    <playlist-display :item="playlistInfo" />
    <playlist-header
      v-show="showFixed"
      :item="tracks"
      :subCount="playlistInfo.subscribedCount"
      class="fixed"
      @playAll="trackClick(0)"
    />
    <scroll ref="scroll" :probeType="3" @scrolling="scrollPosition">
      <playlist-list
        :item="tracks"
        :subCount="playlistInfo.subscribedCount"
        ref="list"
        @trackClick="trackClick"
        @dataLoaded="dataLoaded"
      />
    </scroll>
  </div>
</template>

<script>
import PlaylistDisplay from './ChildComp/PlaylistDisplay';
import PlaylistList from './ChildComp/PlaylistList';
import PlaylistHeader from './ChildComp/PlaylistListHeader';

import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';

import { getPlaylistTrackId, getTrack } from 'networks/recommend.js';
import { getTracksMixin } from '../../common/mixin';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Playlist',
  components: {
    NavBar,
    Scroll,
    PlaylistDisplay,
    PlaylistList,
    PlaylistHeader
  },
  mixins: [getTracksMixin],
  created() {
    getPlaylistTrackId(this.$route.params.id).then(res => {
      let ids;
      this.playlistInfo = res.playlist;
      if (res.playlist.trackIds.length > 800) {
        ids = this.getTrackIds(res.playlist.trackIds.slice(0, 800));
      } else {
        ids = this.getTrackIds(res.playlist.trackIds);
      }
      getTrack(ids).then(res => {
        console.log(res);
        this.tracks = res.songs;
      });
    });
  },
  mounted() {
    this.offsetTop = this.$refs.list.$el.offsetTop;
  },
  data() {
    return {
      playlistInfo: {},
      tracks: [],
      showFixed: false,
      offsetTop: 0
    };
  },
  methods: {
    ...mapActions([
      'setPlayList',
      'setCurrentIndex',
      'setShowPlayer',
      'setPlayStatus',
      'setIsLoading'
    ]),
    dataLoaded() {
      this.$refs.scroll.refresh();
    },
    goBack() {
      this.$router.go(-1);
    },
    scrollPosition(position) {
      if (this.offsetTop && position.y <= -this.offsetTop) {
        this.showFixed = true;
      } else {
        this.showFixed = false;
      }
    },
    trackClick(index) {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      this.setPlayList(this.tracks);
      this.setCurrentIndex(index);
      this.setShowPlayer(true);
    },
    playAll() {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      this.setPlayList(this.tracks);
      this.setCurrentIndex(0);
      this.setShowPlayer(true);
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
#playlist-view {
  background-color: #fff;
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  .playlist-nav {
    color: #fff;
    background-color: transparent;
    .icon-back {
      @include font_size($icon_m);
    }
    .icon-more--line {
      @include font_size($icon_l);
    }
    position: absolute;
    z-index: 10;
  }
  .scroll-wrapper {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .scroll-content {
    position: relative;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .fixed {
    height: 100px;
    background-color: #fff;
    position: fixed;
    top: 100px;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 5;
  }
}
</style>
