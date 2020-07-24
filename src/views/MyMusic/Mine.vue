<template>
  <div id="mine" :style="{ '--position': popUp ? 'fixed' : 'relative' }" @click.stop="screenClick">
    <nav-bar class="nav">
      <i class="iconfont icon-next" slot="right" />
    </nav-bar>
    <div class="top-display">
      <img v-if="!isLogin" src="~assets/images/user_default.png" class="avatar" />
      <img v-else :src="fmtUrl(profile.avatar)" class="avatar" />

      <span class="nickname">{{ isLogin ? profile.nickname : '登录立享多端同步' }}</span>
      <span class="login-btn" v-if="!isLogin" @click="loginClick">立即登录</span>
    </div>
    <div class="mine-wrapper">
      <scroll>
        <div class="header">我的音乐</div>
        <div class="panel-wrapper">
          <div class="panel like" @click="myFavListClick">
            <i class="iconfont icon-heart-filled" />
            <div class="text">我喜欢的音乐</div>
          </div>
          <div class="panel" @click="playSong">
            <i class="iconfont icon-radio2" />
            <div class="text">私人FM</div>
          </div>
        </div>
        <slider-display
          title="最近播放"
          ref="slider"
          :isSong="true"
          :sliderOption="{ slidesPerView: 2.1, slidesPerColumn: 1 }"
          :items="getSlicedSongs"
          changeIcon="icon-play-btn"
          class="slider"
        >
          <div class="more" slot="more">
            更多
            <i class="iconfont icon-next" />
          </div>
        </slider-display>
        <div
          class="no-content"
          v-if="!historyList.length"
          :style="{ color: isLogin ? '#4d7daf' : '#ccc' }"
        >
          快开启音乐之旅吧!
        </div>
        <div class="header">
          <span
            v-for="(item, index) in tabbar"
            :key="index"
            :class="{ inactive: activeTab !== index }"
            @click="tabClick(index)"
            >{{ item }}</span
          >
          <div class="icons">
            <i class="iconfont icon-plus" @click.stop="togglePopUp" />
            <i class="iconfont icon-setting" @click.stop="settingClick" />
          </div>
        </div>
        <div class="playlist-wrapper" v-if="currentPlaylist.length">
          <div
            class="playlist"
            v-for="item in currentPlaylist"
            :key="item.id"
            @click="playlistClick(item.id)"
          >
            <img class="playlist-img" v-lazy="fmtUrl(item.coverImgUrl)" />
            <div class="desc">
              <div class="title">{{ item.name }}</div>
              <div class="count">{{ item.trackCount }}首</div>
            </div>
          </div>
        </div>
        <div
          class="no-content"
          v-if="!playlist.length"
          :style="{ color: isLogin ? '#4d7daf' : '#ccc' }"
        >
          新建歌单
        </div>
      </scroll>
    </div>
    <transition name="slide">
      <pop-up
        class="pop-up"
        v-show="popUp"
        ref="popup"
        @cancel="togglePopUp"
        @submit="createList"
      />
    </transition>
  </div>
</template>

<script>
import PopUp from './ChildComp/MinePopUp';

import Scroll from 'components/common/Scroll/Scroll';
import NavBar from 'components/common/NavBar/NavBar';
import SliderDisplay from 'components/content/SliderDisplay';

