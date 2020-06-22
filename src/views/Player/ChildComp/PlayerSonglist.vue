<template>
  <div class="player-songlist">
    <div class="list-header">
      <div class="playing">
        <span>当前播放</span>
        <span>({{ songlist.length }})</span>
      </div>
      <div class="list-toolbar">
        <div class="play-mode">
          <i class="iconfont icon-loop" />
          <span>列表循环</span>
        </div>
        <div class="add-collection">
          <i class="iconfont icon-folder" />
          <span>收藏全部</span>
        </div>
        <i class="iconfont icon-trash" @click.stop="deleteSong" />
      </div>
    </div>
    <div class="wrapper">
      <scroll ref="scroll" :refreshDelay="500">
        <div
          class="list-content"
          v-for="(track, index) in songlist"
          :key="track.id"
          @click="changeSong(index)"
        >
          <div class="track-info" :class="{ active: currentIndex === index }">
            <i class="iconfont icon-speaker" v-show="currentIndex === index"></i>
            <span class="track-name">{{ track.name }}</span>
            <span class="artist">{{ track.ar && artists(track.ar) }}</span>
          </div>
          <i class="iconfont icon-cross" @click.stop="deleteSong(index)" />
        </div>
      </scroll>
    </div>
    <div class="list-btn" @click="toggleSonglist">关闭</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getArtistsMixin } from 'common/mixin'

import Scroll from 'components/common/Scroll/Scroll'
export default {
  name: 'PlayerSonglist',
  components: { Scroll },
  mixins: [getArtistsMixin],
  methods: {
    ...mapActions(['setPlayStatus', 'setCurrentIndex', 'setRemoveSong']),
    play() {
      this.setPlayStatus(!this.isPlaying)
    },
    toggleSonglist() {
      this.$emit('toggleSonglist', false)
    },
    changeSong(index) {
      this.setCurrentIndex(index)
      this.setPlayStatus(true)
    },
    deleteSong(index) {
      this.setRemoveSong(index)
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentPlaying', 'songlist', 'currentIndex']),
    checkCurrentPlaying: function() {
      return function(index) {
        console.log(index)
        return this.isPlaying && this.currentIndex === index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.player-songlist {
  padding: 25px 30px 5px;
  position: relative;
  z-index: 10;
  .iconfont {
    @include font_size($icon_m);
  }
  .list-header {
    height: 130px;
    display: flex;
    flex-direction: column;
    .playing {
      color: #000;
      span:nth-child(1) {
        display: inline-block;
        margin-right: 5px;
      }
      span:nth-child(2) {
        @include font_size($ms);
        @include font_color();
      }
    }
    .list-toolbar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 15px;
      @include font_size($ms);
      .iconfont {
        @include font_size($icon_s);
        display: inline-block;
        margin-right: 10px;
      }
      .play-mode {
        margin-right: auto;
      }
      .add-collection {
        margin-right: 50px;
      }
    }
  }
  .list-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid #ccc;
    @include font_size($ms);
    .track-info {
      display: flex;
      @include clamp(1);

      .artist {
        @include font_size($s);
        @include font_color();
        &:before {
          content: '-';
          display: inline-block;
          padding: 0 5px;
          font-size: 15px;
        }
      }
      &.active,
      &.active .artist {
        @include font_active_color();
      }
      .icon-speaker {
        @include font_size($icon_s);
        margin-right: 8px;
      }
    }

    .icon-cross {
      @include font_size($s);
      @include font_color();
    }
  }
  .list-btn {
    @include font_size($ms);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
  }
  .wrapper {
    position: relative;
    padding: 0 10px;
    max-height: 600px;
    overflow: hidden;
    z-index: 3000;
    .scroll-wrapper {
      max-height: 600px;
    }
  }
}
</style>
