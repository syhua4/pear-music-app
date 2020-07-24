<template>
  <div class="result-artist" v-if="results && results.length > 0">
    <div class="artist" v-for="artist in results" :key="artist.id">
      <song-view>
        <img v-lazy="fmtUrl(artist.picUrl)" class="artist-img" slot="left" />
        <div class="artist-name" slot="center">{{ artist.name }}</div>
      </song-view>
    </div>
  </div>
</template>

<script>
import { getUrlMixin } from 'common/mixin';
import SongView from '../../../components/content/SongView.vue';

export default {
  name: 'SearchArtist',
  components: { SongView },
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
  .artist {
    display: flex;
    .artist-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
</style>
