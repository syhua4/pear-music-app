<template>
  <div class="toplist">
    <nav-bar class="nav">
      <i class="iconfont icon-back" @click="goBack" slot="left" />
      <div class="title" slot="center">排行榜</div>
    </nav-bar>
    <scroll>
      <list :results="officialList" />
      <grid :results="otherList" />
    </scroll>
  </div>
</template>

<script>
import List from './ChildComp/ToplistRankView';
import Grid from './ChildComp/ToplistGridView';

import Scroll from 'components/common/Scroll/Scroll';
import NavBar from 'components/common/NavBar/NavBar';
import { getToplist } from 'networks/recommend';
export default {
  name: 'Toplist',
  components: { List, Grid, NavBar, Scroll },
  data() {
    return {
      officialList: [],
      otherList: []
    };
  },
  created() {
    getToplist().then(res => {
      res.list.filter(item => {
        item.tracks.length ? this.officialList.push(item) : this.otherList.push(item);
      });
    });
  },
  methods: {
    goBack() {
      this.$router.push('/recommend');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.toplist {
  .nav {
    position: relative;
    z-index: 1;
    color: #fff;
    .icon-back {
      @include font_size($icon_ms);
    }
  }
  .scroll-wrapper {
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 100px;
  }
}
</style>
