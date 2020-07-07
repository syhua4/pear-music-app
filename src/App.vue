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

import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
export default {
  name: 'App',
  data() {
    return {
      keepAliveComp: ['Recommend'],
      transitionName: ''
    };
  },
  components: {
    TabBar,
    Player
  },
  methods: {
    enter(el, done) {
      Velocity(
        el,
        'transition.slideRightIn',
        {
          duration: 5000
        },
        function() {
          done();
        }
      );
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-right';
        // this.enter(done);
      } else {
        this.transitionName = 'slide-left';
      }
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

  .slide-left-enter-active {
    animation-name: slide-left-in;
  }
  .slide-left-leave-active {
    animation-name: slide-left-out;
  }
  .slide-right-enter-active {
    animation-name: slide-right-in;
  }
  .slide-right-leave-active {
    animation-name: slide-right-out;
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    animation-duration: 0.3s;
  }
}

@keyframes slide-left-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes slide-left-out {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes slide-right-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes slide-right-out {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
