<template>
  <div class="mini-player">
    <img
      class="cd"
      v-show="currentPlaying && !disabled"
      :src="currentPlaying && currentPlaying.al.picUrl + '?param=50x50'"
      :class="!isPlaying ? 'paused' : null"
      @click="togglePlayer"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'MiniPlayer',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(['setShowPlayer']),
    togglePlayer() {
      this.setShowPlayer(true);
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentPlaying'])
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.mini-player {
  .cd {
    vertical-align: middle;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 5px solid rgba($color: #fff, $alpha: 0.2);
    animation: spin 3s linear infinite;

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
</style>
