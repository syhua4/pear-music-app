<template>
  <div class="artist-album" v-if="albums && albums.length">
    <div
      class="album-wrapper"
      v-for="album in albums"
      :key="album.id"
      @click="albumClick(album.id)"
    >
      <song-view>
        <img v-lazy="fmtUrl(album.picUrl)" slot="left" />
        <div class="album-info" slot="center">
          <div class="title">
            {{ album.name }}
          </div>
          <span class="pubDate">{{ getDate(album.publishTime) }} </span>
          <span class="count">{{ album.size }}首</span>
        </div>
      </song-view>
    </div>
  </div>
</template>

<script>
import { getArtistAlbum } from 'networks/artist';
import { fmtDate } from 'common/utils';
import { getUrlMixin } from 'common/mixin';
import SongView from '../../../components/content/SongView.vue';

export default {
  name: 'ArtistAlbum',
  components: { SongView },
  mixins: [getUrlMixin],
  data() {
    return {
      albums: []
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  async created() {
    await getArtistAlbum(this.id).then(res => {
      let count = res.artist.albumSize;
      getArtistAlbum(this.id, count).then(res => (this.albums = res.hotAlbums));
    });
  },
  computed: {
    getDate() {
      return function(date) {
        let time = fmtDate(date / 1000);
        return `${time.year}-${time.month}-${time.date}`;
      };
    }
  },
  methods: {
    albumClick(id) {
      this.$router.push(`/album/${id}`);
    },
    loadMoreAlbum() {
      let offset = this.albums.length;
      getArtistAlbum(this.$route.params.id, offset).then(res => {
        if (res.more || res.hotAlbums.length) {
          this.albums.push(...res.hotAlbums);
        }
      });
    }
  },
  watch: {
    albums: {
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
.artist-album {
  .album-wrapper {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin-right: 24px;
    }
  }
}
</style>
