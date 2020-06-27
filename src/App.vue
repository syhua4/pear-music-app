<template>
  <div id="app">
    <transition name="slide-left">
      <keep-alive include="Recommend">
        <router-view />
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
  components: {
    TabBar,
    Player
  }
};
</script>
<style lang="scss">
@import 'assets/css/mixin.scss';
#app {
  position: relative;
  background-color: #fff;

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

  .slide-left-enter-active {
    transition: all 300ms;
  }

  .slide-left-enter {
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    transform: translate3d(200%, 0, 0);
    transition: all 800ms;
  }
}
</style>
