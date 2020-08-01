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
      <div class="play-all" @click.stop="play" slot="left" v-if="!multiSelect">
        <i class="iconfont icon-play" />
        <span class="tool-header">播放全部</span>
      </div>
      <div class="multi-select" slot="right" @click.stop="toggleSelect" v-if="!multiSelect">
        <i class="iconfont icon-select-list" />
        <span>多选</span>
      </div>

      <div class="select-all" slot="left" v-if="multiSelect" @click.stop="toggleCheck">
        <i class="iconfont" :class="checkall ? 'icon-select-fill' : 'icon-select-unfill'" />
        <span class="tool-header">全部</span>
      </div>
      <div class="close-select" slot="right" @click.stop="toggleSelect" v-if="multiSelect">
        完成
      </div>

      <div slot="component">
        <loading :isShow="loading" v-if="loading && isLogin" />
        <div v-else class="song-wrapper" v-for="(song, index) in songs" :key="index">
          <song-view>
            <i
              class="iconfont "
              slot="left"
              v-if="multiSelect"
              @click="check(song.id)"
              :class="checkedList.includes(song.id) ? 'icon-select-fill' : 'icon-select-unfill'"
            />
            <div class="song-info" slot="center" @click="play(index)">
              <img v-lazy="fmtUrl(song.al.picUrl)" />
              <div class="song-desc">
                <div class="title">{{ song.name }}</div>
                <span class="artist">{{ artists(song.ar) }}</span>
                <span class="album">{{ song.al.name }}</span>
              </div>
            </div>
            <i class="iconfont icon-more--line" slot="right" @click.stop="songClick(song)" />
          </song-view>
        </div>
      </div>
    </scroll-view>

    <div class="select-toolbar" v-show="multiSelect" :class="{ active: checkedList.length }">
      <div class="play-next" @click="addToPlayer">
        <i class="iconfont icon-add-next" />
        <p>下一首播放</p>
      </div>
      <div class="add-to-playlist" @click="selectPlaylist">
        <i class="iconfont icon-add" />
        <p>收藏到歌单</p>
      </div>
    </div>

    <more-song-options
      :song="song"
      v-show="song && Object.keys(song).length | checkedList.length"
      ref="trackPopUp"
    />
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import ScrollView from 'components/content/ScrollView.vue';

import { fmtDate } from 'common/utils';
import {
  getArtistsMixin,
  getUrlMixin,
  loadingMixin,
  playSongMixin,
  selectionMixin
} from 'common/mixin';
import { getDailySong } from 'networks/recommend';
import { mapGetters } from 'vuex';
import SongView from 'components/content/SongView.vue';
import MoreSongOptions from '../../../components/content/MoreSongOptions.vue';
export default {
  name: 'RecommendDaily',
  components: { NavBar, ScrollView, SongView, MoreSongOptions },
  mixins: [getArtistsMixin, getUrlMixin, loadingMixin, playSongMixin, selectionMixin],
  data() {
    return {
      date: { day: 1, month: 1 },
      songs: [],
      song: {},
      multiSelect: false,
      checkall: false
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
      this.$toast.show('请先登录', 5000);
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'cookie']),
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
    addToPlayer() {
      let selectedTracks;
      if (this.checkedList.length) {
        selectedTracks = this.songs.filter(song => {
          return this.checkedList.includes(song.id);
        });
      }
      this.$refs.trackPopUp.addToPlayer('', selectedTracks);
      this.unCheckAll();
      this.checkall = false;
    },
    selectPlaylist() {
      let ids = this.checkedList.join(',');
      this.$refs.trackPopUp.selectPlaylist('', ids);
    },
    goBack() {
      this.$router.go(-1);
    },
    play(index) {
      this.playSong(this.songs, index);
    },
    songClick(song) {
      this.song = song;
      this.$refs.trackPopUp.showMore = true;
    },
    toggleSelect() {
      this.multiSelect = !this.multiSelect;
      this.unCheckAll();
      this.checkall = false;
    },
    toggleCheck() {
      if (this.checkall) {
        this.unCheckAll();
      } else {
        this.checkAll(this.songs);
      }
      this.checkall = !this.checkall;
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

    .song-info {
      display: flex;
      img {
        width: 80px;
        height: 80px;
        margin-right: 20px;
        border-radius: 10px;
      }
    }
  }
  .icon-select-fill,
  .icon-select-unfill {
    min-width: 50px !important;
  }

  .icon-select-fill,
  .icon-select-unfill {
    @include font_size($icon_m);
    @include font_color();
  }

  .select-all {
    display: flex;
    align-items: center;
  }
  .icon-select-fill,
  .close-select {
    @include font_active_color();
  }

  .select-toolbar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background-color: #fff;
    z-index: 99;
    @include bg_color_sub();
    @include font_size($s);
    @include font_color();
    &.active {
      color: #333;
    }
    .iconfont {
      display: inline-block;
      @include font_size($icon_ms);
      margin-bottom: 5px;
    }
  }
}
</style>
