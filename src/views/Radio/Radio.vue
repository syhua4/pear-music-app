<template>
  <div class="radio">
    <nav-bar class="nav">
      <div class="title" slot="center">主播电台</div>
    </nav-bar>
    <transition name="right">
      <router-view />
    </transition>
    <scroll>
      <banner :banners="banners" class="banner-wrapper" />
      <tab-nav />
      <recommend :results="recommend" />
    </scroll>
  </div>
</template>

<script>
import TabNav from './ChildComp/RadioTabNav';
import Recommend from './ChildComp/RadioRecommend';

import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';
import Banner from 'components/content/Banner';

import { getBanner, getRecommendRadio } from 'networks/radio';
export default {
  name: 'Radio',
  components: { TabNav, Recommend, NavBar, Scroll, Banner },
  data() {
    return {
      banners: [],
      recommend: []
    };
  },
  created() {
    getBanner().then(res => {
      this.banners = res.data;
    });

    getRecommendRadio().then(res => {
      this.recommend = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.radio {
  .nav {
    position: relative;
    z-index: 1;
    color: #fff;
  }
  .scroll-wrapper {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    right: 0;
    .banner-wrapper {
      padding-top: 24px;

      ::v-deep .swiper-container {
        border-radius: 30px !important;
        overflow: hidden;
        margin: 0 24px;
      }
    }
  }
}
</style>
