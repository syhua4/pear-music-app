<template>
  <div class="radio-toplist">
    <nav-bar class="nav">
      <i class="iconfont icon-back" @click="goBack" slot="left" />
      <div slot="center">主播电台排行榜</div>
      <i class="iconfont icon-back" slot="right" />
    </nav-bar>
    <div class="tabbar">
      <span
        v-for="(item, index) in tabnav"
        :key="item + index"
        @click="tabClick(index)"
        :class="{ active: activeTab === index }"
        >{{ item }}</span
      >
    </div>
    <scroll>
      <loading :isShow="loading" />
      <toplist-view v-bind="currentProp" @contentLoaded="contentLoaded" />
    </scroll>
  </div>
</template>

<script>
import ToplistView from './RadioToplistView';
import NavBar from 'components/common/NavBar/NavBar';
import Scroll from 'components/common/Scroll/Scroll';

import { loadingMixin } from 'common/mixin';
import { fmtDate } from 'common/utils';
import { getProgramToplist, getDailyToplist, getRadioToplist } from 'networks/radio';

export default {
  name: 'RadioToplist',
  mixins: [loadingMixin],
  components: { ToplistView, NavBar, Scroll },
  data() {
    return {
      daily: [],
      program: [],
      radio: [],
      tabnav: ['24小时榜', '节目榜', '电台榜'],
      activeTab: 1
    };
  },
  async created() {
    await getProgramToplist().then(res => {
      this.program = res.toplist;
      console.log('program loaded');
    });
    await getRadioToplist().then(res => {
      this.radio = res.toplist;
      console.log('radio loaded');
    });
    await getDailyToplist().then(res => {
      this.daily = res.data;
      console.log('daily loaded');
    });
  },
  methods: {
    contentLoaded() {
      this.loading = false;
      console.log('父组件收到了');
    },

    goBack() {
      this.$router.push('/radio');
    },
    tabClick(index) {
      if (this.loading) {
        this.$toast.show('正在努力加载哦', 1000);
      } else {
        this.activeTab = index;
      }
    }
  },
  computed: {
    currentProp() {
      let curProp;
      switch (this.activeTab) {
        case 0:
          curProp = {
            toplist: this.daily.list,
            title: '更新时间: ' + this.getDate
          };
          break;
        case 1:
          curProp = { toplist: this.program, title: '最热节目' };
          break;
        case 2:
          curProp = { toplist: this.radio, title: '最热电台', isRadio: true };
          break;
      }
      return curProp;
    },
    getDate() {
      let time = fmtDate(this.daily.updateTime / 1000);
      return `${time.month}月${time.date}日`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.radio-toplist {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1;
  .nav {
    position: relative;
    z-index: 1;
    color: #fff;
    .icon-back {
      @include font_size($icon_ms);
    }
    .right-nav i {
      color: transparent;
    }
  }
  .tabbar {
    height: 50px;
    color: #fff;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    position: relative;
    z-index: 1;
    @include bg_color();
    @include font_size($ms);
    .active {
      height: 45px;
      border-bottom: 5px solid #fff;
    }
  }
  .scroll-wrapper {
    position: fixed;
    top: 150px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
