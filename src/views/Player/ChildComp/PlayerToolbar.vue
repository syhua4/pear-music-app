<template>
  <div class="player-toolbar">
    <i
      class="iconfont"
      :class="like ? 'icon-heart-filled' : 'icon-heart'"
      @click="toggleFavourite"
    ></i>
    <i class="iconfont icon-download"></i>
    <i class="iconfont icon-comment"></i>
    <i class="iconfont icon-more--line"></i>
  </div>
</template>

<script>
import { setLikelist, getLikelist } from 'networks/user';
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerToolbar',
  data() {
    return {
      like: false
    };
  },
  methods: {
    async toggleFavourite() {
      if (this.isLogin) {
        await setLikelist(this.currentPlaying.id, !this.like, this.cookie).then(res => {
          if (res.code === 200) {
            this.like = !this.like;
            this.like
              ? this.$toast.show('添加至我喜欢', 1000)
              : this.$toast.show('已删除我喜欢', 1000);
          }
        });
      } else {
        this.$toast.show('请先登录', 1000);
      }
    }
  },
  computed: {
    ...mapGetters(['currentPlaying', 'favouriteList', 'profile', 'cookie', 'isLogin'])
  },
  watch: {
    currentPlaying: {
      deep: true,
      immediate: true,
      handler(val) {
        if (this.isLogin && val) {
          getLikelist(this.profile.uid, this.cookie).then(res => {
            let result = res.ids.findIndex(item => {
              return item === val.id;
            });
            this.like = result < 0 ? false : true;
          });
        }
      }
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
  position: fixed;
  top: calc(100px + 65%);
  left: 0;
  right: 0;
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
