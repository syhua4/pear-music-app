<template>
  <div class="add-song">
    <nav-bar class="nav">
      <span slot="center">添加音乐到歌单</span>
      <span slot="right" @click="goBack">完成</span>
    </nav-bar>
    <div class="header">最近播放</div>
    <scroll>
      <div
        class="song-wrapper"
        v-for="item in songs"
        :key="item.id"
        @click="addSong(item.id)"
        :padding="10"
      >
        <song-view>
          <img :src="fmtUrl(item.al.picUrl)" slot="left" />
          <div class="song" slot="center">
            <div class="title">{{ item.name }}</div>

            <span class="artist">{{ artists(item.ar) }}</span>
            <span class="album">{{ item.al.name }}</span>
          </div>
        </song-view>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll';

import NavBar from 'components/common/NavBar/NavBar';
import { getArtistsMixin, getUrlMixin } from 'common/mixin';
import { changeSongInPlaylist } from 'networks/user';
import { getPlaylistTrackId } from 'networks/recommend';
import { mapGetters } from 'vuex';
import SongView from '../../../components/content/SongView.vue';
export default {
  name: 'PlaylistAdd',
  components: { NavBar, Scroll, SongView },
  mixins: [getArtistsMixin, getUrlMixin],
  data() {
    return {
      songs: []
    };
  },
  created() {
    this.songs = [...this.historyList].reverse();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async addSong(id) {
      let pid = this.$route.params.id;
      let ids = [];
      await getPlaylistTrackId(pid).then(res => {
        res.playlist.trackIds.map(item => {
          ids.push(item.id);
        });
      });
      await changeSongInPlaylist('add', pid, id, this.cookie).then(res => {
        if (res.code === 200) {
          let added = ids.findIndex(i => i === id);
          if (added < 0) {
            this.$toast.show('添加成功', 1000);
          } else {
            this.$toast.show('歌单内歌曲重复', 1000);
          }
        } else if (res.code === 502) {
          this.$toast.show(res.message, 1000);
        } else {
          this.$toast.show(res.message, 1000);
        }
      });
    }
  },
  computed: {
    ...mapGetters(['historyList', 'cookie'])
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 11;
  @include font_size($ms);
  .nav {
    color: #fff;
    position: relative;
    z-index: 1;
    .right-nav {
      span {
        @include font_size($ms);
      }
    }
  }
  .header {
    background-color: #fff;
    position: relative;
    z-index: 1;
    height: 50px;
    padding: 20px 24px 10px;
    @include font_size($ms);
  }
  .scroll-wrapper {
    position: fixed;
    top: 180px;
    bottom: 100px;
    left: 0;
    right: 0;
    img {
      width: 100px;
      height: 100px;
      border-radius: 15px;
      margin-right: 20px;
    }
  }
}
</style>
