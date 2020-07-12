<template>
  <div class="playlist-catogory">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" @click="goBack" />
      <div class="header" slot="center">{{ category ? category : '所有歌单' }}</div>
      <i class="iconfont icon-back" slot="right" />
    </nav-bar>
    <transition :name="category ? 'right' : 'left'">
      <component :is="currentComponent" v-bind="currentProps" @toCategory="toCategory" />
    </transition>
  </div>
</template>

<script>
import CatList from './PlaylistCategoryList';
import CatDetail from './PlaylistCategoryDetail';
import NavBar from 'components/common/NavBar/NavBar';

export default {
  name: 'PlaylistCategory',
  components: { NavBar },
  data() {
    return {
      category: ''
    };
  },
  methods: {
    goBack() {
      !this.category ? this.$router.go(-1) : (this.category = '');
    },
    toCategory(name) {
      let titles = this.$route.params.title;
      if (titles.length) {
        let index = titles.indexOf(name);
        if (index >= 0) {
          this.$route.meta.activeTab = index;
          this.$router.go(-1);
        }
      } else this.$router.go(-1);
      this.category = name;
    }
  },
  computed: {
    currentComponent() {
      return !this.category ? CatList : CatDetail;
    },
    currentProps() {
      let curProps;
      if (!this.category) {
        curProps = {};
      } else {
        curProps = { cat: this.category };
      }
      return curProps;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';

.playlist-catogory {
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
      @include font_size($icon_ms);
    }
    .right-nav i {
      color: transparent;
    }
  }
}
</style>
