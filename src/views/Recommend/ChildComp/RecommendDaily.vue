<template>
  <div class="recommend-daily">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
    </nav-bar>
    <div class="play-all iconfont fixed" v-show="showFixed" @click="playSong">
      {{ '\ue624' }} 播放全部
    </div>
    <div class="top">
      <div class="date">
        <span class="day">{{ getDate.date }}</span>
        {{ getDate.month }}
      </div>
    </div>
    <scroll ref="scroll" :probeType="3" @scrolling="scrollPosition">
      <div class="list-wrapper">
        <div class="play-all iconfont" @click="playSong">{{ '\ue624' }} 播放全部</div>
        <div
          class="song-wrapper"
          v-for="(song, index) in songs"
          :key="index"
          @click="playSong(index)"
        >
          <img v-lazy="song.al.picUrl" />
          <div class="song-desc">
            <div class="title">{{ song.name }}</div>
            <span class="artist">{{ artists(song.ar) }}</span
            ><span class="album">{{ song.al.name }}</span>
          </div>
          <i class="iconfont icon-more" />
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';
import { fmtTime } from 'common/utils';
import { getArtistsMixin } from 'common/mixin';
import { getDailySong } from 'networks/recommend';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RecommendDaily',
  components: { NavBar, Scroll },
  mixins: [getArtistsMixin],
  data() {
    return {
      date: { day: 1, month: 1 },
      songs: [],
      showFixed: false
    };
  },
  created() {
    getDailySong().then(res => {
      if (res.code === 200) {
        this.songs = res.data.dailySongs;
      }
    });
  },
  computed: {
    ...mapGetters(['isLogin', 'isLoading']),
    getDate() {
      let timestamp = new Date().getTime();
      let time = fmtTime(timestamp / 1000);

      return {
        month: ('' + time.month).length < 2 ? '0' + time.month : time.month,
        date: ('' + time.date).length < 2 ? '0' + time.date : time.date
      };
    }
  },
  methods: {
    ...mapActions(['setPlayList', 'setShowPlayer', 'setCurrentIndex', 'setIsLoading']),
    goBack() {
      this.$router.go(-1);
    },
    playSong(index) {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      this.setPlayList(this.songs);
      typeof index === 'number' ? this.setCurrentIndex(index) : this.setCurrentIndex(0);
      this.setShowPlayer(true);
    },
    scrollPosition(position) {
      position.y <= -300 ? (this.showFixed = true) : (this.showFixed = false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.recommend-daily {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  .nav {
    position: relative;
    z-index: 10;
    background-color: transparent;
    .icon-back {
      color: #fff;
      @include font_size($icon_m);
    }
  }
  .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 300px;
    padding-top: 100px;
    background-color: #444;
    padding: 24px 48px;
    z-index: 0;
    .date {
      position: relative;
      top: 60%;
      color: #fff;
      font-weight: 700;
      .day {
        @include font_size($l);
        &::after {
          content: '/';
          margin-left: 10px;
          font-weight: 400;
          display: inline-block;
          @include font_size($ms);
        }
      }
    }
  }
  .play-all {
    height: 50px;
    padding: 16px 0 8px;
    @include font_size($m);
    &.fixed {
      padding: 12px 24px;
      border-radius: 25px 25px 0 0;
      background-color: #fff;
      position: fixed;
      top: 100px;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 5;
    }
  }
  .scroll-wrapper {
    position: fixed;
    border-radius: 25px 25px;
    overflow: hidden;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    .scroll-content {
      position: relative;
      top: 100px;
      bottom: 0;
      left: 0;
      right: 0;
      .list-wrapper {
        background-color: #fff;
        padding: 0 24px;
        border-radius: 25px 25px;
        position: relative;
        top: 200px;
        bottom: 0;
        padding-bottom: 200px;

        .song-wrapper {
          display: flex;
          align-items: center;
          padding: 12px 0;

          img {
            width: 100px;
            height: 100px;
            margin-right: 20px;
            border-radius: 10px;
          }
          .title {
            @include font_size($ms);
            @include clamp(1);
          }
          span {
            @include font_color();
            @include font_size($s);
          }
          .artist {
            margin-right: 8px;
          }
          .icon-more {
            margin-left: auto;
            color: #ccc;
            @include font_size($icon_m);
          }
        }
      }
    }
  }
}
</style>
