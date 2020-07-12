<template>
  <div class="playlist-square">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
      <div class="nav-header" slot="center">歌单广场</div>
      <i class="iconfont icon-back" slot="right" />
    </nav-bar>
    <tab-nav :titles="getTabNavTitles" :tabIndex="tabNavIndex" @tabClick="tabClick" class="tab">
      <i class="icon-category iconfont" slot="more" @click="clickMore" />
    </tab-nav>
    <loading :isShow="loading" v-if="loading" />
    <scroll v-else :pullUpload="true" @pullUpload="loadMore" ref="scroll">
      <carousel
        :results="category[tabNavIndex].list.playlists.slice(0, 3)"
        v-if="tabNavIndex === 0 && category[tabNavIndex].list.playlists"
      />
      <grid
        v-if="category[tabNavIndex].list.playlists"
        :results="
          tabNavIndex !== 0
            ? category[tabNavIndex].list.playlists
            : category[tabNavIndex].list.playlists.slice(3)
        "
      />
    </scroll>
    <transition name="right">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Grid from './ChildComp/PlaylistGridView';
import Carousel from './ChildComp/PlaylistSlider';

import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';
import TabNav from 'components/content/TabNav';

import { getPlaylists } from 'networks/recommend';
import { loadingMixin } from 'common/mixin';

export default {
  name: 'PlaylistSquare',
  components: { Grid, Carousel, NavBar, Scroll, TabNav },
  mixins: [loadingMixin],
  async created() {
    await getPlaylists(this.category[0].name, 33).then(res => {
      this.category[0].list = res;
    });
    this.category.slice(1).map(cat => {
      getPlaylists(cat.name).then(res => {
        cat.list = res;
      });
    });
  },
  data() {
    return {
      category: [
        { name: '流行', list: [] },
        { name: '华语', list: [] },
        { name: '摇滚', list: [] },
        { name: '学习', list: [] },
        { name: '怀旧', list: [] },
        { name: '综艺', list: [] }
      ],
      tabNavIndex: 0,
      transitionName: ''
    };
  },
  methods: {
    clickMore() {
      console.log('11111');
      this.$router.push({ name: 'playlist-category', params: { title: this.getTabNavTitles } });
    },

    goBack() {
      this.$router.push({ path: '/recommend' });
    },
    tabClick(index) {
      console.log(index);
      this.tabNavIndex = index;
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0);
      this.$refs.scroll && this.$refs.scroll.refresh();
    },
    async loadMore() {
      let name = this.category[this.tabNavIndex].name;
      let offset = this.category[this.tabNavIndex].list.playlists.length;
      await getPlaylists(name, 30, offset).then(res => {
        if (res.more && res.playlists.length) {
          this.category[this.tabNavIndex].list.playlists.push(...res.playlists);
          console.log(this.category[this.tabNavIndex]);
          console.log('数据请求完毕');
        } else {
          this.$refs.scroll.loading = false;
          console.log('没有数据了');
        }
      });
      this.$refs.scroll.finishPullUp();
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === '/playlists/category') {
      to.meta.titles = this.getTabNavTitles;
    }
    if (from.path === '/playlists/category') {
      if (typeof from.meta.activeTab === 'number') {
        this.tabNavIndex = from.meta.activeTab;
      }
    }
    next();
  },
  computed: {
    getTabNavTitles() {
      let titles = this.category.map(cat => {
        return cat.name;
      });
      return titles;
    }
  },
  watch: {
    category: {
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
@import 'assets/css/mixin.scss';
.playlist-square {
  .nav {
    color: #333;
    background-color: #fff;
    position: relative;
    z-index: 1;
    .icon-back {
      @include font_size($icon_ms);
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
        border-bottom: 4px solid #d64139;
        bottom: 0;
        left: 50%;
        transform: translate3d(-50%, 30%, 0);
        width: 50%;
      }
    }
  }
  .tabnav {
    position: relative;
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
