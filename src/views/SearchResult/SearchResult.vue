<template>
  <div class="result">
    <nav-bar class="nav">
      <i slot="left" class="iconfont icon-back" @click="goBack" />
      <div slot="center" class="bar">
        <search-bar ref="searchBar" @click.native="goBack" />
      </div>
    </nav-bar>
    <tab-nav :titles="getTabNavTitles" :tabIndex="tabNavIndex" @tabClick="tabClick" />
    <loading :isShow="loading" v-if="loading" />
    <scroll
      class="scroll"
      v-else
      :pullUpload="tabNavIndex !== 0"
      @pullUpload="loadMore"
      ref="scroll"
    >
      <component :is="currentTab" v-bind="currentProps" @changeTabNav="tabClick"></component>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';
import NavBar from 'components/common/NavBar/NavBar';
import SearchBar from 'components/content/SearchBar';
import TabNav from 'components/content/TabNav';

import SearchMulti from './ChildComp/SearchMulti';
import Song from './ChildComp/SearchSong';
import Playlist from './ChildComp/SearchPlaylist';
import Artist from './ChildComp/SearchArtist';
import Video from './ChildComp/SearchVideo';
import Album from './ChildComp/SearchAlbum';

import { getSearchResult } from 'networks/search';
import { loadingMixin } from 'common/mixin';

export default {
  name: 'SearchResult',
  components: { Scroll, NavBar, SearchBar, TabNav },
  mixins: [loadingMixin],
  data() {
    return {
      query: '',
      results: {
        multi: { name: '综合', id: 1018, list: [] },
        songs: { name: '单曲', id: 1, list: [] },
        playlists: { name: '歌单', id: 1000, list: [] },
        artists: { name: '歌手', id: 100, list: [] },
        albums: { name: '专辑', id: 10, list: [] },
        videos: { name: '视频', id: 1014, list: [] }
      },
      tabNavIndex: 0
    };
  },
  created() {
    this.query = this.$route.query.q;
    Object.keys(this.results).map(elem => {
      getSearchResult(this.query, this.results[elem].id).then(res => {
        this.results[elem].list = res.result;
      });
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
    goBack() {
      this.$router.go(-1);
    },
    async loadMore() {
      if (this.tabNavIndex !== 0) {
        let key = Object.keys(this.results)[this.tabNavIndex];
        let id = this.results[key].id;
        let offset = this.results[key].list[key].length;
        await getSearchResult(this.query, id, offset).then(res => {
          console.log(res.result);
          if (res.result.hasMore && res.result[key].length) {
            this.results[key].list[key].push(...res.result[key]);
            console.log('数据请求完毕');
          } else {
            this.$refs.scroll.loading = false;
            console.log('没有数据了');
          }
        });
        this.$refs.scroll.finishPullUp();
      }
    },
    tabClick(index) {
      this.tabNavIndex = index;
      this.$refs.scroll.scrollTo(0, 0);
      this.$refs.scroll.refresh();
    }
  },
  computed: {
    currentTab() {
      let curComp;
      switch (this.tabNavIndex) {
        case 0:
          curComp = SearchMulti;
          break;
        case 1:
          curComp = Song;
          break;
        case 2:
          curComp = Playlist;
          break;
        case 3:
          curComp = Artist;
          break;
        case 4:
          curComp = Album;
          break;
        case 5:
          curComp = Video;
          break;

        default:
          curComp = SearchMulti;
      }
      return curComp;
    },
    currentProps() {
      let curProps;
      switch (this.tabNavIndex) {
        case 0:
          curProps = { results: this.results.multi.list };
          break;
        case 1:
          curProps = {
            results: this.results.songs.list.songs
          };
          break;
        case 2:
          curProps = {
            results: this.results.playlists.list.playlists
          };
          break;
        case 3:
          curProps = {
            results: this.results.artists.list.artists
          };
          break;
        case 4:
          curProps = {
            results: this.results.albums.list.albums
          };
          break;
        case 5:
          curProps = {
            results: this.results.videos.list.videos
          };
          break;
        default:
          curProps = { results: this.results.multi.list };
          break;
      }
      return curProps;
    },
    getTabNavTitles() {
      let titles = Object.keys(this.results).map(key => {
        return this.results[key].name;
      });
      return titles;
    }
  },
  watch: {
    results: {
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
}
</style>
