<template>
  <div class="playlist-square">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
      <div class="nav-header" slot="center">歌单广场</div>
      <i class="iconfont icon-back" slot="right" />
    </nav-bar>
    <tab-nav :titles="getTabNavTitles" :tabIndex="tabNavIndex" @tabClick="tabClick" class="tab">
      <i class="icon-category iconfont" slot="more" />
    </tab-nav>
    <scroll>
      <carousel
        :results="category[tabNavIndex].list.playlists.slice(30, 33)"
        v-if="tabNavIndex === 0"
      />
      <grid :results="category[tabNavIndex].list.playlists" />
    </scroll>
  </div>
</template>

<script>
import Grid from './ChildComp/PlaylistGridView';
import Carousel from './ChildComp/PlaylistSlider';

import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';
import TabNav from 'components/content/TabNav';

import { getPlaylists } from 'networks/recommend';
export default {
  name: 'PlaylistSquare',
  components: { Grid, Carousel, NavBar, Scroll, TabNav },
  created() {
    this.category.slice(1).map(cat => {
      getPlaylists(cat.name).then(res => {
        cat.list = res;
      });
    });
    getPlaylists(this.category[0].name, 33).then(res => {
      this.category[0].list = res;
    });
  },
  data() {
    return {
      category: [
        { name: '全部', list: [], alias: '推荐' },
        { name: '华语', list: [] },
        { name: '流行', list: [] },
        { name: '电子', list: [] },
        { name: '摇滚', list: [] },
        { name: '民谣', list: [] }
      ],
      tabNavIndex: 0
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    tabClick(index) {
      this.tabNavIndex = index;
    }
  },
  computed: {
    getTabNavTitles() {
      let titles = this.category.map(cat => {
        return cat.alias || cat.name;
      });
      return titles;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.playlist-square {
  .nav {
    color: #333;
    background-color: #fff;
    position: relative;
    z-index: 1;
    .icon-back {
      @include font_size($icon_s);
    }
    .right-nav .icon-back {
      color: transparent;
    }
  }
  ::v-deep.tabnav {
    background: #fff;
    color: #333;
    .active {
      @include font_active_color();
      &::after {
        position: absolute;
        content: '';
        border: 2px solid #d64139;
        bottom: 0;
        left: 50%;
        transform: translate3d(-50%, 30%, 0);
        width: 50%;
      }
    }
  }
  .tab {
    position: relative;
    border-bottom: 1px solid #ccc;
    .icon-category {
      position: absolute;
      background-color: #fff;
      z-index: 1;
      top: 0;
      right: 5px;
      @include font_size($icon_m);
    }
  }
  .scroll-wrapper {
    position: fixed;
    top: 150px;
    bottom: 100px;
    left: 0;
    right: 0;
  }
}
</style>
