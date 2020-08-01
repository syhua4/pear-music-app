<template>
  <div class="song">加载中...</div>
</template>

<script>
import { getTrack } from 'networks/recommend';
import { playSongMixin } from 'common/mixin';

export default {
  name: 'Song',
  mixins: [playSongMixin],
  data() {
    return {
      song: []
    };
  },
  created() {
    getTrack(this.$route.params.id).then(res => {
      if (res.songs.length) {
        this.song = res.songs;
      } else {
        this.$toast.show('未找到歌曲,正在返回主页', 800);
        setTimeout(() => {
          this.$router.push('/recommend');
        }, 1000);
      }
    });
  },
  watch: {
    song: {
      deep: true,
      handler(val) {
        this.playSong(val);
        this.$router.push('/recommend');
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
