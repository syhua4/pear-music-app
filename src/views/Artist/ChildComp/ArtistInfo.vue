<template>
  <div class="artist-info" v-if="artistInfo.length">
    <nav-bar class="nav">
      <i class="iconfont icon-back" @click="goBack" slot="left" />
    </nav-bar>
    <scroll-view height="20%" ref="scrollView">
      <div class="cover" slot="cover" :style="{ '--height': coverHeight + 'px' }">
        <img :src="fmtUrl(artistInfo[0].avatar)" />
        <div class="name">{{ artistInfo[0].name }}</div>
        <div class="follow-wrapper">
          <span v-if="artistInfo[0].follows">关注 {{ artistInfo[0].follows }}</span>
          <span v-if="artistInfo[0].followeds">粉丝 {{ artistInfo[0].followeds | round(1) }}</span>
        </div>
      </div>

      <div class="tabbar" slot="tab">
        <span
          v-for="(item, index) in tabbar"
          :key="item"
          :class="{ active: index === activeTab }"
          @click.stop="tabClick(index)"
          >{{ item }}</span
        >
      </div>

      <div class="component-wrapper " slot="component">
        <loading :isShow="loading" />
        <component
          :is="currentComponent"
          :id="id"
          @noData="noData"
          @contentLoaded="contentLoaded"
          ref="comp"
        />
      </div>
    </scroll-view>
  </div>
</template>

<script>
import TopSongs from './ArtistTopSongs';
import Album from './ArtistAlbum';
import Profile from './ArtistProfile';
import NavBar from 'components/common/NavBar/NavBar';
import ScrollView from 'components/content/ScrollView.vue';

import { getUserInfo } from 'networks/user';
import { getArtist } from 'networks/artist';
import { getUrlMixin, roundCountMixin, loadingMixin } from 'common/mixin';

export default {
  name: 'ArtistInfo',
  components: { NavBar, ScrollView },
  mixins: [getUrlMixin, roundCountMixin, loadingMixin],
  data() {
    return {
      artistInfo: [],
      tabbar: ['歌曲', '专辑', '关于TA'],
      activeTab: 0,
      coverHeight: 0,
      id: 0
    };
  },
  async created() {
    this.id = Number(this.$route.params.id);
    if (this.$route.params.uid) {
      this.userInfo(this.$route.params.uid);
    } else {
      await getArtist(this.id).then(res => {
        if (res.artist.accountId) {
          console.log(res.artist.accountId);
          console.log('有 uid');
          this.userInfo(res.artist.accountId);
        } else {
          console.log('没有 uid');

          this.artistInfo.push({
            name: res.artist.name,
            avatar: res.artist.img1v1Url
          });
        }
      });
    }
  },
  updated() {
    this.coverHeight = this.$refs.scrollView.$refs.cover.clientHeight;
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
    async userInfo(uid) {
      await getUserInfo(uid).then(res => {
        console.log(res);

        this.artistInfo.push({
          name: res.profile.artistName,
          avatar: res.profile.avatarUrl,
          followeds: res.profile.followeds || null,
          follows: res.profile.follows || null
        });
      });
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
  bottom: 100px;
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
  .cover {
    color: #fff;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 24px;
    height: var(--height);
    background: #444;
    background-image: url('~assets/images/bg_default.jpg');
    z-index: 1;
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
  .tabbar {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
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
}
</style>
