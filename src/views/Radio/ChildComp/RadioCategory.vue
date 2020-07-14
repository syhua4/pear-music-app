<template>
  <div class="radio-category">
    <nav-bar class="nav">
      <i class="iconfont icon-back" @click="goBack" slot="left" />
      <div slot="center">{{ Object.keys(catInfo).length ? catInfo.name : '电台分类' }}</div>
      <i class="iconfont icon-back" slot="right" />
    </nav-bar>
    <!-- <transition :name="Object.keys(catInfo).length ? 'right' : 'left'"> -->
    <loading :isShow="loading" />
    <component
      :is="currentComponent"
      v-bind="currentProp"
      @contentLoaded="contentLoaded"
      @categoryClick="categoryClick"
    />
    <!-- </transition> -->
  </div>
</template>

<script>
import CatList from './RadioCategoryList';
import CatInfo from './RadioCategoryInfo';
import { loadingMixin } from 'common/mixin';
import NavBar from 'components/common/NavBar/NavBar';
export default {
  name: 'RadioCategory',
  mixins: [loadingMixin],
  components: { NavBar },
  data() {
    return {
      catInfo: {}
    };
  },
  created() {
    if (this.$route.params.catInfo) {
      this.catInfo = this.$route.params.catInfo;
    }
  },
  methods: {
    categoryClick(item) {
      this.loading = true;
      this.catInfo = item;
    },
    contentLoaded() {
      this.loading = false;
    },
    goBack() {
      Object.keys(this.catInfo).length ? (this.catInfo = {}) : this.$router.push('/radio');
    }
  },
  computed: {
    currentComponent() {
      let curComp;
      Object.keys(this.catInfo).length ? (curComp = CatInfo) : (curComp = CatList);
      return curComp;
    },
    currentProp() {
      let curProp;
      Object.keys(this.catInfo).length ? (curProp = { id: this.catInfo.id }) : (curProp = null);
      return curProp;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.radio-category {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
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
}
</style>
