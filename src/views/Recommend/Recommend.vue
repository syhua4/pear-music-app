<template>
  <div id="recommend-view">
    <nav-bar class="main-nav">
      <i class="iconfont icon-listen" slot="left"></i>
      <div slot="center" class="header" @click="searchBarClick">
        <search-bar :disable="true" />
      </div>
      <img
        slot="right"
        class="cd"
        v-show="currentPlaying"
        :src="currentPlaying && currentPlaying.al.picUrl + '?param=50x50'"
        :class="!isPlaying ? 'paused' : null"
        @click="togglePlayer"
      />
    </nav-bar>

    <scroll ref="scroll">
      <div class="banner-wrapper">
        <banner :banners="banners" ref="banner" />
      </div>
      <tab-nav />
      <slider-display
        :items="asiaPop"
        class="playlist"
        title="华语精选站"
        @itemClick="playlistClick"
      >
        <div slot="more" class="more">查看更多</div>
      </slider-display>
      <slider-display
        :items="tracks"
        title="欧美流行"
        class="tracks"
        :isSong="true"
        @playSong="playSong"
      >
        <div slot="more" class="more">
          <i class="iconfont icon-play-s" />
          播放全部
        </div>
      </slider-display>
      <slider-display
        :items="kpop"
        class="playlist"
        title="百听不厌的KPOP"
        @itemClick="playlistClick"
      >
        <div slot="more" class="more">查看更多</div>
      </slider-display>
    </scroll>
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
import TabNav from './ChildComp/RecommendTabNav';

import Scroll from 'components/common/Scroll/Scroll';
import NavBar from 'components/common/NavBar/NavBar.vue';

import Banner from 'components/content/Banner';
import SliderDisplay from 'components/content/SliderDisplay';
import SearchBar from 'components/content/SearchBar';

import { getBanners, getPlaylists, getPlaylistTrackId, getTrack } from 'networks/recommend';
import { getTracksMixin } from '../../common/mixin';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Recommend',
  components: {
    Banner,
    NavBar,
    TabNav,
    SliderDisplay,
    SearchBar,
    Scroll
  },
  mixins: [getTracksMixin],
  created() {
    console.log('--recommend page loaded-');
    getBanners(2).then(res => (this.banners = res.banners));
    getPlaylists('华语', 6).then(res => (this.asiaPop = res.playlists));
    getPlaylists('韩语', 6).then(res => (this.kpop = res.playlists));
    getPlaylists('欧美', 1).then(res => {
      getPlaylistTrackId(res.playlists[0].id).then(res => {
        let ids = this.getTrackIds(res.playlist.trackIds, 12);
        getTrack(ids).then(res => {
          this.tracks = res.songs;
        });
      });
    });
  },
  data() {
    return {
      banners: [],
      asiaPop: [],
      kpop: [],
      coverUrl: '',
      transitionName: ''
    };
  },
  methods: {
    ...mapActions(['setShowPlayer']),
    playlistClick(id) {
      this.$router.push(`/playlist/${id}`);
    },
    searchBarClick() {
      this.$router.push(`/search`);
    },
    playSong(picUrl) {
      this.coverUrl = picUrl;
    },
    togglePlayer() {
      this.setShowPlayer(true);
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentPlaying'])
  },
  beforeRouteUpdate(to, from, next) {
    to.meta.index === 0 && from.matched.length > 1
      ? (this.transitionName = 'right')
      : (this.transitionName = 'right');
    next();
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';
#recommend-view {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px;
  .main-nav {
    color: #fff;
    position: relative;
    z-index: 1;
    .header {
      flex: 1;
    }
    .icon-listen,
    .icon-logo {
      @include font_size($icon_m);
      font-weight: 500;
    }
    .cd {
      vertical-align: middle;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      border: 5px solid rgba($color: #fff, $alpha: 0.2);
      animation: spin 3s linear infinite;

      &.paused {
        animation-play-state: paused;
      }
    }
  }
  .scroll-wrapper {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    right: 0;
  }
  .banner-wrapper {
    height: 100px;
    margin-bottom: 220px;
    @include bg_color();
    ::v-deep .swiper-container {
      border-radius: 30px !important;
      overflow: hidden;
      margin: 0 24px;
    }
  }
  .playlist {
    margin-top: 20px;
    margin-left: 24px;
    ::v-deep .swiper-item-img {
      width: 200px;
      border-radius: 15px;
    }
    ::v-deep .swiper-item-text {
      @include font_size($s);
      @include clamp(2);
      padding-top: 5px;
      line-height: 1.3;
    }
  }

  .tracks {
    margin-top: 20px;
    margin-left: 24px;
    .icon-play-s {
      @include font_size($s);
    }
    ::v-deep .swiper-container {
      height: 420px;
      .swiper-slide {
        height: 110px;
      }
      .swiper-item-wrapper {
        display: flex;
        align-items: center;

        .swiper-item-img {
          width: 110px;
          height: 110px;
          border-radius: 15px;
          margin-right: 20px;
        }
        .swiper-item-desc {
          height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          @include font_size($ms);

          @include nowrap();
          .swiper-item-author {
            @include font_size($s);
            @include font_color();
          }
        }
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
