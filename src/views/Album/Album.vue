<template>
  <div id="album">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack"></i>
      <div slot="center" class="header">专辑</div>
    </nav-bar>
    <scroll-view>
      <album-display slot="cover" :item="albumInfo" @multiSelect="multiSelect" />
      <div class="play-all" @click.stop="play" slot="left" v-if="!selectMode">
        <i class="iconfont icon-play" />
        <span class="tool-header">播放全部</span>
      </div>
      <div class="select-all" @click.stop="selectAll" slot="left" v-if="selectMode">
        <i class="iconfont" :class="checkAll ? 'icon-select-fill' : 'icon-select-unfill'" />
        <span class="tool-header">全部</span>
      </div>
      <span slot="right" v-if="selectMode" class="select-all-text" @click="multiSelect">完成</span>
      <album-list
        slot="component"
        ref="list"
        :item="songs"
        :multiSelect="selectMode"
        @trackClick="play"
        @trackMoreClick="trackMoreClick"
        @isChecked="checked"
      />
    </scroll-view>
    <div class="select-toolbar" v-show="selectMode" :class="{ active: isChecked }">
      <div class="play-next" @click="addToPlayer">
        <i class="iconfont icon-add-next" />
        <p>下一首播放</p>
      </div>
      <div class="add-to-playlist" @click="selectPlaylist">
        <i class="iconfont icon-add" />
        <p>收藏到歌单</p>
      </div>
    </div>
    <more-song-options
      :song="song"
      v-show="(song && Object.keys(song).length) | isChecked"
      ref="trackPopUp"
    />
  </div>
</template>

<script>
import AlbumDisplay from './ChildComp/AlbumDisplay';
import AlbumList from './ChildComp/AlbumList';

import NavBar from 'components/common/NavBar/NavBar';
import ScrollView from 'components/content/ScrollView';
import MoreSongOptions from 'components/content/MoreSongOptions.vue';
import { playSongMixin } from 'common/mixin';
import { getAlbum } from 'networks/album';

export default {
  name: 'Album',
  components: { AlbumDisplay, AlbumList, NavBar, ScrollView, MoreSongOptions },
  mixins: [playSongMixin],
  data() {
    return {
      albumInfo: {},
      songs: [],
      song: {},
      selectMode: false,
      checkAll: false,
      isChecked: false
    };
  },
  created() {
    getAlbum(this.$route.params.id).then(res => {
      this.albumInfo = res.album;
      this.songs = res.songs;
    });
  },
  methods: {
    addToPlayer() {
      if (this.isChecked) {
        let ids = this.$refs.list.checkedList;
        let selectedTracks;
        if (this.isChecked) {
          selectedTracks = this.songs.filter(track => {
            return ids.includes(track.id);
          });
        }
        console.log(selectedTracks);
        this.$refs.trackPopUp.addToPlayer('', selectedTracks);
        this.$refs.list.unCheckAll();
        this.checkAll = false;
      }
    },
    selectPlaylist() {
      let ids = this.$refs.list.checkedList.join(',');
      this.$refs.trackPopUp.selectPlaylist('', ids);
    },
    play(index) {
      this.playSong(this.songs, index);
    },
    trackMoreClick(track) {
      this.song = track;
      this.$refs.trackPopUp.showMore = true;
    },
    checked(status) {
      this.isChecked = status;
      if (this.$refs.list.checkedList.length === this.songs.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    selectAll() {
      this.checkAll ? this.$refs.list.unCheckAll() : this.$refs.list.checkAll();
      this.checkAll = !this.checkAll;
    },
    goBack() {
      this.$router.go(-1);
    },
    multiSelect() {
      this.selectMode = !this.selectMode;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
#album {
  background-color: #fff;
  position: fixed;
  top: 0px;
  bottom: 100px;
  left: 0;
  right: 0;
  z-index: 99;
  .nav {
    color: #fff;
    background-color: transparent;
    position: absolute;
    z-index: 10;
    .icon-back {
      @include font_size($icon_ms);
    }
  }
  .select-all {
    font-weight: normal;
    display: flex;
    align-items: center;
    .iconfont {
      @include font_color();
      @include font_size($icon_m);
    }
    .icon-select-fill {
      @include font-active_color();
    }
  }
  .select-all-text {
    @include font_active_color();
  }

  .select-toolbar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background-color: #fff;
    z-index: 99;
    @include bg_color_sub();
    @include font_size($s);
    @include font_color();
    &.active {
      color: #333;
    }
    .iconfont {
      display: inline-block;
      @include font_size($icon_ms);
      margin-bottom: 5px;
    }
  }
  .scroll-wrapper {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
