<template>
  <div class="artist-profile">
    <div class="header">歌手简介</div>
    <div class="desc">{{ desc }}</div>
  </div>
</template>

<script>
import { getArtistInfo } from 'networks/artist';

export default {
  name: 'ArtistProfile',
  created() {
    getArtistInfo(this.$route.params.id).then(res => {
      this.desc = res.briefDesc;
    });
  },
  data() {
    return {
      desc: ''
    };
  },

  watch: {
    desc: {
      handler() {
        this.$nextTick(function() {
          this.$emit('contentLoaded');
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.artist-profile {
  margin: 0 24px;
  @include font_size($ms);
  .header {
    font-weight: 500;
    padding: 20px 0;
  }
  .desc {
    @include font_color();
  }
}
</style>
