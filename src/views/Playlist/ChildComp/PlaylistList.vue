<template>
  <div class="playlist-list">
    <playlist-header :item="item" :subCount="subCount" @playAll="trackClick(0)" />
    <loading :isShow="loading" />
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

import Loading from 'components/common/Loading/Loading';

import { roundCountMixin, getArtistsMixin } from 'common/mixin';
export default {
  name: 'PlaylistList',
  mixins: [roundCountMixin, getArtistsMixin],
  data() {
    return {
      loading: true
    };
  },
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
    }
  },
  components: { PlaylistHeader, Loading },
  methods: {
    trackClick(index) {
      this.$emit('trackClick', index);
    }
  },
  watch: {
    item() {
      this.$nextTick(function() {
        this.$emit('dataLoaded');
        this.loading = false;
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
