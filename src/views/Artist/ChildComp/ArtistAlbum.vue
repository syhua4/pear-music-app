<template>
  <div class="artist-album" v-if="albums && albums.length">
    <div
      class="album-wrapper"
      v-for="album in albums"
      :key="album.id"
      @click="albumClick(album.id)"
    >
      <img v-lazy="album.picUrl" />
      <div class="album-info">
        <div class="title">
          {{ album.name }}
        </div>
        <div class="album-desc">
          <span class="pubDate">{{ getDate(album.publishTime) }} </span>
          <span class="count">{{ album.size }}首</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArtistAlbum } from 'networks/artist';
import { fmtDate } from 'common/utils';

export default {
  name: 'ArtistAlbum',
  data() {
    return {
      albums: []
    };
  },
  created() {
    getArtistAlbum(this.$route.params.id).then(res => {
      this.albums = res.hotAlbums;
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
  margin: 0 24px;
  @include font_size($m);
  .album-wrapper {
    display: flex;
    align-items: center;
    padding: 10px 0;
    img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin-right: 24px;
    }
    .title,
    .album-desc {
      @include clamp(1);
    }
    .album-info {
      width: calc(100% - 130px);
      .album-desc {
        @include font_size($s);
        @include font_color();

        span {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
