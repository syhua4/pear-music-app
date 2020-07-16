<template>
  <div class="artist-info">
    <nav-bar class="nav">
      <i class="iconfont icon-back" @click="goBack" slot="left" />
    </nav-bar>
    <div v-if="artistInfo && artistInfo.length" class="cover-wrapper">
      <img class="bg" :src="fmtUrl($route.params.bgUrl)" />
      <div class="cover">
        <img :src="artistInfo[0].avatar" />
        <div class="name">{{ artistInfo[0].name }}</div>
        <div class="follow-wrapper">
          <span>关注 {{ artistInfo[0].follows }}</span>
          <span>粉丝 {{ artistInfo[0].followeds | round(1) }}</span>
        </div>
      </div>
    </div>
    <div class="tabbar">
      <span
        v-for="(item, index) in tabbar"
        :key="item"
        :class="{ active: index === activeTab }"
        @click.stop="tabClick(index)"
        >{{ item }}</span
      >
    </div>

    <scroll :pullUpload="true" @pullUpload="loadMore" ref="scroll">
      <loading :isShow="loading" />
      <component
        :is="currentComponent"
        @noData="noData"
        @contentLoaded="contentLoaded"
        ref="comp"
      />
    </scroll>
  </div>
</template>

<script>
import TopSongs from './ArtistTopSongs';
import Album from './ArtistAlbum';
import Profile from './ArtistProfile';
import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';
import { getUserInfo } from 'networks/login';
import { getUrlMixin, roundCountMixin, loadingMixin } from 'common/mixin';

export default {
  name: 'ArtistInfo',
  components: { NavBar, Scroll },
  mixins: [getUrlMixin, roundCountMixin, loadingMixin],
  data() {
    return {
      artistInfo: [],
      tabbar: ['歌曲', '专辑', '关于TA'],
      activeTab: 0
    };
  },
  created() {
    getUserInfo(this.$route.params.uid).then(res => {
      let info = res.profile;
      this.artistInfo.push({
        name: info.artistName,
        avatar: info.avatarUrl,
        mainAuthType: info.mainAuthType,
        followeds: info.followeds,
        follows: info.follows
      });
    });
  },
  methods: {
    contentLoaded() {
      this.loading = false;
    },

    goBack() {
      this.$router.go(-1);
    },

    noData(toggle) {
      this.loading = toggle;
    },

    tabClick(index) {
      this.activeTab = index;
      this.loading = true;
    },

    async loadMore() {
      if (this.activeTab === 1) {
        await this.$refs.comp.loadMoreAlbum();
        this.$refs.scroll.finishPullUp();
      }
    }
  },
  computed: {
    currentComponent() {
      let curComp;
      switch (this.activeTab) {
        case 0:
          curComp = TopSongs;
          break;
        case 1:
          curComp = Album;
          break;
        case 2:
          curComp = Profile;
          break;
      }
      return curComp;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.artist-info {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #fff;
  .nav {
    color: #fff;
    background-color: transparent;
    position: relative;
    z-index: 2;
    .icon-back {
      @include font_size($icon_ms);
    }
  }
  .cover-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25%;
    z-index: 1;
    padding-top: 100px;
    overflow: hidden;
    background-color: #444;

    .bg {
      position: absolute;
      top: 0;
      width: 100%;
      height: calc(100% + 100px);
      background: #444;
      object-position: center;
      object-fit: cover;
      filter: brightness(0.65);
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0) 25%);
      }
    }

    .cover {
      position: absolute;
      bottom: 15%;
      left: 24px;
      font-weight: 500;
      color: #fff;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: block;
        margin-bottom: 20px;
      }
      .follow-wrapper {
        color: #eee;
        @include font_size($s);
        span {
          margin-right: 20px;
        }
      }
    }
  }
  .tabbar {
    height: 75px;
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    top: calc(25% + 50px);
    background-color: #fff;
    border-radius: 30px 30px 0 0;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    @include font_size($ms);
    z-index: 1;
    span {
      line-height: 75px;
      &.active {
        border-bottom: 3px solid;
        border-color: $font-active-color-theme;
        @include font_active_color();
      }
    }
  }
  .scroll-wrapper {
    position: fixed;
    top: calc(135px + 25%);
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
