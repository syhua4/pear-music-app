<template>
  <div class="album">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack"></i>
      <div slot="center" class="header">专辑</div>
    </nav-bar>
    <player-toolbar
      v-show="showFixed"
      :item="songs"
      :subCount="songs.length"
      @playAll="play"
      class="fixed"
    />

    <div
      class="album-display"
      v-if="albumInfo && Object.keys(albumInfo).length > 0"
      :style="{ backgroundImage: backgroundImage }"
    >
      <div class="display-wrapper">
        <div class="main-display">
          <div class="display-img-wrapper">
            <img v-lazy="fmtUrl(albumInfo.picUrl)" />
          </div>
          <div class="display-content-wrapper">
            <div class="title">{{ albumInfo.name }}</div>
            <div class="artist">
              <span class="name">{{ artists(albumInfo.artists) }}</span>
              <i class="iconfont icon-next" />
            </div>
            <div class="pub-time">发行时间: {{ getDate(albumInfo.publishTime) }}</div>
            <div class="desc">
              <span class="text">{{ albumInfo.description }}</span>
              <i class="iconfont icon-next" />
            </div>
          </div>
        </div>
        <div class="sub-display">
          <div class="btn-wrapper">
            <i class="iconfont icon-comment" />
            <span class="btn-text">{{ albumInfo.info.commentCount | round }}</span>
          </div>
          <div class="btn-wrapper">
            <i class="iconfont icon-share" />
            <span class="btn-text">{{ albumInfo.info.shareCount | round }}</span>
          </div>
          <div class="btn-wrapper">
            <i class="iconfont icon-download" />
            <span class="btn-text">下载</span>
          </div>
          <div class="btn-wrapper">
            <i class="iconfont icon-select" />
            <span class="btn-text">多选</span>
          </div>
        </div>
      </div>
    </div>
    <scroll ref="scroll" :probeType="3" @scrolling="scrollPosition">
      <div class="playlist-list" ref="list">
        <player-toolbar :item="songs" :subCount="songs.length" @playAll="play" />
        <loading :isShow="loading" />
        <div
          class="track-wrapper"
          v-for="(track, index) in songs"
          :key="track.id"
          @click="play(index)"
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
    </scroll>
  </div>
</template>

<script>
import PlayerToolbar from 'views/Playlist/ChildComp/PlaylistListHeader';

import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';

import { fmtDate } from 'common/utils';
import {
  roundCountMixin,
  getUrlMixin,
  getArtistsMixin,
  loadingMixin,
  playSongMixin
} from 'common/mixin';
import { getAlbum } from 'networks/album';
export default {
  name: 'Album',
  mixins: [roundCountMixin, getUrlMixin, getArtistsMixin, loadingMixin, playSongMixin],
  components: { NavBar, PlayerToolbar, Scroll },
  data() {
    return {
      backgroundImage: '',
      albumInfo: {},
      songs: [],
      offsetTop: 0,
      showFixed: false
    };
  },
  created() {
    getAlbum(this.$route.params.id).then(res => {
      this.albumInfo = res.album;
      this.songs = res.songs;
    });
  },
  mounted() {
    this.offsetTop = this.$refs.list.offsetTop;
  },
  computed: {
    getDate() {
      return function(date) {
        let time = fmtDate(date / 1000);
        return `${time.year}-${time.month}-${time.date}`;
      };
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    play(index) {
      this.playSong(this.songs, index);
    },
    scrollPosition(position) {
      if (this.offsetTop && position.y <= -this.offsetTop) {
        this.showFixed = true;
      } else {
        this.showFixed = false;
      }
    }
  },
  watch: {
    albumInfo: {
      deep: true,
      handler(val) {
        if (Object.keys(val).length > 0) {
          this.backgroundImage = `url(${this.fmtUrl(val.picUrl)})`;
        }
      }
    },
    songs: {
      deep: true,
      handler() {
        this.$nextTick(function() {
          this.loading = false;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
@import 'assets/css/variable';

.album {
  background-color: #fff;
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  .nav {
    color: #fff;
    background-color: transparent;
    .icon-back {
      @include font_size($icon_ms);
    }
    position: absolute;
    z-index: 10;
  }
  .album-display {
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    bottom: 0;
    padding-top: 100px;
    background: #444 no-repeat center;
    background-size: cover;
    z-index: 0;
    &::after {
      content: '';
      position: absolute;
      top: -40px;
      left: -40px;
      right: -40px;
      bottom: 0px;
      background: inherit;
      filter: blur(30px) brightness(70%);
      z-index: 1;
      -webkit-transform: translateZ(0);
      -webkit-perspective: 1000;
      -webkit-backface-visibility: hidden;
    }
    .main-display {
      display: flex;
      justify-content: space-between;
      padding: 65px 24px;
      z-index: 2;
      position: relative;
      .display-img-wrapper {
        width: 300px;
        height: 300px;
        flex: 0 0 auto;
        position: relative;
        margin-right: 20px;
        &:after {
          content: '';
          display: block;
          height: 100%;
          position: absolute;
          top: 0;
          width: 100%;
          border-radius: 15px;

          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0) 25%);
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 15px;
          box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.4);
        }
        span {
          position: absolute;
          z-index: 1;
          top: 10px;
          right: 16px;
          align-self: flex-start;
          color: #fff;
          @include font_size($s);
          .icon-play-s {
            margin-right: -8px;
            @include font_size($ms);
          }
        }
      }
      .display-content-wrapper {
        display: flex;
        flex-direction: column;
        @include font_color_sub();
        .title {
          color: #fff;
          @include clamp(2);
        }
        .artist {
          display: flex;
          height: 60px;
          margin-top: 15px;
          align-items: center;
          @include font_size($ms);
        }
        .pub-time {
          margin-top: auto;
          @include font_size($s);
        }
        .desc {
          display: flex;
          align-items: center;
          @include font_size($s);
          @include clamp(1);
        }
        .icon-next {
          margin-left: 5px;
          @include font_size($s);
        }
      }
    }
    .sub-display {
      height: 110px;
      width: 100%;
      color: #fff;
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-around;
      text-align: center;
      .btn-wrapper {
        display: flex;
        flex-direction: column;
        .iconfont {
          margin-bottom: 5px;
          font-weight: 500;
          @include font_size($icon_m);
        }
        span {
          @include font_size($s);
        }
      }
    }

    // z-index: 1000;
  }
  .scroll-wrapper {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    right: 0;
    overflow: hidden;
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
