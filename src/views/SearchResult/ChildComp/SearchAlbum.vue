<template>
  <div class="result-album" v-if="results && results.length > 0">
    <div v-for="album in results" :key="album.id" class="album" @click.once="albumClick(album.id)">
      <div class="wrapper-left">
        <img v-lazy="fmtUrl(album.picUrl)" class="album-img" />
      </div>
      <div class="wrapper-right">
        <div class="album-name">{{ album.name }}</div>
        <div class="album-desc">
          <span class="album-artist">{{ artists(album.artists) }}</span>
          <span class="album-play-count">{{ getDate(album.publishTime) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fmtDate } from 'common/utils';

import { getArtistsMixin, getUrlMixin, roundCountMixin } from 'common/mixin';

export default {
  name: 'SearchAlbum',
  mixins: [getArtistsMixin, getUrlMixin, roundCountMixin],
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    albumClick(id) {
      console.log('object');
      this.$router.push(`/album/${id}`);
    }
  },
  computed: {
    getDate() {
      return function(time) {
        let date = fmtDate(time / 1000);
        return `${date.year}-${date.month}-${date.date}`;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin';

.result-album {
  margin: 0 24px;
  .album {
    display: flex;
    align-items: center;
    padding: 10px 0;
    @include font_size($ms);
    img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
      margin-right: 20px;
    }
    .album-desc {
      @include font_size($s);
      @include font_color();
      padding-top: 10px;
      span {
        padding: 0 5px;
      }
    }
    .album-name {
      @include clamp(1);
    }
  }
}
</style>
