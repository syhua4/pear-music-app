<template>
  <div class="player-cd-wrapper" ref="cd-wrapper">
    <div
      class="cd"
      :class="!isPlaying ? 'paused' : null"
      :style="[
        {
          width: `${width * 0.6}px`,
          height: `${width * 0.6}px`,
          '--color': bgColor,
          '--display': showAnimation
        }
      ]"
      ref="cd"
    >
      <div class="cover">
        <img
          v-lazy="
            currentPlaying &&
              fmtUrl(currentPlaying.al ? currentPlaying.al.picUrl : currentPlaying.album.picUrl)
          "
        />
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
  data() {
    return {
      width: window.innerWidth
    };
  },
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
      return isPaused || this.playerOn ? 'block' : 'none';
    }
  },
  props: {
    bgColor: {
      type: String,
      default: 'white',
      required: true
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
  height: 65%;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  .cd {
    border-radius: 50%;
    border: 20px solid rgba($color: #fff, $alpha: 0.2);
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
      transform: scale(0.8);
      border: 4px solid transparent;
      transition: border-color 1.5s ease-out, transform 1.5s ease-in-out;
      animation-play-state: paused;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    &.paused > .cover {
      animation-play-state: paused;
    }
    .cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
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
