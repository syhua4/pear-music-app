<template>
  <div class="result">
    <nav-bar class="nav">
      <i slot="left" class="iconfont icon-back" @click="goBack" />
      <div slot="center" class="bar">
        <search-bar ref="searchBar" @click.native="goBack" />
      </div>
    </nav-bar>
    <tab-nav :titles="tabNavTitle" :tabIndex="tabNavIndex" />
    <loading :isShow="loading" v-if="loading" />
    <scroll class="scroll" v-else>
      <panel-view
        title="单曲"
        :footer="allResults.song.moreText"
        btnText="播放全部"
        @btnClick="playSong"
        v-if="allResults.length !== 0"
      >
        <div
          slot="panel-content"
          v-for="(song, index) in allResults.song.songs"
          :key="song.id"
          class="song"
          @click="playSong(index)"
        >
          <div class="wrapper-left">
            <div class="song-name">{{ song.name }}</div>
            <div class="song-desc">
              <span class="song-artist">{{ artists(song.ar) }}</span>
              <span class="song-album">{{ song.al.name }}</span>
            </div>
            <div class="song-alias">{{ song.alia && song.alia[0] }}</div>
          </div>
          <div class="wrapper-right">
            <i class="iconfont icon-more"></i>
          </div>
        </div>
      </panel-view>

      <panel-view
        title="歌单"
        :footer="allResults.playList.moreText"
        v-if="allResults.length !== 0"
      >
        <div
          slot="panel-content"
          v-for="playlist in allResults.playList.playLists"
          :key="playlist.id"
          class="playlist"
          @click="goPlaylist(playlist.id)"
        >
          <div class="wrapper-left">
            <img v-lazy="fmtUrl(playlist.coverImgUrl)" class="playlist-img" />
          </div>
          <div class="wrapper-right">
            <div class="playlist-name">{{ playlist.name }}</div>
            <div class="playlist-desc">
              <span class="playlist-track-count">{{ playlist.trackCount }}首音乐</span>
              <span class="playlist-creator">by {{ playlist.creator.nickname }},</span>
              <span class="playlist-play-count">{{ playlist.playCount | round(1) }}</span>
            </div>
          </div>
        </div>
      </panel-view>
      <panel-view title="视频" :footer="allResults.video.moreText" v-if="allResults.length !== 0">
        <div
          slot="panel-content"
          v-for="video in allResults.video.videos"
          :key="video.id"
          class="video"
        >
          <div class="wrapper-left">
            <img v-lazy="fmtUrl(video.coverUrl)" class="video-img" />
            <div class="play-count">
              <i class="iconfont icon-play-s" />
              <span class="play-time">{{ video.playTime | round }}</span>
            </div>
            <span></span>
          </div>
          <div class="wrapper-right">
            <div class="video-name">{{ video.title }}</div>
            <div class="video-desc">
              <span class="video-track-count">{{ getTime(video.durationms) }}, </span>
              <span class="video-creator">by {{ video.creator[0].userName }}</span>
            </div>
          </div>
        </div>
      </panel-view>
      <panel-view title="相关搜索" v-if="allResults.length !== 0">
        <div class="query" slot="panel-content">
          <span v-for="query in allResults.sim_query.sim_querys" :key="query.keyword">{{
            query.keyword
          }}</span>
        </div>
      </panel-view>
      <panel-view title="歌手" :footer="allResults.artist.moreText" v-if="allResults.length !== 0">
        <div
          class="artist"
          slot="panel-content"
          v-for="artist in allResults.artist.artists"
          :key="artist.id"
        >
          <img v-lazy="fmtUrl(artist.picUrl)" class="artist-img" />
          <span class="artist-name">{{ artist.name }}</span>
        </div>
      </panel-view>
      <panel-view title="专辑" :footer="allResults.album.moreText" v-if="allResults.length !== 0">
        <div
          slot="panel-content"
          v-for="album in allResults.album.albums"
          :key="album.id"
          class="album"
        >
          <div class="wrapper-left">
            <img v-lazy="fmtUrl(album.picUrl)" class="album-img" />
          </div>
          <div class="wrapper-right">
            <div class="album-name">{{ album.name }}</div>
            <div class="album-desc">
              <span class="album-artist">{{ artists(album.artists) }}</span>
              <span class="album-play-count">{{ getDate(album.publishTime) }}</span>
            </div>
          </div>
        </div>
      </panel-view>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';
