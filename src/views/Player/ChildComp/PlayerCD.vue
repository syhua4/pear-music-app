<template>
  <div class="player-cd-wrapper">
    <div class="pin" :class="!isPlaying ? 'paused' : 'play'">
      <img src="~assets/images/pin_test.png" />
    </div>
    <div class="cd" :class="!isPlaying ? 'paused' : null">
      <img src="~assets/images/cd_test.png" />
      <div class="cover">
        <img src="~assets/images/cd-cover.png" v-show="!currentPlaying" />
        <img v-lazy="currentPlaying && currentPlaying.al.picUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerCD',
  computed: {
    ...mapGetters(['isPlaying', 'currentPlaying'])
  }
};
</script>

<style lang="scss" scoped>
.player-cd-wrapper {
  position: relative;
  border: 1px solid transparent;
  height: 65%;
  z-index: 1;
  .pin {
    width: 40%;
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: top left;
    z-index: 2;
    transform: rotateZ(0deg);
    transition: transform 0.2s linear;
    &.play {
      transform: rotateZ(30deg);
    }
    &.paused {
      transform: rotateZ(0deg);
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  .cd {
    margin: 0 auto;
    margin-top: 30%;
    width: 80%;
    height: auto;
    position: relative;
    z-index: 1;
    animation: spin 3s linear infinite;
    img {
      width: 100%;
      height: auto;
    }
    .cover {
      position: absolute;
      width: 65%;
      height: 65%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      overflow: hidden;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    &.paused {
      animation-play-state: paused;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes pin {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(30deg);
  }
}
</style>
