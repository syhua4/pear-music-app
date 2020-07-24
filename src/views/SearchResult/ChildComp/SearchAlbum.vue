<template>
  <div class="result-album" v-if="results && results.length > 0">
    <div v-for="album in results" :key="album.id" class="album" @click.once="albumClick(album.id)">
      <song-view>
        <img v-lazy="fmtUrl(album.picUrl)" class="album-img" slot="left" />
        <div slot="center">
          <div class="album-name">{{ album.name }}</div>
          <span class="album-artist">{{ artists(album.artists) }}</span>
          <span class="album-play-count">{{ getDate(album.publishTime) }}</span>
        </div>
      </song-view>
    </div>
  </div>
</template>

<script>
import { fmtDate } from 'common/utils';
import { getArtistsMixin, getUrlMixin, roundCountMixin } from 'common/mixin';
import SongView from '../../../components/content/SongView.vue';

export default {
  name: 'SearchAlbum',
  components: { SongView },
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
  .album {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
}
</style>
