<template>
  <div class="playlist-list">
    <playlist-header :item="item" :subCount="subCount" @playAll="trackClick(0)" :myList="myList" />
    <loading :isShow="loading" v-if="!newList" />
    <span class="add-btn" @click="addSong" v-if="newList">添加歌曲</span>
    <div
      class="track-wrapper"
      v-for="(track, index) in item"
      :key="track.id"
      @click="trackClick(index)"
    >
      <span class="index">{{ index + 1 }}</span>
      <div class="track-info">
        <div class="track-title">{{ track.name }}</div>
        <div class="track-desc">
          <span class="track-artist">{{ artists(track.ar) }}</span>
          <span class="track-album">{{ track.al.name }}</span>
        </div>
      </div>
      <i class="iconfont icon-more--line" />
    </div>
  </div>
</template>

<script>
import PlaylistHeader from './PlaylistListHeader';

import { roundCountMixin, getArtistsMixin, loadingMixin } from 'common/mixin';
export default {
  name: 'PlaylistList',
  mixins: [roundCountMixin, getArtistsMixin, loadingMixin],
  props: {
    item: {
      type: Array,
      default: () => [],
      required: true
    },
    subCount: {
      type: Number,
      default: 0,
      required: true
    },
    isFixed: {
      type: Boolean,
      default: false
    },

    myList: {
      type: Boolean,
      default: false
    },
    newList: {
      type: Boolean,
      default: false
    }
  },
  components: { PlaylistHeader },
  methods: {
    addSong() {
      this.$emit('addSong');
    },
    trackClick(index) {
      this.$emit('trackClick', index);
    }
  },
  watch: {
    item() {
      this.$nextTick(function() {
        this.loading = false;
        this.$emit('dataLoaded');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.playlist-list {
  position: relative;
  padding-bottom: 600px;
  z-index: 2;
  top: 550px;
  bottom: 0;
  width: 100%;
  .add-btn {
    display: block;
    position: absolute;
    top: 150px;
    left: 50%;
    padding: 10px 100px;
    border: 2px solid;
    border-radius: 30px;
    border-color: $border-color-theme;
    transform: translateX(-50%);
    @include font_size($ms);
    @include font_active_color();
  }
  .track-wrapper {
    // position: relative;
    display: flex;
    background-color: #fff;
    align-items: center;
    padding: 15px 24px;
    margin-bottom: -1px;
    @include font_color();
    .index {
      width: 60px;
      margin-right: 10px;
      text-align: center;
    }

    .track-info {
      color: #333;
      width: 80%;
      .track-title {
        @include clamp(1);
      }
      .track-desc {
        @include nowrap();
        color: #666;
        @include font_size($s);
        .track-album::before {
          content: '-';
          display: inline-block;
          padding: 0 5px;
        }
      }
    }

    .icon-more--line {
      margin-left: auto;
      font-weight: 700;
      @include font_size($m);
    }
  }
}
</style>
