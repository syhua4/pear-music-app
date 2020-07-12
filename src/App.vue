<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="keepAliveComp">
        <router-view class="router" />
      </keep-alive>
    </transition>
    <player class="player" />
    <tab-bar class="main-tab" />
  </div>
</template>
<script>
import TabBar from 'components/content/MainTabBar';
import Player from 'views/Player/Player';

export default {
  name: 'App',
  data() {
    return {
      keepAliveComp: ['Recommend', 'PlaylistSquare'],
      transitionName: ''
    };
  },
  components: {
    TabBar,
    Player
  },
  watch: {
    $route(to, from) {
      to.meta.index > from.meta.index
        ? (this.transitionName = 'right')
        : (this.transitionName = 'left');
    }
  }
};
</script>
<style lang="scss">
@import 'assets/css/mixin.scss';
#app {
  position: relative;
  background-color: #fff;
  .router {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .player {
    z-index: 1;
  }
  .main-tab {
    @include bg_color_sub();
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .left-enter,
  .right-leave-to {
    transform: translateX(-100%);
  }
  .left-enter-to,
  .left-leave,
  .right-enter-to,
  .right-leave {
    transform: translateX(0%);
  }
  .left-leave-to,
  .right-enter {
    transform: translateX(100%);
  }
  .left-enter-active,
  .right-enter-active,
  .right-leave-active,
  .left-leave-active {
    will-change: transform;
    transition: all 0.5s ease;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }
}
</style>
