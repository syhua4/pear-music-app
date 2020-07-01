<template>
  <div class="player-cd-wrapper" ref="cd-wrapper">
    <!-- <canvas id="canvas1" :width="size[0]" :height="size[0]" ref="canvas"></canvas> -->
    <div
      class="cd"
      :class="!isPlaying ? 'paused' : null"
      :style="[
        {
          width: `${size[0] * 0.6}px`,
          height: `${size[0] * 0.6}px`,
          '--color': bgColor,
          '--display': showAnimation
        }
      ]"
      ref="cd"
    >
      <!-- <img src="~assets/images/cd_test.png" /> -->
      <!-- <div class="pin" :class="!isPlaying ? 'paused' : 'play'" ref="pin">
        <img src="~assets/images/pin_test.png" />
      </div> -->
      <div class="cover">
        <!-- <img src="~assets/images/cd-cover.png" v-show="!currentPlaying" /> -->
        <img v-lazy="currentPlaying && fmtUrl(currentPlaying.al.picUrl)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getUrlMixin } from 'common/mixin';

export default {
  name: 'PlayerCD',
  mixins: [getUrlMixin],
  methods: {},
  computed: {
    ...mapGetters(['isPlaying', 'showPlayer', 'currentPlaying']),
    playerOn() {
      return this.isPlaying && this.showPlayer;
    },
    showAnimation() {
      let isPaused =
        this.$refs &&
        this.$refs.cd &&
        this.$refs.cd.classList &&
        this.$refs.cd.classList.length === 2;
      // if (this.$refs && this.$refs.cd) {
      //   console.log(this.$refs.cd.classList.value);
      // }
      return isPaused || this.playerOn ? 'block' : 'none';
    }
  },
  props: {
    size: {
      type: Array,
      default: () => []
    },
    bgColor: {
      type: String,
      default: '',
      required: true
    }
  },
  watch: {
    playerOn(newVal) {
      if (newVal) {
        // this.initCanvas();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.player-cd-wrapper {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  // background-color: aquamarine;
  height: 65%;
  width: 100%;
  z-index: 1;
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  .cd {
    border-radius: 50%;
    border: 20px solid rgba($color: #fff, $alpha: 0.2);
    // border-color: ;
    position: relative;
    &::before,
    &::after {
      display: var(--display);
      opacity: 0;
      content: '';
      position: absolute;
      z-index: 1;
      border: 4px solid;
      border-color: var(--color);
      border-radius: 50%;
    }
    &::before {
      animation: ripple1 5s linear infinite;
    }
    &::after {
      animation: ripple2 5s linear infinite;
    }
    &.paused::before,
    &.paused::after {
      transform: scale(0);
      border: 1px solid transparent;
      transition: border-color 2.5s linear, transform 5s linear;
      animation-play-state: paused;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      // display: block;
    }
    &.paused > .cover {
      animation-play-state: paused;
    }
    .cover {
      animation: spin 20s linear infinite;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0);
    transform-origin: center;
  }
  100% {
    transform: rotate(360deg);
    transform-origin: center;
  }
}

@keyframes ripple1 {
  0% {
    top: -30px;
    left: -30px;
    right: -30px;
    bottom: -30px;
    opacity: 0;
  }
  35% {
    top: -70px;
    left: -70px;
    right: -70px;
    bottom: -70px;
    opacity: 1;
  }
  70%,
  100% {
    top: -100px;
    left: -100px;
    right: -100px;
    bottom: -100px;
    opacity: 0;
  }
}

@keyframes ripple2 {
  0%,
  50% {
    top: -30px;
    left: -30px;
    right: -30px;
    bottom: -30px;
    opacity: 0;
  }
  51% {
    opacity: 1;
  }
  100% {
    top: -80px;
    left: -80px;
    right: -80px;
    bottom: -80px;
    opacity: 0;
  }
}
</style>
