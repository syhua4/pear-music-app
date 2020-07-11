<template>
  <div class="playlist-category">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
      <div class="header" slot="center">所有歌单</div>
      <i class="iconfont icon-back" slot="right" />
    </nav-bar>
    <scroll>
      <div class="category" v-for="(cat, i) in categories" :key="cat + i">
        <div class="cat-name">{{ cat }}</div>
        <div
          class="sub-category"
          v-for="(sub, j) in sub_categories[i]"
          :key="sub + j"
          @click.stop="toCategory(sub)"
        >
          {{ sub }}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';

import { getPlaylistCategory } from 'networks/recommend';
export default {
  name: 'PlaylistCategoryList',
  components: { NavBar, Scroll },
  data() {
    return {
      categories: [],
      sub_categories: []
    };
  },
  created() {
    getPlaylistCategory().then(res => {
      this.categories = Object.values(res.categories);
      this.categories.map(() => {
        this.sub_categories.push([]);
      });
      res.sub.map(item => {
        let pattern = /[&/]+/;
        if (!pattern.test(item.name)) {
          this.sub_categories[item.category].push(item.name);
        }
      });
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toCategory(name) {
      let main_cat = this.$route.meta.titles;
      let index = main_cat.indexOf(name);
      if (index >= 0) {
        this.$route.meta.activeTab = index;
        this.goBack();
      } else {
        this.$router.push(`/playlists/${name}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.playlist-category {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  .nav {
    position: relative;
    color: #fff;
    z-index: 1;
    .icon-back {
      @include font_size($icon_m);
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
  .category {
    margin: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 48px;
    &::after {
      content: '';
      flex: calc((100% - 32px * 4) / 4);
    }
    .cat-name {
      font-weight: 500;
      width: 100%;
      @include font_size($ms);
    }
    .sub-category {
      width: calc((100% - 32px * 4) / 4);
      background-color: #eee;
      border-radius: 40px;
      text-align: center;
      margin: 20px 16px 8px 0;
      padding: 16px 8px;
      @include font_size($s);
    }
  }
}
</style>
