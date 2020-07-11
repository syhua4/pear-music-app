<template>
  <div class="cat">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
      <div class="title" slot="center">{{ this.$route.params.cat }}</div>
      <i class="iconfont icon-back" slot="right" />
    </nav-bar>
    <loading :isShow="loading" v-if="loading" />
    <scroll v-else :pullUpload="true" @pullUpload="loadMore" ref="scroll">
      <grid-view :results="results" />
    </scroll>
  </div>
</template>

<script>
import GridView from './PlaylistGridView';

import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';

import { getPlaylists } from 'networks/recommend';
import { loadingMixin } from 'common/mixin';
export default {
  name: 'PlaylistCategory',
  components: { GridView, NavBar, Scroll },
  mixins: [loadingMixin],
  data() {
    return {
      results: []
    };
  },
  async created() {
    await getPlaylists(encodeURIComponent(this.$route.params.cat)).then(res => {
      this.results = res.playlists;
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async loadMore() {
      let name = this.$route.params.cat;
      let offset = this.results.length;
      await getPlaylists(name, 30, offset).then(res => {
        if (res.more && res.playlists.length) {
          // console.log(...res.playlists);
          res.playlists.map(item => {
            this.results.push(item);
          });
          // this.result.push(...res.playlists);
          console.log(this.results);
          console.log('数据请求完毕');
        } else {
          this.$refs.scroll.loading = false;
          console.log('没有数据了');
        }
      });
      this.$refs.scroll.finishPullUp();
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
@import 'assets/css/mixin.scss';
.cat {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
  .nav {
    position: relative;
    color: #fff;
    z-index: 2;
    .icon-back {
      @include font_size($icon_s);
    }
    .right-nav i {
      color: transparent;
    }
  }
  .scroll-wrapper {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