import { getUrlMixin } from 'common/mixin';
import { mapActions, mapGetters } from 'vuex';
import { getPlaylist, createPlaylist, getFM } from 'networks/user';
export default {
  name: 'Mine',
  components: { PopUp, Scroll, NavBar, SliderDisplay },
  mixins: [getUrlMixin],
  data() {
    return {
      songs: [],
      playlist: [],
      tabbar: ['创建歌单', '收藏歌单'],
      activeTab: 0,
      popUp: false,
      fm: []
    };
  },
  created() {
    if (this.isLogin && this.cookie && this.profile.uid) {
      let list = JSON.parse(window.localStorage.getItem('historyList'));
      if (!list) {
        return;
      }
      this.setHistoryList(list);
      getFM(this.cookie).then(res => {
        res.data.map(song => {
          this.fm.push({
            id: song.id,
            name: song.name,
            al: { picUrl: song.album.picUrl },
            ar: [{ name: song.artists.map(i => i.name).join(' / ') }]
          });
        });
      });

      getPlaylist(this.profile.uid, this.cookie).then(res => {
        this.playlist = res.playlist;
      });
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'cookie', 'profile', 'isLoading', 'historyList']),
    currentPlaylist() {
      let list;
      if (this.activeTab === 0) {
        let t = this.playlist.filter(item => {
          return item.creator.userId === this.profile.uid;
        });
        list = t.slice(1);
      } else {
        list = this.playlist.filter(item => {
          return item.creator.userId !== this.profile.uid;
        });
      }
      return list;
    },

    getSlicedSongs() {
      let revList = [...this.historyList].reverse();
      return revList.slice(0, 3);
    },
    getSlicedPlaylist() {
      return this.playlist.slice(1);
    }
  },
  methods: {
    ...mapActions([
      'setPlayList',
      'setShowPlayer',
      'setCurrentIndex',
      'setIsLoading',
      'setHistoryList'
    ]),
    async createList(name) {
      await createPlaylist(name, this.cookie).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$toast.show('创建成功', 500);
          this.$router.push(`/playlists/${res.id}`);
        } else {
          this.$toast.show('创建歌单失败, 请重试', 1000);
        }
      });
      this.togglePopUp();
    },
    loginClick() {
      this.$router.push('/account');
    },
    myFavListClick() {
      this.$router.push(`/playlists/${this.playlist[0].id}`);
    },
    noFunc() {
      this.$toast.show('功能还没完成哦', 1000);
    },
    playlistClick(id) {
      this.$router.push(`/playlists/${id}`);
    },
    playSong() {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      this.setPlayList(this.fm);
      this.setCurrentIndex(0);
      this.setShowPlayer(true);
    },
    screenClick(e) {
      if (this.popUp) {
        let clickable = window.innerHeight - this.$refs.popup.$el.clientHeight;
        if (e.clientY < clickable) {
          this.popUp = false;
        }
      }
    },
    settingClick() {
      if (!this.currentPlaylist.length) {
        this.$toast.show('请先添加歌单至收藏哦', 1000);
      }
    },
    tabClick(index) {
      this.activeTab = index;
    },
    togglePopUp() {
      this.popUp = !this.popUp;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
#mine {
  position: fixed;
  z-index: 1;
  bottom: 100px;
  @include font_size($ms);
  &::after {
    content: '';
    position: var(--position);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #444;
    filter: opacity(0.4);
  }
  .nav {
    color: #fff;
    position: relative;
    z-index: 2;
    background-color: transparent;
    .icon-next {
      @include font_size($icon_ms);
    }
  }
  .top-display {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 15%;
    padding: 100px 24px 50px 50px;
    background: #444 url('~assets/images/bg_default.jpg') no-repeat top center;
    display: flex;
    align-items: center;
    color: #fff;
    .avatar {
      height: 100px;
      width: 100px;
      object-fit: cover;
      margin-right: 20px;
      border-radius: 50%;
      background: #ddd;
    }
    .login-btn {
      margin-left: auto;
      border-radius: 30px;
      border: 1px solid #fff;
      padding: 10px 20px;
      @include font_size($s);
    }
  }

  .mine-wrapper {
    position: absolute;
    background-color: #fff;
    top: calc(15% + 100px);
    bottom: 100px;
    left: 0;
    right: 0;
    border-radius: 30px 30px 0 0;
    .scroll-wrapper {
      position: fixed;
      top: calc(15% + 100px);
      bottom: 100px;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .header {
      padding: 20px 24px;
      font-weight: 500;
      display: flex;
      span {
        margin-right: 30px;
        &.inactive {
          @include font_color();
        }
      }
      .icons {
        margin-left: auto;
        display: flex;
        align-items: center;
        @include font_color();
        .icon-plus {
          @include font_size($icon_ms);
          margin-right: 30px;
        }
        .icon-setting {
          @include font_size($icon_m);
        }
      }
    }
    .panel-wrapper {
      height: 200px;
      margin: 0 24px;
      display: flex;
      justify-content: space-between;
      .like {
        margin-right: 20px;
      }
      .panel {
        width: 50%;
        border-radius: 30px;
        background-color: rgba($color: #000, $alpha: 0.75);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .icon-heart-filled,
        .icon-radio2 {
          @include font_size($icon_l);
          margin-bottom: 10px;
        }
        .icon-heart-filled {
          @include font_active_color();
        }
      }
    }
    .slider {
      margin: 0 24px;
      padding: 20px 0;
      .more {
        color: #ccc;
        border: none;
        margin-right: 0;
        padding-right: 0;
        @include font_size($ms);
        .icon-next {
          @include font_size($icon_s);
        }
      }
      ::v-deep .title {
        @include font_size($ms);
      }
      ::v-deep .swiper-item-wrapper {
        display: flex;
        align-items: center;
        .swiper-item-img {
          width: 120px;
          height: 120px;
          border-radius: 15px;
          margin-right: 20px;
          flex-shrink: 0;
          object-fit: cover;
        }
        .swiper-item-desc {
          .swiper-item-text {
            @include clamp(1);
          }
          .swiper-item-author {
            @include font_size($s);
            @include font_color();
            @include clamp(1);
          }
        }

        .icon-play-btn {
          position: absolute;
          left: 60px;
          transform: translate(-50%);
          background-color: rgba($color: #fff, $alpha: 0.6);
          border-radius: 50%;
          padding: 10px 8px 10px 12px;
          @include font_active_color();
          @include font_size($icon_s);
        }
      }
    }
    .playlist-wrapper {
      margin: 0 24px;
      padding: 20px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .playlist {
        width: 50%;
        display: flex;
        padding-bottom: 30px;
        .playlist-img {
          width: 120px;
          height: 120px;
          border-radius: 15px;
          margin-right: 20px;
          flex-shrink: 0;
          object-fit: cover;
        }
        .desc {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin-right: 20px;
          .title {
            @include clamp(2);
          }
          .count {
            @include font_color();
            @include clamp(1);
            @include font_size($s);
          }
        }
      }
    }
    .no-content {
      margin: 0 24px;
      border: 2px solid #eee;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
    }
  }

  .pop-up {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    padding: 0 24px;
    background-color: #fff;
    height: 250px;
    border-radius: 30px 30px 0 0;
  }
}
</style>
