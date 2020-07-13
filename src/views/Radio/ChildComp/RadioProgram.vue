<template>
  <div class="program">
    <nav-bar class="nav">
      <i class="iconfont icon-back" slot="left" />
      <div slot="center">电台</div>
    </nav-bar>
    <div class="cover" :style="{ backgroundImage: `url(${result.picUrl})` }">
      <div class="cover-text">
        <div class="dj-name">{{ result.name }}</div>
        <div class="dj-sub">{{ result.subCount | round }}人订阅</div>
      </div>
    </div>
    <div class="tabbar"><span>详情</span><span>节目</span></div>
    <div class="component-wrapper">
      <component :is="currentComponent" v-bind="currentProp" />
    </div>
  </div>
</template>

<script>
import ProgramList from './RadioProgramList';
import { roundCountMixin } from 'common/mixin';
import { getRadioDetail } from 'networks/radio';
import NavBar from 'components/common/NavBar/NavBar';
export default {
  name: 'RadioProgram',
  components: { NavBar },
  mixins: [roundCountMixin],
  data() {
    return {
      result: []
    };
  },
  created() {
    let rid = this.$route.params.id;
    getRadioDetail(rid).then(res => {
      this.result = res.djRadio;
      console.log(res.djRadio);
    });
  },
  computed: {
    currentComponent() {
      return ProgramList;
    },
    currentProp() {
      return ProgramList;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.program {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  .nav {
    position: relative;
    color: #fff;
    background-color: transparent;
    z-index: 2;
    .icon-back {
      @include font_size($icon_ms);
    }
  }
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 100px;
    height: 35%;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 25%);
    }
    .cover-text {
      position: absolute;
      bottom: 10%;
      left: 20px;
      color: #fff;
    }
  }
  .tabbar {
    height: 80px;
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    top: calc(35% + 50px);
    background-color: #fff;
    border-radius: 30px 30px 0 0;
    @include font_size($ms);
    z-index: 1;
  }
  .component-wrapper {
    position: absolute;
    top: calc(35% + 50px + 80px);
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
