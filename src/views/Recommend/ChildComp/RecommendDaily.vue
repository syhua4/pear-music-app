<template>
  <div class="recommend-daily">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
    </nav-bar>
    <scroll-view height="20%">
      <div class="cover" slot="cover">
        <div class="date">
          <span class="day">{{ getDate.date }}</span>
          {{ getDate.month }}
        </div>
      </div>
      <div class="play-all" @click.stop="playSong" slot="left">
        <i class="iconfont icon-play" />
        <span class="tool-header">播放全部</span>
      </div>
      <div class="multi-select" slot="right">
        <i class="iconfont icon-select-list" /><span>多选</span>
      </div>

      <div slot="component">
        <loading :isShow="loading" v-if="loading" />
        <div
          v-else
          class="song-wrapper"
          v-for="(song, index) in songs"
          :key="index"
          @click="playSong(index)"
        >
          <song-view>
            <img v-lazy="fmtUrl(song.al.picUrl)" slot="left" />
            <div class="song-desc" slot="center">
              <div class="title">{{ song.name }}</div>
              <span class="artist">{{ artists(song.ar) }}</span>
              <span class="album">{{ song.al.name }}</span>
            </div>
            <i class="iconfont icon-more--line" slot="right" />
          </song-view>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import ScrollView from 'components/content/ScrollView.vue';

import { fmtDate } from 'common/utils';
import { getArtistsMixin, getUrlMixin, loadingMixin } from 'common/mixin';
import { getDailySong } from 'networks/recommend';
import { mapGetters, mapActions } from 'vuex';
import SongView from 'components/content/SongView.vue';

export default {
  name: 'RecommendDaily',
  components: { NavBar, ScrollView, SongView },
  mixins: [getArtistsMixin, getUrlMixin, loadingMixin],
  data() {
    return {
      date: { day: 1, month: 1 },
      songs: [],
      showFixed: false
    };
  },
  created() {
    if (this.isLogin && this.cookie) {
      getDailySong(this.cookie).then(res => {
        if (res.code === 200) {
          this.songs = res.data.dailySongs;
        } else {
          this.$toast.show(res, 2000);
        }
      });
    } else {
      this.$toast.show('请先登录', 1000);
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'isLoading', 'cookie']),
    getDate() {
      let timestamp = new Date().getTime();
      let time = fmtDate(timestamp / 1000);

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
  },
  watch: {
    songs() {
      this.$nextTick(function() {
        this.loading = false;
      });
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
  bottom: 100px;
  z-index: 1;
  background-color: #fff;
  .nav {
    position: relative;
    z-index: 10;
    background-color: transparent;
    .icon-back {
      color: #fff;
      @include font_size($icon_ms);
    }
  }
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 300px;
    padding-top: 100px;
    background: #444;
    background-image: url('~assets/images/bg_default.jpg');
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
  .song-wrapper {
    display: flex;

    img {
      width: 80px;
      height: 80px;
      margin-right: 20px;
      border-radius: 10px;
    }
  }
}
</style>
