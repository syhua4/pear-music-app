<template>
  <div class="recently-played">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
      <div class="title" slot="center">最近播放</div>
    </nav-bar>
    <div class="tools">
      <div class="play-all" @click.stop="play()" v-if="!multiSelect">
        <i class="iconfont icon-play" />
        <span class="tool-header">播放全部</span>
      </div>
      <div class="multi-select" @click.stop="toggleSelect" v-if="!multiSelect">
        <i class="iconfont icon-select-list" />
        <span>多选</span>
      </div>

      <div class="select-all" slot="left" v-if="multiSelect" @click.stop="toggleCheck">
        <i class="iconfont" :class="checkall ? 'icon-select-fill' : 'icon-select-unfill'" />
        <span class="tool-header">全部</span>
      </div>
      <div class="close-select" slot="right" @click.stop="toggleSelect" v-if="multiSelect">
        完成
      </div>
    </div>
    <scroll>
      <div class="song-wrapper" v-for="(song, index) in historyList" :key="song.id">
        <song-view>
          <i
            class="iconfont "
            slot="left"
            v-if="multiSelect"
            @click="check(song.id)"
            :class="checkedList.includes(song.id) ? 'icon-select-fill' : 'icon-select-unfill'"
          />
          <div class="song-desc" slot="center" @click="play(index)">
            <div class="title">{{ song.name }}</div>
            <span class="artist">{{ artists(song.ar) }}</span>
            <span class="album">{{ song.al.name }}</span>
          </div>
          <i class="iconfont icon-more--line" slot="right" @click.stop="songClick(song)" />
        </song-view>
      </div>
    </scroll>
    <div class="select-toolbar" v-show="multiSelect" :class="{ active: checkedList.length }">
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
      v-show="song && Object.keys(song).length | checkedList.length"
      ref="trackPopUp"
    />
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';
import SongView from 'components/content/SongView';
import { getArtistsMixin, playSongMixin, selectionMixin, getTracksMixin } from 'common/mixin';
import MoreSongOptions from '../../../components/content/MoreSongOptions.vue';
import { getTrack } from 'networks/recommend';

import { mapGetters } from 'vuex';
export default {
  name: 'MineRecentlyPlayed',
  components: { NavBar, Scroll, SongView, MoreSongOptions },
  mixins: [getArtistsMixin, playSongMixin, selectionMixin, getTracksMixin],
  data() {
    return {
      song: {},
      multiSelect: false,
      checkall: false
    };
  },
  computed: {
    ...mapGetters(['historyList'])
  },
  methods: {
    async addToPlayer() {
      let selectedTracks;
      if (this.checkedList.length) {
        selectedTracks = this.historyList.filter(song => {
          return this.checkedList.includes(song.id);
        });
      }
      let ids = this.getTrackIds(selectedTracks);
      await getTrack(ids).then(res => {
        this.$refs.trackPopUp.addToPlayer('', res.songs);
      });
      this.unCheckAll();
      this.checkall = false;
    },
    selectPlaylist() {
      let ids = this.checkedList.join(',');
      this.$refs.trackPopUp.selectPlaylist('', ids);
    },
    goBack() {
      this.$parent.toggleRecentlyPlayed();
    },
    play(index) {
      this.playSong(this.historyList, index);
    },
    songClick(song) {
      this.song = song;
      this.$refs.trackPopUp.showMore = true;
    },
    toggleSelect() {
      this.multiSelect = !this.multiSelect;
      this.unCheckAll();
      this.checkall = false;
    },
    toggleCheck() {
      if (this.checkall) {
        this.unCheckAll();
      } else {
        this.checkAll(this.historyList);
      }
      this.checkall = !this.checkall;
    }
  }
};
</script>

<style lang="scss" scoped>
.recently-played {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
  .nav {
    position: relative;
    z-index: 2;
    color: #fff;
    .iconfont {
      @include font_size($icon_ms);
    }
  }
  .tools {
    height: 80px;
    display: flex;
    padding: 0 24px;
    align-items: center;
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    z-index: 2;
    .iconfont {
      @include font_size($icon_s);
      &.icon-play {
        @include font_size($icon_ms);
      }
      &.icon-select-fill,
      &.icon-select-unfill {
        @include font_size($icon_m);
        @include font_color();
      }
      &.icon-select-fill {
        @include font_active_color();
      }
    }
    .play-all {
      display: flex;
      align-items: center;
      .iconfont {
        margin-right: 15px;
      }
      font-weight: 500;
    }
    .multi-select,
    .close-select {
      margin-left: auto;
    }
  }
  .scroll-wrapper {
    position: absolute;
    top: 180px;
    left: 0;
    right: 0;
    bottom: 0px;
    z-index: 1;

    .song-wrapper {
      display: flex;
    }
  }
  .icon-select-fill,
  .icon-select-unfill {
    min-width: 50px !important;
  }

  .select-all {
    display: flex;
    align-items: center;
  }
  .icon-select-fill,
  .icon-select-unfill {
    @include font_size($icon_m);
    @include font_color();
  }
  .icon-select-fill,
  .close-select {
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
}
</style>
