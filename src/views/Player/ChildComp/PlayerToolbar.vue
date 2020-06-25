<template>
  <div class="player-toolbar">
    <i class="iconfont" :class="isFavourite" @click="toggleFavourite"></i>
    <i class="iconfont icon-download"></i>
    <i class="iconfont icon-comment"></i>
    <i class="iconfont icon-more--line"></i>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PlayerToolbar',
  methods: {
    ...mapActions(['setFavourite', 'setUnfavourite']),
    toggleFavourite() {
      let songId = this.currentPlaying.id;
      this.isFavourite.includes('fill')
        ? this.setUnfavourite(songId).then(res => this.$toast.show(res, 1000))
        : this.setFavourite(songId).then(res => this.$toast.show(res, 1000));
    }
  },
  computed: {
    ...mapGetters(['currentPlaying', 'favouriteList']),
    isFavourite() {
      let favClass = 'icon-heart';
      if (this.currentPlaying && this.favouriteList.includes(this.currentPlaying.id)) {
        favClass = 'icon-heart-filled';
      }
      return favClass;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.player-toolbar {
  height: 5%;
  color: #fff;
  display: flex;
  position: relative;
  z-index: 2;
  justify-content: space-around;
  .iconfont {
    @include font_size($icon_m);
  }
  .icon-heart-filled {
    @include font_active_color();
  }
}
</style>
