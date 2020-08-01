<template>
  <div class="sim-rec">
    <nav-bar class="nav" :isDisabled="true">
      <i class="iconfont icon-back" slot="left" @click.stop="goBack" />
      <div class="title" slot="center">相似推荐</div>
    </nav-bar>
    <grid-view v-if="playlists && playlists.length" heading="包含这首歌的歌单" class="playlist">
      <div
        slot="content"
        v-for="item in playlists"
        :key="item.id"
        class="wrapper"
        @click.stop="toPlaylist(item.id)"
      >
        <div class="img-wrapper">
          <img v-lazy="fmtUrl(item.coverImgUrl)" />
          <span>{{ item.playCount | round }}</span>
        </div>
        <div class="title">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </grid-view>
    <div class="songs" v-if="songs && songs.length">
      <div class="heading">喜欢这首歌的人也听</div>
      <div class="song-wrapper" v-for="(item, index) in songs" :key="item.id">
        <song-view>
          <div class="song" slot="center" @click="play(item)">
            <div class="title">{{ item.name }}</div>
            <span class="artist">{{ artists(item.artists) }}</span>
            <span class="album">{{ item.album.name }}</span>
          </div>
          <i class="iconfont icon-more--line" slot="right" @click.stop="moreOption(index)" />
        </song-view>
      </div>
    </div>

    <transition name="slide">
      <more-song-options
        :song="song"
        v-show="song && Object.keys(song).length"
        ref="trackPopUp"
        @minimizePlayer="minimizePlayer"
      />
    </transition>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar';
import GridView from 'components/content/GridView';
import SongView from 'components/content/SongView';

import { roundCountMixin, getUrlMixin, getArtistsMixin, playSongMixin } from 'common/mixin';

import { getSimSong, getSimPlaylist } from 'networks/recommend';
import { mapActions, mapGetters } from 'vuex';
import MoreSongOptions from '../../../components/content/MoreSongOptions.vue';
export default {
  name: 'PlayerSimRecommend',
  components: { NavBar, GridView, SongView, MoreSongOptions },
  mixins: [roundCountMixin, getUrlMixin, getArtistsMixin, playSongMixin],
  data() {
    return {
      playlists: [],
      songs: [],
      song: {},
      showMoreTrackOption: false
    };
  },
  created() {
    getSimPlaylist(this.id).then(res => {
      this.playlists = res.playlists;
    });
    getSimSong(this.id).then(res => {
      this.songs = res.songs;
    });
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['songlist', 'currentIndex', 'isLogin'])
  },
  methods: {
    ...mapActions(['setShowPlayer']),
    goBack() {
      this.$emit('closeRecommend');
    },
    minimizePlayer() {
      this.goBack();
      this.setShowPlayer(false);
    },
    play(item) {
      let songs = [];
      songs.push({
        id: item.id,
        name: item.name,
        al: { picUrl: item.album.picUrl },
        ar: [{ name: item.artists.map(i => i.name).join(' / ') }]
      });
      this.goBack();
      this.playSong(songs);
    },
    toPlaylist(id) {
      this.minimizePlayer();
      this.$router.push(`/playlists/${id}`);
    },
    moreOption(index) {
      let item = this.songs[index];
      this.song = {
        id: item.id,
        name: item.name,
        al: item.album,
        ar: item.artists
      };

      this.$refs.trackPopUp.showMore = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.sim-rec {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 3;
  @include font_size($ms);
  .nav {
    position: relative;
    color: #fff;
    z-index: 1;
    .icon-back {
      @include font_size($icon_ms);
    }
  }
  .playlist {
    padding-bottom: 10px;
    border-bottom: 15px solid #f7f7f7;
  }
  .songs {
    border-bottom: 15px solid #f7f7f7;

    .heading {
      margin: 0 24px;
      padding: 24px 0 10px;
      border-bottom: 1px solid #333;
      font-weight: 500;
    }
    .song-wrapper {
      display: flex;
      border-bottom: 1px solid #eee;
    }
  }
  .pop-up {
    .track-option-header {
      border-bottom: 1px solid #eee;
      img {
        width: 100px;
        height: 100px;
        border-radius: 15px;
        margin-right: 20px;
        padding: 10px 0;
      }
    }
    .track-option-wrapper {
      padding: 0 24px 24px;
      line-height: 80px;
      .add-more,
      .edit-playlist,
      .play-next,
      .add-playlist,
      .comment,
      .share,
      .artist,
      .album {
        display: flex;
        align-items: center;
        span {
          flex: 1;
          border-bottom: 1px solid #eee;
        }
      }
      .iconfont {
        margin-right: 20px;
        @include font_size($icon_ms);
      }
    }
  }
}
</style>
