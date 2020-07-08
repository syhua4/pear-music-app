<template>
  <div class="result-artist" v-if="results && results.length > 0">
    <div class="artist" v-for="artist in results" :key="artist.id">
      <img v-lazy="fmtUrl(artist.picUrl)" class="artist-img" />
      <span class="artist-name">{{ artist.name }}</span>
    </div>
  </div>
</template>

<script>
import { getUrlMixin } from 'common/mixin';

export default {
  name: 'SearchArtist',
  mixins: [getUrlMixin],
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.result-artist {
  margin: 0 24px;
  .artist {
    display: flex;
    align-items: center;
    padding: 10px 0;
    @include font_size($ms);

    .artist-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .artist-name {
      @include clamp(1);
    }
  }
}
</style>