import NavBar from 'components/common/NavBar/NavBar';
import SearchBar from 'components/content/SearchBar';
import PanelView from 'components/content/PanelView';

import TabNav from './ChildComp/SearchResultTabNav';

import { getSearchResult } from 'networks/search';
import { fmtTime } from 'common/utils';
import { getArtistsMixin, getUrlMixin, roundCountMixin, loadingMixin } from 'common/mixin';

import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'SearchResult',
  components: { Scroll, NavBar, SearchBar, PanelView, TabNav },
  mixins: [getArtistsMixin, getUrlMixin, roundCountMixin, loadingMixin],
  data() {
    return {
      query: '',
      allResults: [],
      tabNavTitle: ['综合', '单曲', '歌单', '歌手', '专辑', '视频', '电台'],
      tabNavIndex: 0
    };
  },
  created() {
    this.query = this.$route.query.q;
    getSearchResult(this.query, 1018).then(res => {
      this.allResults = res.result;
      console.log(res.result);
    });
  },
  mounted() {
    this.$refs.searchBar.query = this.query;
  },
  beforeRouteLeave(to, from, next) {
    to.meta.prevQuery = this.query;
    next();
  },
  methods: {
    ...mapActions(['setPlayList', 'setShowPlayer', 'setCurrentIndex', 'setIsLoading']),
    goBack() {
      this.$router.go(-1);
    },
    goPlaylist(id) {
      this.$router.push(`/playlist/${id}`);
    },
    playSong(index) {
      if (!this.isLoading) {
        this.setIsLoading(true);
      }
      index || index === 0
        ? this.setPlayList([this.allResults.song.songs[index]])
        : this.setPlayList(this.allResults.song.songs);
      this.setCurrentIndex(0);
      this.setShowPlayer(true);
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    getTime() {
      return function(time) {
        let ms = fmtTime(time / 1000);
        return `${ms.minute}:${ms.second}`;
      };
    },
    getDate() {
      return function(time) {
        let date = fmtTime(time / 1000);
        return `${date.year}-${date.month}-${date.date}`;
      };
    }
  },
  watch: {
    allResults() {
      this.$nextTick(function() {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.result {
  .nav {
    position: relative;
    z-index: 1;
    .bar {
      flex: 1;
    }
  }

  .icon-back {
    @include font_size($icon_s);
    color: #fff;
  }
  .scroll {
    position: fixed;
    top: 150px;
    bottom: 100px;
    right: 0;
    left: 0;
  }
  .song {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-more {
      margin-left: 20px;
      @include font_color();
      @include font_size($icon_m);
    }
    .song-name {
      @include font_size($ms);
    }
    .song-name,
    .song-desc {
      @include clamp(1);
    }
    .song-desc,
    .song-alias {
      padding-top: 10px;
      @include font_size($s);
      @include font_color();
    }
    .song-artist::after {
      content: '-';
      display: inline-block;
      padding: 0 4px;
    }
  }
  .playlist,
  .video,
  .artist,
  .album {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .playlist-img,
    .video-img,
    .artist-img,
    .album-img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
      margin-right: 20px;
    }
    .playlist-name,
    .video-name,
    .album-name {
      @include font_size($ms);
    }
    .playlist-desc,
    .video-desc,
    .album-desc {
      @include font_size($s);
      @include font_color();
      padding-top: 10px;
      span {
        padding: 0 5px;
      }
    }
    .playlist-name,
    .playlist-desc,
    .video-desc,
    .artist-name {
      @include clamp(1);
    }
  }
  .video {
    .wrapper-left {
      position: relative;
      .video-img {
        width: 225px;
        object-fit: cover;
      }
      .play-count {
        position: absolute;
        right: 25px;
        top: 0;
        color: #fff;
        @include font_size($s);
      }
      .icon-play-s {
        @include font_size($icon_xs);
      }
    }

    .video-name {
      @include clamp(2);
    }
  }
  .query {
    display: flex;
    flex-wrap: wrap;
    span {
      background-color: #eee;
      border-radius: 20px;
      padding: 5px 20px;
      margin-right: 16px;
      margin-bottom: 16px;
      @include font_size($s);
    }
  }
  .artist {
    .artist-img {
      border-radius: 50%;
    }
  }
}
</style>
